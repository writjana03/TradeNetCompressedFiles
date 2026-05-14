export interface Business {
  businessID: number;
  userID: number;
  name: string;
  type: 'Trader' | 'Exporter' | 'Importer';
  address: string;
  contactInfo: string;
  registrationNumber?: string;
  registrationDate?: string;
  status: string;
  complianceStatus?: string;
}

export interface BusinessDocument {
  documentID: number;
  businessID: number;
  docType: string;
  fileURI: string;
  uploadedDate: string;
  verificationStatus: string;
}

export interface ProfileViewModel {
  user: User;
  business: Business;
  documents: BusinessDocument[];
  complianceStatus: string;
  complianceMessage?: string;
}

export interface User {
  userID: number;
  name: string;
  email: string;
  phone: string;
  role: string;
  status: string;
  profilePicture?: string;
}
