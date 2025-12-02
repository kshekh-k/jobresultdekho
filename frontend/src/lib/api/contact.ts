import { apiGet, apiPost } from "./client";

export interface Contact {
  id: number;
  first_name: string;
  last_name: string;
  email: string;
  phone?: string;
  message: string;
  action_status?: "Open" | "Replied" | "Closed";
  reply_message?: string;
  recaptcha_score?: number;
  createdAt?: string;
  updatedAt?: string;
}

// Create a new contact
export async function createContact(
  payload: Omit<Contact, "id" | "action_status" | "reply_message" | "recaptcha_score" | "createdAt" | "updatedAt">,
  customFetch?: typeof fetch
): Promise<Contact> {
  return await apiPost<Contact>(`/contacts`, payload, customFetch);
}

// Get all contacts (admin use)
export async function getContacts(customFetch?: typeof fetch): Promise<Contact[]> {
  return await apiGet<Contact[]>(`/contacts`, customFetch);
}

// Get a single contact by ID
export async function getContactById(id: number, customFetch?: typeof fetch): Promise<Contact> {
  return await apiGet<Contact>(`/contacts/${id}`, customFetch);
}

// Reply to a contact ticket
export async function replyContact(id: number, reply_message: string, customFetch?: typeof fetch): Promise<Contact> {
  return await apiPost<Contact>(`/contacts/${id}/reply`, { reply_message }, customFetch);
}

// Close a contact ticket
export async function closeContact(id: number, customFetch?: typeof fetch): Promise<Contact> {
  return await apiPost<Contact>(`/contacts/${id}/close`, {}, customFetch);
}
