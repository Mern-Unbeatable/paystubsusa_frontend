import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

const FORM_DATA_STORAGE_KEY = "w2Generator.formData";

// Defaults match the Figma mock so the live preview is populated on first load.
const DEFAULT_FORM_DATA = {
  // Step 1: Employer Information
  ein: "12-3456789",
  employerName: "Northwind Logistics LLC",
  streetAddress: "450 Market St",
  city: "San Francisco",
  state: "CA",
  zipCode: "94105",
  controlNumber: "CTRL-88219",

  // Step 2: Employee Information
  ssn: "123-45-6789",
  firstName: "Jordan",
  middleInitial: "A",
  lastName: "Miller",
  employeeAddress: "88 Pine Ave",
  employeeCity: "Oakland",
  employeeState: "CA",
  employeeZip: "94607",

  // Step 3: Wage & Tax Information
  box1Wages: "65,000.00",
  box2FederalTax: "8,450.00",
  box3SocialSecurityWages: "65,000.00",
  box4SocialSecurityTax: "4,030.00",
  box5MedicareWages: "65,000.00",
  box6MedicareTax: "942.50",
  box7SocialSecurityTips: "",
  box8AllocatedTips: "",
  box10DependentCare: "",
  box11NonqualifiedPlans: "",
  box13StatutoryEmployee: false,
  box12Code: "DD",
  box12Amount: "6,200.00",

  // State reporting
  box15State: "CA",
  box15StateId: "CA-94105-01",
  box16StateWages: "65,000.00",
  box17StateTax: "3,250.00",
  box18LocalWages: "",
  box19LocalTax: "",
  box20Locality: "",

  // Checkout
  email: "",
};

/** W-2 details shared across every page of the W-2 flow. */
export function useW2FormData() {
  const [formData, setFormData] = useSessionStorageState(
    FORM_DATA_STORAGE_KEY,
    DEFAULT_FORM_DATA,
  );

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return { formData, setFormData, updateField };
}
