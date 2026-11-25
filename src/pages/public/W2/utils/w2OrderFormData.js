/** Fields the W-2 API schema accepts; checkout email stays out of formData. */
const ORDER_FORM_KEYS = [
  "ein",
  "employerName",
  "streetAddress",
  "city",
  "state",
  "zipCode",
  "controlNumber",
  "ssn",
  "firstName",
  "middleInitial",
  "lastName",
  "employeeAddress",
  "employeeCity",
  "employeeState",
  "employeeZip",
  "box1Wages",
  "box2FederalTax",
  "box3SocialSecurityWages",
  "box4SocialSecurityTax",
  "box5MedicareWages",
  "box6MedicareTax",
  "box7SocialSecurityTips",
  "box8AllocatedTips",
  "box10DependentCare",
  "box11NonqualifiedPlans",
  "box12Code",
  "box12Amount",
  "box13StatutoryEmployee",
  "box13RetirementPlan",
  "box13ThirdPartySickPay",
  "box14Description",
  "box14Amount",
  "box15State",
  "box15StateId",
  "box16StateWages",
  "box17StateTax",
  "box18LocalWages",
  "box19LocalTax",
  "box20Locality",
];

/** Digits → XXX-XX-XXXX when 9 digits are present. */
export function formatW2Ssn(value) {
  const digits = String(value ?? "").replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 3) return digits;
  if (digits.length <= 5) return `${digits.slice(0, 3)}-${digits.slice(3)}`;
  return `${digits.slice(0, 3)}-${digits.slice(3, 5)}-${digits.slice(5)}`;
}

/** Digits → XX-XXXXXXX when 9 digits are present. */
export function formatW2Ein(value) {
  const digits = String(value ?? "").replace(/\D/g, "").slice(0, 9);
  if (digits.length <= 2) return digits;
  return `${digits.slice(0, 2)}-${digits.slice(2)}`;
}

/** Payload for `POST /orders` — strips UI-only fields and caps middle initial. */
export function toW2OrderFormData(formData) {
  const out = {};
  for (const key of ORDER_FORM_KEYS) {
    if (formData[key] === undefined) continue;
    out[key] = formData[key];
  }
  if (typeof out.ssn === "string") {
    out.ssn = formatW2Ssn(out.ssn);
  }
  if (typeof out.ein === "string") {
    out.ein = formatW2Ein(out.ein);
  }
  if (typeof out.box12Code === "string") {
    out.box12Code = out.box12Code.trim().toUpperCase().slice(0, 2);
  }
  if (typeof out.middleInitial === "string") {
    out.middleInitial = out.middleInitial.slice(0, 1);
  }
  // Zod defaults taxYear when omitted; prefer previous calendar year for W-2s.
  out.taxYear = formData.taxYear ?? new Date().getUTCFullYear() - 1;
  return out;
}
