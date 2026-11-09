import { useSessionStorageState } from "../../../../hooks/useSessionStorageState";

const FORM_DATA_STORAGE_KEY = "nec1099Generator.formData";

// Defaults match the Figma mock so the live preview is populated on first load.
const DEFAULT_FORM_DATA = {
  // Step 1: Payer Information
  payerName: "Acme Creative Studio LLC",
  streetAddress: "100 Innovation Way",
  city: "Austin",
  state: "TX",
  zipCode: "78701",
  payerTin: "74-1234567",
  accountNumber: "ACCT-48210",

  // Step 2: Recipient Information
  recipientName: "Alex R. Rivera",
  recipientStreetAddress: "240 Evergreen Ter",
  recipientCity: "Austin",
  recipientState: "TX",
  recipientZipCode: "78704",
  recipientTin: "456-78-9012",
  recipientAccountNumber: "",

  // Step 3: Compensation Details
  box1NonemployeeComp: "18,500.00",
  box2DirectSales: false,
  box3ExcessGoldenParachute: "",
  box4FederalTax: "2,200.00",

  // State reporting
  stateReportingState: "TX",
  stateTaxWithheld: "",
  statePayerNo: "TX-882109",
  stateIncome: "18,500.00",

  // Checkout
  email: "",
};

/** 1099-NEC details shared across every page of the 1099-NEC flow. */
export function useNec1099FormData() {
  const [formData, setFormData] = useSessionStorageState(
    FORM_DATA_STORAGE_KEY,
    DEFAULT_FORM_DATA,
  );

  const updateField = (field, value) =>
    setFormData((prev) => ({ ...prev, [field]: value }));

  return { formData, setFormData, updateField };
}
