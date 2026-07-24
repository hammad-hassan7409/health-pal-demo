import axios from "axios";

/**
 * Central axios instance. When wiring the Django REST backend later,
 * point VITE_API_URL at it and every service module in `src/lib/api/*`
 * will start hitting real endpoints without any UI changes.
 */
export const api = axios.create({
  baseURL: (import.meta.env.VITE_API_URL as string | undefined) ?? "/api",
  timeout: 15000,
  headers: { "Content-Type": "application/json" },
});

api.interceptors.request.use((config) => {
  if (typeof window !== "undefined") {
    const token = window.localStorage.getItem("auth_token");
    if (token) config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

/** Simulate network latency for mocked responses. */
export const mockDelay = <T>(data: T, ms = 350): Promise<T> =>
  new Promise((resolve) => setTimeout(() => resolve(data), ms));

export interface Paginated<T> {
  count: number;
  next: string | null;
  previous: string | null;
  results: T[];
}
