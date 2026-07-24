import type {
  Doctor, Department, Appointment, Prescription, Invoice, Review,
  BlogPost, MedicalReport, NotificationItem, ChatThread, ChatMessage, FAQItem,
} from "../api/types";

const photos = [
  "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1651008376811-b90baee60c1f?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1607990281513-2c110a25bd8c?w=400&h=400&fit=crop&crop=faces",
  "https://images.unsplash.com/photo-1638202993928-7267aad84c31?w=400&h=400&fit=crop&crop=faces",
];

export const departments: Department[] = [
  { id: "d1", name: "Cardiology", slug: "cardiology", icon: "HeartPulse", description: "Heart & vascular conditions, hypertension, chest pain.", doctorsCount: 24 },
  { id: "d2", name: "Dermatology", slug: "dermatology", icon: "Sparkles", description: "Skin, hair, and nail concerns.", doctorsCount: 18 },
  { id: "d3", name: "Neurology", slug: "neurology", icon: "Brain", description: "Migraine, stroke, seizures, neuropathy.", doctorsCount: 12 },
  { id: "d4", name: "Pediatrics", slug: "pediatrics", icon: "Baby", description: "Newborn and child health care.", doctorsCount: 30 },
  { id: "d5", name: "Orthopedics", slug: "orthopedics", icon: "Bone", description: "Bones, joints, fractures, sports injuries.", doctorsCount: 16 },
  { id: "d6", name: "Gynecology", slug: "gynecology", icon: "Flower2", description: "Women's health and reproductive care.", doctorsCount: 20 },
  { id: "d7", name: "Psychiatry", slug: "psychiatry", icon: "BrainCircuit", description: "Mental health, anxiety, depression.", doctorsCount: 14 },
  { id: "d8", name: "General Physician", slug: "general", icon: "Stethoscope", description: "Everyday care and first consultations.", doctorsCount: 42 },
  { id: "d9", name: "Dentistry", slug: "dentistry", icon: "Smile", description: "Dental checkups and oral care.", doctorsCount: 22 },
  { id: "d10", name: "ENT", slug: "ent", icon: "Ear", description: "Ear, nose, throat and sinus care.", doctorsCount: 11 },
  { id: "d11", name: "Ophthalmology", slug: "ophthalmology", icon: "Eye", description: "Vision, eye disease, laser correction.", doctorsCount: 10 },
  { id: "d12", name: "Endocrinology", slug: "endocrinology", icon: "Activity", description: "Diabetes, thyroid, hormonal disorders.", doctorsCount: 9 },
];

const names = [
  ["Dr. Ayesha Khan", "female", "Cardiology"],
  ["Dr. Bilal Ahmad", "male", "Neurology"],
  ["Dr. Sana Malik", "female", "Dermatology"],
  ["Dr. Hamza Raza", "male", "Orthopedics"],
  ["Dr. Fatima Iqbal", "female", "Gynecology"],
  ["Dr. Omar Siddiqui", "male", "General Physician"],
  ["Dr. Zainab Noor", "female", "Pediatrics"],
  ["Dr. Usman Tariq", "male", "Psychiatry"],
  ["Dr. Mariam Aslam", "female", "Endocrinology"],
  ["Dr. Yasir Chaudhry", "male", "ENT"],
  ["Dr. Hira Javed", "female", "Ophthalmology"],
  ["Dr. Adeel Mir", "male", "Cardiology"],
] as const;

export const doctors: Doctor[] = names.map((n, i) => {
  const [name, gender, specialization] = n;
  const slug = name.toLowerCase().replace(/\s+/g, "-").replace(/\./g, "");
  return {
    id: `doc-${i + 1}`,
    slug,
    name,
    photo: photos[i % photos.length],
    specialization,
    qualifications: ["MBBS", "FCPS", i % 2 ? "MRCP (UK)" : "MD"].join(", "),
    pmdc: `PMDC-${100000 + i * 137}`,
    experienceYears: 6 + (i % 15),
    hospital: ["Aga Khan Hospital", "Shifa International", "Liaquat National", "Doctors Hospital"][i % 4],
    clinic: ["Health Plus Clinic", "Prime Care", "Wellness Suites", "MediCare Centre"][i % 4],
    consultationFee: [1500, 2000, 2500, 3000, 3500][i % 5],
    languages: ["English", "Urdu", i % 2 ? "Punjabi" : "Sindhi"],
    availability: ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat"].filter((_, k) => (i + k) % 3 !== 0),
    bio: `${name} is a compassionate ${specialization.toLowerCase()} specialist with a focus on evidence-based, patient-first care. Trained across leading teaching hospitals with a keen interest in continuous learning and modern telemedicine.`,
    rating: 4.4 + ((i % 6) * 0.1),
    reviewsCount: 40 + i * 23,
    gender: gender as "male" | "female",
    city: ["Karachi", "Lahore", "Islamabad", "Rawalpindi"][i % 4],
    certificates: ["Board Certified", "Advanced Cardiac Life Support", "Fellowship Program"],
    awards: ["Best Doctor Award 2023", "Excellence in Care 2022"],
    online: i % 2 === 0,
    nextAvailable: new Date(Date.now() + (i + 1) * 3600 * 1000).toISOString(),
  };
});

export const appointments: Appointment[] = [
  { id: "a1", doctorId: "doc-1", doctorName: doctors[0].name, doctorPhoto: doctors[0].photo, specialization: "Cardiology", patientId: "p1", patientName: "Ali Raza", date: new Date(Date.now() + 86400000).toISOString(), time: "10:30 AM", type: "video", status: "upcoming", reason: "Chest pain follow up", fee: 2500 },
  { id: "a2", doctorId: "doc-3", doctorName: doctors[2].name, doctorPhoto: doctors[2].photo, specialization: "Dermatology", patientId: "p1", patientName: "Ali Raza", date: new Date(Date.now() + 3*86400000).toISOString(), time: "02:00 PM", type: "chat", status: "upcoming", reason: "Skin rash", fee: 1800 },
  { id: "a3", doctorId: "doc-6", doctorName: doctors[5].name, doctorPhoto: doctors[5].photo, specialization: "General Physician", patientId: "p1", patientName: "Ali Raza", date: new Date(Date.now() - 5*86400000).toISOString(), time: "11:00 AM", type: "video", status: "completed", reason: "Seasonal flu", fee: 1500 },
  { id: "a4", doctorId: "doc-5", doctorName: doctors[4].name, doctorPhoto: doctors[4].photo, specialization: "Gynecology", patientId: "p1", patientName: "Ali Raza", date: new Date(Date.now() - 10*86400000).toISOString(), time: "04:30 PM", type: "clinic", status: "cancelled", reason: "Consultation", fee: 2200 },
];

export const prescriptions: Prescription[] = [
  {
    id: "rx-1", appointmentId: "a3", doctorName: doctors[5].name, patientName: "Ali Raza", date: new Date().toISOString(),
    diagnosis: "Acute viral upper respiratory infection",
    medicines: [
      { name: "Paracetamol 500mg", dose: "1 tablet", frequency: "Every 6 hours", duration: "5 days", notes: "After meals" },
      { name: "Cetirizine 10mg", dose: "1 tablet", frequency: "Once at night", duration: "5 days" },
      { name: "Vitamin C 1000mg", dose: "1 tablet", frequency: "Once daily", duration: "10 days" },
    ],
    advice: "Rest, warm fluids, steam inhalation twice a day. Follow up if fever persists beyond 3 days.",
  },
];

export const invoices: Invoice[] = [
  { id: "inv1", number: "INV-2025-0142", date: new Date().toISOString(), amount: 2500, status: "paid", method: "JazzCash", description: "Video consultation — Dr. Ayesha Khan" },
  { id: "inv2", number: "INV-2025-0129", date: new Date(Date.now() - 5*86400000).toISOString(), amount: 1500, status: "paid", method: "Credit Card", description: "Video consultation — Dr. Omar Siddiqui" },
  { id: "inv3", number: "INV-2025-0117", date: new Date(Date.now() - 12*86400000).toISOString(), amount: 1800, status: "pending", method: "EasyPaisa", description: "Chat consultation — Dr. Sana Malik" },
  { id: "inv4", number: "INV-2025-0088", date: new Date(Date.now() - 30*86400000).toISOString(), amount: 2200, status: "failed", method: "Bank Transfer", description: "Clinic visit — Dr. Fatima Iqbal" },
];

export const reviews: Review[] = doctors.slice(0, 6).flatMap((d, i) => [
  { id: `r${i}a`, doctorId: d.id, patientName: ["Sara N.", "Ahmed R.", "Hiba S.", "Kamran L.", "Nadia Q.", "Bilal K."][i], rating: 5, comment: "Explained everything clearly and never rushed the consultation. Truly excellent care.", date: new Date(Date.now() - (i+1)*86400000).toISOString() },
  { id: `r${i}b`, doctorId: d.id, patientName: ["Imran F.", "Zoya H.", "Fahad T.", "Amina W.", "Bilal K.", "Rida A."][i], rating: 4, comment: "Great doctor, felt heard. Prescription was helpful and I recovered quickly.", date: new Date(Date.now() - (i+3)*86400000).toISOString() },
]);

export const blogPosts: BlogPost[] = [
  { id: "b1", slug: "understanding-hypertension", title: "Understanding hypertension: what your blood pressure numbers mean", excerpt: "A practical guide to reading, tracking and reducing your blood pressure — without the scare tactics.", cover: "https://images.unsplash.com/photo-1505751172876-fa1923c5c528?w=1200&h=800&fit=crop", author: doctors[0].name, authorRole: "Cardiologist", date: new Date().toISOString(), readMinutes: 6, category: "Cardiology", content: "Full article content..." },
  { id: "b2", slug: "seasonal-skincare", title: "Seasonal skincare: a dermatologist's minimalist routine", excerpt: "Three products, twice a day. Here's the science behind why less really is more.", cover: "https://images.unsplash.com/photo-1556228720-195a672e8a03?w=1200&h=800&fit=crop", author: doctors[2].name, authorRole: "Dermatologist", date: new Date(Date.now() - 3*86400000).toISOString(), readMinutes: 5, category: "Dermatology", content: "Full article content..." },
  { id: "b3", slug: "child-fever-guide", title: "Fever in children: when to worry and when to wait", excerpt: "A calm, evidence-based framework parents can use at 2 a.m.", cover: "https://images.unsplash.com/photo-1584515933487-779824d29309?w=1200&h=800&fit=crop", author: doctors[6].name, authorRole: "Pediatrician", date: new Date(Date.now() - 7*86400000).toISOString(), readMinutes: 4, category: "Pediatrics", content: "Full article content..." },
  { id: "b4", slug: "diabetes-lifestyle", title: "Living well with type 2 diabetes: the small habits that matter", excerpt: "Six sustainable changes that outperform any single medication.", cover: "https://images.unsplash.com/photo-1579165466741-7f35e4755660?w=1200&h=800&fit=crop", author: doctors[8].name, authorRole: "Endocrinologist", date: new Date(Date.now() - 10*86400000).toISOString(), readMinutes: 8, category: "Endocrinology", content: "Full article content..." },
  { id: "b5", slug: "anxiety-first-steps", title: "First steps when anxiety starts running your day", excerpt: "A therapist explains grounding, breath work, and when to seek help.", cover: "https://images.unsplash.com/photo-1499209974431-9dddcece7f88?w=1200&h=800&fit=crop", author: doctors[7].name, authorRole: "Psychiatrist", date: new Date(Date.now() - 14*86400000).toISOString(), readMinutes: 7, category: "Mental Health", content: "Full article content..." },
  { id: "b6", slug: "video-consultation-guide", title: "How to prepare for your first video consultation", excerpt: "Ten minutes of prep can double the value of your virtual visit.", cover: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=1200&h=800&fit=crop", author: doctors[5].name, authorRole: "General Physician", date: new Date(Date.now() - 20*86400000).toISOString(), readMinutes: 3, category: "Guides", content: "Full article content..." },
];

export const notifications: NotificationItem[] = [
  { id: "n1", title: "Appointment confirmed", body: "Your video consultation with Dr. Ayesha Khan is tomorrow at 10:30 AM.", time: "2h ago", read: false, kind: "appointment" },
  { id: "n2", title: "New message from Dr. Sana Malik", body: "Please share a clearer photo of the affected area.", time: "5h ago", read: false, kind: "message" },
  { id: "n3", title: "Payment received", body: "Invoice INV-2025-0142 for PKR 2,500 has been paid.", time: "1d ago", read: true, kind: "payment" },
  { id: "n4", title: "New prescription available", body: "Dr. Omar Siddiqui has issued a new prescription. Tap to view.", time: "3d ago", read: true, kind: "system" },
];

export const chatThreads: ChatThread[] = doctors.slice(0, 5).map((d, i) => ({
  id: `t${i+1}`,
  peerName: d.name,
  peerRole: "doctor",
  peerAvatar: d.photo,
  lastMessage: ["Please share your latest report.", "Take one tablet after each meal.", "How are you feeling today?", "Follow up in a week.", "Sure, sounds good."][i],
  lastTime: ["Just now", "12m", "1h", "Yesterday", "Mon"][i],
  unread: [2, 0, 1, 0, 0][i],
  online: i % 2 === 0,
}));

export const chatMessages: Record<string, ChatMessage[]> = {
  t1: [
    { id: "m1", threadId: "t1", fromMe: false, text: "Hello Ali, how are you feeling after the last consultation?", time: "10:02 AM", status: "read" },
    { id: "m2", threadId: "t1", fromMe: true, text: "Much better, thank you. The chest pain has reduced significantly.", time: "10:05 AM", status: "read" },
    { id: "m3", threadId: "t1", fromMe: false, text: "Great to hear. Please share your latest ECG report when you have a chance.", time: "10:06 AM", status: "read" },
    { id: "m4", threadId: "t1", fromMe: true, attachment: { kind: "pdf", name: "ECG-Report.pdf", url: "#" }, time: "10:12 AM", status: "delivered" },
    { id: "m5", threadId: "t1", fromMe: false, text: "Received, reviewing now.", time: "10:13 AM", status: "read" },
  ],
};

export const medicalReports: MedicalReport[] = [
  { id: "mr1", name: "Blood Test Report - CBC.pdf", type: "pdf", size: 245000, uploadedAt: new Date().toISOString(), url: "#", category: "Lab" },
  { id: "mr2", name: "Chest X-Ray.jpg", type: "image", size: 1200000, uploadedAt: new Date(Date.now() - 86400000).toISOString(), url: "https://images.unsplash.com/photo-1530026405186-ed1f139313f8?w=800", category: "Radiology" },
  { id: "mr3", name: "ECG Trace.pdf", type: "pdf", size: 180000, uploadedAt: new Date(Date.now() - 3*86400000).toISOString(), url: "#", category: "Cardiology" },
];

export const faqs: FAQItem[] = [
  { category: "General", q: "Is Medivia a real hospital?", a: "Medivia is a licensed telemedicine platform partnering with verified doctors, clinics, and hospitals across Pakistan." },
  { category: "General", q: "Are your doctors verified?", a: "Every doctor is PMDC-verified with credentials and hospital affiliations reviewed before onboarding." },
  { category: "Appointments", q: "Can I reschedule an appointment?", a: "Yes. You can reschedule up to 2 hours before the appointment from your dashboard, at no extra cost." },
  { category: "Appointments", q: "Do you offer follow up consultations?", a: "Yes. Most doctors include one complimentary follow up within 72 hours of the initial consultation." },
  { category: "Payments", q: "What payment methods are supported?", a: "JazzCash, EasyPaisa, bank transfer, credit and debit cards. All payments are processed on secure infrastructure." },
  { category: "Payments", q: "Do you offer refunds?", a: "Yes. If a consultation cannot be completed due to a technical issue on our end, we issue a full refund within 7 working days." },
  { category: "Privacy", q: "Is my medical data private?", a: "All records are encrypted at rest and in transit. Only you and the doctor(s) you consult can access your medical history." },
  { category: "Video", q: "What do I need for a video consultation?", a: "A smartphone or laptop with a working camera, a microphone, and a stable internet connection." },
];
