import { clsx, type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

//Date format in - dd MM yyyy
export function formatDate(value: string) {
  if (!value) return 'Awaiting Confirmation';
  const d = new Date(value);
  if (isNaN(d.getTime())) return "-";


  // return d .toLocaleDateString("en-IN", { year: "numeric", month: "numeric", day: "numeric", }) .replaceAll('/', '-')

  const day = String(d.getDate()).padStart(2, "0");
  const month = String(d.getMonth() + 1).padStart(2, "0");
  const year = d.getFullYear();
  return `${day}-${month}-${year}`;
}

//format the key name into readable label
export function formatKeyValue(key: string) {
  if (key.toLowerCase() === 'general_obc_ews') return 'General / OBC / EWS';
  if (key.toLowerCase() === 'sc_st_pwd') return 'SC / ST / PWD';
  if (key.toLowerCase() === 'female_transgender') return 'Female / Transgender';
  return key
    .replace(/_/g, ' ')
    .replace(/\b\w/g, (c) => c.toUpperCase());
}

export function daysLeft(dateString: string): number {
  const today = new Date();
  const target = new Date(dateString);

  today.setHours(0, 0, 0, 0);
  target.setHours(0, 0, 0, 0);

  const diffMs = target.getTime() - today.getTime();
  const msPerDay = 1000 * 60 * 60 * 24;
  const diffDays = Math.ceil(diffMs / msPerDay);

  return diffDays; // can be negative, zero, or positive
}

export function daysLeftLabel(dateString: string): string {
  const days = daysLeft(dateString);

  if (days < 0) return "Expired";
  if (days === 0) return "Today";
  if (days < 30) return `${days} ${days === 1 ? 'Day' : 'Days'}`;

  const months = Math.floor(days / 30);
  return `${months} ${months === 1 ? 'Month' : 'Months'}`;
}



// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChild<T> = T extends { child?: any } ? Omit<T, "child"> : T;

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export type WithoutChildren<T> = T extends { children?: any } ? Omit<T, "children"> : T;
export type WithoutChildrenOrChild<T> = WithoutChildren<WithoutChild<T>>;
export type WithElementRef<T, U extends HTMLElement = HTMLElement> = T & { ref?: U | null };
