export type Profession = {
  id: string;
  label: string;
};

export const PROFESSIONS: Profession[] = [
  { id: "barber", label: "Barber" },
  { id: "hairstylist", label: "Hairstylist" },
  { id: "makeup-artist", label: "Makeup Artist" },
  { id: "nail-technician", label: "Nail Technician" },
  { id: "tattoo-artist", label: "Tattoo Artist" },
  { id: "massage-therapist", label: "Massage Therapist" },
  { id: "physiotherapist", label: "Physiotherapist" },
  { id: "psychologist", label: "Psychologist" },
  { id: "coach", label: "Coach" },
  { id: "consultant", label: "Consultant" },
  { id: "other", label: "Other" },
];
