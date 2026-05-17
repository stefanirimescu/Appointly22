export type AppointmentStatus =
  | "scheduled"
  | "completed"
  | "cancelled"
  | "no-show";

export type Appointment = {
  id: string;
  clientId: string;
  serviceId: string;
  date: string;
  startTime: string;
  endTime: string;
  price: number;
  status: AppointmentStatus;
  notes?: string;
  createdAt: string;
  updatedAt: string;
};
