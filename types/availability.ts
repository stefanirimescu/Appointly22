export type WeekDay =
  | "monday"
  | "tuesday"
  | "wednesday"
  | "thursday"
  | "friday"
  | "saturday"
  | "sunday";

export type AvailabilityDay = {
  day: WeekDay;
  isWorking: boolean;
  startTime: string;
  endTime: string;
};

export type Availability = {
  days: AvailabilityDay[];
};
