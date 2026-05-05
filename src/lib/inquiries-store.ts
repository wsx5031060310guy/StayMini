// In-memory inquiry store for Phase 0 (no DB). Persists for the lifetime of the
// dev server only; survives hot reload via globalThis caching. Once Mike runs
// `prisma migrate dev`, swap these implementations to `prisma.inquiry.*`.

export type InquiryStatus = "new" | "contacted" | "confirmed" | "cancelled";

export type Inquiry = {
  id: string;
  name: string;
  phone: string | null;
  email: string | null;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomSlug: string | null;
  message: string | null;
  status: InquiryStatus;
  createdAt: Date;
};

export type InquiryInput = {
  name: string;
  phone?: string | null;
  email?: string | null;
  checkIn: Date;
  checkOut: Date;
  guests: number;
  roomSlug?: string | null;
  message?: string | null;
};

const globalForStore = globalThis as unknown as { __stayminiInquiries?: Inquiry[] };
const inquiries: Inquiry[] = globalForStore.__stayminiInquiries ?? (globalForStore.__stayminiInquiries = []);

function makeId(): string {
  return "i_" + Math.random().toString(36).slice(2, 10) + Date.now().toString(36).slice(-4);
}

function clean(value: string | null | undefined): string | null {
  if (value == null) return null;
  const trimmed = value.trim();
  return trimmed === "" ? null : trimmed;
}

export function listInquiries(): Inquiry[] {
  return [...inquiries].sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime());
}

export function createInquiry(input: InquiryInput): Inquiry {
  const inquiry: Inquiry = {
    id: makeId(),
    name: input.name.trim(),
    phone: clean(input.phone),
    email: clean(input.email),
    checkIn: input.checkIn,
    checkOut: input.checkOut,
    guests: input.guests,
    roomSlug: clean(input.roomSlug),
    message: clean(input.message),
    status: "new",
    createdAt: new Date(),
  };
  inquiries.unshift(inquiry);
  return inquiry;
}
