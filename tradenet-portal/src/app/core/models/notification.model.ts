export interface Notification {
  notificationID: number;
  userID: number;
  entityID: number;
  message: string;
  category: 'License' | 'Transaction' | 'Program' | 'Compliance';
  status: 'Read' | 'Unread';
  createdDate: string;
}
