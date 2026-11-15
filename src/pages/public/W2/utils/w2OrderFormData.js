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
  "box15State",
  "box15StateId",
  "box16StateWages",
  "box17StateTax",
  "box18LocalWages",
  "box19LocalTax",
  "box20Locality",
];

/** Payload for `POST /orders` — strips UI-only fields and caps middle initial. */
export function toW2OrderFormData(formData) {
  const out = {};
  for (const key of ORDER_FORM_KEYS) {
    if (formData[key] === undefined) continue;
    out[key] = formData[key];
  }
  if (typeof out.middleInitial === "string") {
    out.middleInitial = out.middleInitial.slice(0, 1);
  }
  // Zod defaults taxYear when omitted; prefer previous calendar year for W-2s.
  out.taxYear = formData.taxYear ?? new Date().getUTCFullYear() - 1;
  return out;
}
