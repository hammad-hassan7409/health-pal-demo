import { mockDelay, type Paginated } from "./client";
import type {
  Doctor, Department, Appointment, Prescription, Invoice, Review,
  BlogPost, MedicalReport, NotificationItem, ChatThread, ChatMessage, FAQItem,
} from "./types";
import * as mock from "@/lib/mocks/data";

const paginate = <T>(items: T[]): Paginated<T> => ({
  count: items.length, next: null, previous: null, results: items,
});

// ============ Doctors ============
export interface DoctorFilters {
  q?: string; department?: string; gender?: "male" | "female" | "any";
  minRating?: number; maxFee?: number; city?: string; online?: boolean;
}

export const doctorsApi = {
  list: (filters: DoctorFilters = {}) => {
    let items = [...mock.doctors];
    if (filters.q) {
      const q = filters.q.toLowerCase();
      items = items.filter((d) => d.name.toLowerCase().includes(q) || d.specialization.toLowerCase().includes(q));
    }
    if (filters.department) items = items.filter((d) => d.specialization.toLowerCase() === filters.department!.toLowerCase());
    if (filters.gender && filters.gender !== "any") items = items.filter((d) => d.gender === filters.gender);
    if (filters.minRating) items = items.filter((d) => d.rating >= filters.minRating!);
    if (filters.maxFee) items = items.filter((d) => d.consultationFee <= filters.maxFee!);
    if (filters.city) items = items.filter((d) => d.city === filters.city);
    if (filters.online) items = items.filter((d) => d.online);
    return mockDelay(paginate(items));
  },
  get: (id: string) => {
    const d = mock.doctors.find((x) => x.id === id || x.slug === id);
    if (!d) return Promise.reject(new Error("Doctor not found"));
    return mockDelay<Doctor>(d);
  },
  featured: () => mockDelay(mock.doctors.slice(0, 6)),
  slots: (_id: string, _date: string) => {
    const times = ["09:00 AM", "09:30 AM", "10:00 AM", "10:30 AM", "11:00 AM", "11:30 AM", "02:00 PM", "02:30 PM", "03:00 PM", "03:30 PM", "04:00 PM", "05:00 PM"];
    return mockDelay(times.map((t, i) => ({ id: `s${i}`, time: t, available: i % 3 !== 0 })));
  },
};

// ============ Departments ============
export const departmentsApi = {
  list: () => mockDelay<Department[]>(mock.departments),
  get: (slug: string) => mockDelay<Department | undefined>(mock.departments.find((d) => d.slug === slug)),
};

// ============ Appointments ============
export const appointmentsApi = {
  list: (status?: string) => {
    const items = status ? mock.appointments.filter((a) => a.status === status) : mock.appointments;
    return mockDelay<Appointment[]>(items);
  },
  get: (id: string) => mockDelay<Appointment | undefined>(mock.appointments.find((a) => a.id === id)),
  book: (payload: Partial<Appointment>) => mockDelay({ id: `a-${Date.now()}`, ...payload }, 600),
  cancel: (id: string) => mockDelay({ id, status: "cancelled" }, 400),
};

// ============ Auth (UI-only mock) ============
export const authApi = {
  login: (email: string, _password: string) =>
    mockDelay({ token: "mock-token", user: { id: "u1", name: "Ali Raza", email, role: "patient" as const, avatar: undefined } }, 500),
  signup: (name: string, email: string, _password: string) =>
    mockDelay({ token: "mock-token", user: { id: "u1", name, email, role: "patient" as const } }, 600),
  forgot: (_email: string) => mockDelay({ ok: true }, 500),
  reset: (_token: string, _password: string) => mockDelay({ ok: true }, 500),
  verifyOtp: (_code: string) => mockDelay({ ok: true }, 400),
};

// ============ Prescriptions / Invoices / Reviews / Blogs ============
export const prescriptionsApi = {
  list: () => mockDelay<Prescription[]>(mock.prescriptions),
  get: (id: string) => mockDelay<Prescription | undefined>(mock.prescriptions.find((p) => p.id === id)),
};
export const invoicesApi = { list: () => mockDelay<Invoice[]>(mock.invoices) };
export const reviewsApi = {
  list: (doctorId?: string) => mockDelay<Review[]>(doctorId ? mock.reviews.filter((r) => r.doctorId === doctorId) : mock.reviews),
};
export const blogsApi = {
  list: () => mockDelay<BlogPost[]>(mock.blogPosts),
  get: (slug: string) => mockDelay<BlogPost | undefined>(mock.blogPosts.find((b) => b.slug === slug)),
};
export const reportsApi = { list: () => mockDelay<MedicalReport[]>(mock.medicalReports) };
export const notificationsApi = { list: () => mockDelay<NotificationItem[]>(mock.notifications) };
export const chatApi = {
  threads: () => mockDelay<ChatThread[]>(mock.chatThreads),
  messages: (threadId: string) => mockDelay<ChatMessage[]>(mock.chatMessages[threadId] ?? []),
};
export const faqsApi = { list: () => mockDelay<FAQItem[]>(mock.faqs) };
