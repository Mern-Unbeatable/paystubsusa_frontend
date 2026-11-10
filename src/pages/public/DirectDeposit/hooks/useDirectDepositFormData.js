import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

const FORM_DATA_STORAGE_KEY = "directDepositGenerator.formData";

// Defaults match the Figma mock so the live preview is populated on first load.
const DEFAULT_FORM_DATA = {
  // Step 1: Employer Information
  employerName: "Company Name",
  streetAddress: "123 Business Avenue",
  city: "City",
  state: "ST",
  zipCode: "00000",
  employerContact: "",

  // Step 2: Employee Information
  employeeName: "Employee / Recipient Name",
  employeeAddress: "456 Residential Rd",
  employeeCity: "City",
  employeeState: "ST",
  employeeZipCode: "00000",
  employeeId: "EMP-8821",

  // Step 3: Deposit Details
  depositDate: "10/24/2026",
  payPeriod: "May 1 – May 15, 2025",
  paymentReference: "REF-99201",
  bankName: "Chase Bank",
  accountHolderName: "Employee Name",
  accountType: "Checking", // Checking | Savings
  accountNumber: "•••• 0000",
  depositAmount: "1,850.00",
  paymentDescription: "Bi-weekly Direct Deposit Payroll",

  // Checkout
  email: "",
};

/** Direct deposit details shared across every page of the direct deposit flow. */
export function useDirectDepositFormData() {
  const [formData, setFormData] = useSessionStorageState(
    FORM_DATA_STORAGE_KEY,
    DEFAULT_FORM_DATA,
  );

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return { formData, setFormData, updateField };
}
