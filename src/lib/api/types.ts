export type UserRole = "patient" | "doctor" | "admin";

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar?: string;
  phone?: string;
}

export interface Doctor {
  id: string;
  name: string;
  slug: string;
  photo: string;
  specialization: string;
  qualifications: string;
  pmdc: string;
  experienceYears: number;
  hospital: string;
  clinic: string;
  consultationFee: number;
  languages: string[];
  availability: string[]; // e.g. ["Mon", "Wed", "Fri"]
  bio: string;
  rating: number;
  reviewsCount: number;
  gender: "male" | "female";
  city: string;
  certificates: string[];
  awards: string[];
  online: boolean;
  nextAvailable: string; // ISO
}

export interface Department {
  id: string;
  name: string;
  slug: string;
  icon: string; // lucide icon name
  description: string;
  doctorsCount: number;
}

export interface TimeSlot {
  id: string;
  time: string; // "09:30 AM"
  available: boolean;
}

export type AppointmentStatus = "upcoming" | "completed" | "cancelled" | "pending";
export type AppointmentType = "video" | "clinic" | "chat";

export interface Appointment {
  id: string;
  doctorId: string;
  doctorName: string;
  doctorPhoto: string;
  specialization: string;
  patientId: string;
  patientName: string;
  date: string; // ISO
  time: string;
  type: AppointmentType;
  status: AppointmentStatus;
  reason: string;
  fee: number;
}

export interface Prescription {
  id: string;
  appointmentId: string;
  doctorName: string;
  patientName: string;
  date: string;
  medicines: Array<{
    name: string;
    dose: string;
    frequency: string;
    duration: string;
    notes?: string;
  }>;
  advice: string;
  diagnosis: string;
}

export interface Invoice {
  id: string;
  number: string;
  date: string;
  amount: number;
  status: "paid" | "pending" | "failed";
  method: string;
  description: string;
}

export interface Review {
  id: string;
  doctorId: string;
  patientName: string;
  patientAvatar?: string;
  rating: number;
  comment: string;
  date: string;
}

export interface BlogPost {
  id: string;
  slug: string;
  title: string;
  excerpt: string;
  cover: string;
  author: string;
  authorRole: string;
  date: string;
  readMinutes: number;
  category: string;
  content: string;
}

export interface MedicalReport {
  id: string;
  name: string;
  type: "image" | "pdf";
  size: number;
  uploadedAt: string;
  url: string;
  category: string;
}

export interface NotificationItem {
  id: string;
  title: string;
  body: string;
  time: string;
  read: boolean;
  kind: "appointment" | "message" | "payment" | "system";
}

export interface ChatThread {
  id: string;
  peerName: string;
  peerRole: "doctor" | "patient";
  peerAvatar: string;
  lastMessage: string;
  lastTime: string;
  unread: number;
  online: boolean;
}

export interface ChatMessage {
  id: string;
  threadId: string;
  fromMe: boolean;
  text?: string;
  attachment?: { kind: "image" | "pdf"; name: string; url: string };
  time: string;
  status: "sent" | "delivered" | "read";
}

export interface FAQItem {
  q: string;
  a: string;
  category: string;
}
