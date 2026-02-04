export interface Bank {
  id: string;
  name: string;
  inwardLimit: number;
  outwardLimit: number;
  availableInwardCapacity: number;
}
