import { buildPaystubDocument } from "./buildPaystubDocument";

// Mirrors the reference designs so thumbnails show a realistic, filled-in stub.
const SAMPLE_FORM_DATA = {
  companyName: "Northwind Logistics",
  companyAddress: "123 Example Rd.",
  companyCity: "Atlanta",
  companyState: "GA",
  companyZip: "12345",
  companyEin: "12-3456789",
  employeeName: "John Doe",
  employeeAddress: "123 Example Ln.",
  employeeCity: "Atlanta",
  employeeState: "GA",
  employeeZip: "12345",
  employeeId: "EMP1234",
  payPeriodStart: "2026-04-13",
  payPeriodEnd: "2026-04-26",
  payDate: "2026-05-01",
  payFrequency: "Bi-Weekly",
  payType: "Hourly",
  hourlyRate: "20",
  regularHours: "80",
  overtimeHours: "0",
  additionalEarnings: [],
  taxes: [
    { id: "med", label: "FICA - Medicare", amount: "23.20" },
    { id: "ss", label: "FICA - Social Security", amount: "99.20" },
    { id: "fed", label: "Federal Tax", amount: "108.15" },
    { id: "state", label: "State Tax", amount: "59.09" },
  ],
  deductions: [],
};

const SAMPLE_CALCULATIONS = {
  regularEarnings: 1600,
  overtimeEarnings: 0,
  totalGross: 1600,
  totalTaxes: 289.64,
  totalDeductions: 0,
  allDeductions: 289.64,
  netPay: 1310.36,
};

// Demo mark for gallery thumbnails only; generated paystubs show the user's upload or nothing.
export const SAMPLE_LOGO = `data:image/svg+xml,${encodeURIComponent(
  '<svg xmlns="http://www.w3.org/2000/svg" width="100" height="72" viewBox="0 0 50 36" fill="none" stroke="#1E8BE6" stroke-width="4" stroke-linecap="round" stroke-linejoin="round"><path d="M10 2h22c8 0 14 6 14 14s-6 14-14 14H20l-3 4H7l3-4"/><path d="M6 11h24M3 18h27M8 25h14"/></svg>',
)}`;

export const SAMPLE_PAYSTUB_DOCUMENT = buildPaystubDocument(
  SAMPLE_FORM_DATA,
  SAMPLE_CALCULATIONS,
);
