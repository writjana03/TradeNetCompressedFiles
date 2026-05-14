export interface TradeLicense {
  licenseID: number;
  businessID?: number;
  title: string;
  type: string;
  description: string;
  fee: number;
  applicationDate?: string;
  issuedDate?: string;
  expiryDate?: string;
  applicationStatus?: string;
  rejectionReason?: string;
  status: string;
}

export interface LicenseApplicationRequest {
  licenseID: number;
  licenseType: string;
  title: string;
  description: string;
  additionalNotes?: string;
  documents?: File[];
}

export interface LicenseListViewModel {
  availableLicenses: TradeLicense[];
  activePrograms: TradeProgram[];
}

export interface TradeProgram {
  programID: number;
  title: string;
  description: string;
  programType: string;
  budget: number;
  startDate: string;
  endDate: string;
  eligibilityCriteria?: string;
  status: string;
}
