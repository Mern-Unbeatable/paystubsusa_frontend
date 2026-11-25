import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

const FORM_DATA_STORAGE_KEY = "directDepositGenerator.formData";

// Defaults match the Figma mock so the live preview is populated on first load.
export const DIRECT_DEPOSIT_SAMPLE_FORM_DATA = {
  // Step 1: Employer Information
  employerName: "Acme Corporation",
  streetAddress: "123 Business Avenue",
  city: "Austin",
  state: "TX",
  zipCode: "78701",
  employerContact: "",

  // Step 2: Employee Information
  employeeName: "Jane Doe",
  employeeAddress: "456 Residential Rd",
  employeeCity: "Austin",
  employeeState: "TX",
  employeeZipCode: "78704",
  employeeId: "EMP-8821",

  // Step 3: Deposit Details (ISO dates for native pickers)
  depositDate: "2026-10-24",
  payPeriodStart: "2025-05-01",
  payPeriodEnd: "2025-05-15",
  payPeriod: "05/01/2025 – 05/15/2025",
  paymentReference: "REF-99201",
  bankName: "Chase Bank",
  accountHolderName: "Employee Name",
  accountType: "Checking", // Checking | Savings
  accountNumber: "1234567890",
  depositAmount: "1,850.00",
  paymentDescription: "Bi-weekly Direct Deposit Payroll",

  // Checkout
  email: "",
};

/** Direct deposit details shared across every page of the direct deposit flow. */
export function useDirectDepositFormData() {
  const [formData, setFormData] = useSessionStorageState(
    FORM_DATA_STORAGE_KEY,
    DIRECT_DEPOSIT_SAMPLE_FORM_DATA,
  );

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return { formData, setFormData, updateField };
}
