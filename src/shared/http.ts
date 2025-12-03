import { notFound } from "next/navigation";

const baseUrl = 'http://localhost:3001';

class APIError extends Error {
  constructor(message: string, public status: number) {
    super(message);
    this.status = status;
    this.name = 'APIError';
  }
}


export async function letsFetch<T>(url: string, init: RequestInit = {}) {
  const response = await fetch(baseUrl + url, init);

  if (!response.ok) {
    throw new APIError(`Failed to fetch ${url}`, response.status);
  }

  const data: T = await response.json();
  return data;
}

export async function letsFetchWithNoFoundCatch<T>(url: string, init: RequestInit = {}) {
try {
    return await letsFetch<T>(url, init);
  } catch (error) {
    if (error instanceof APIError && error.status === 404) {
      notFound(); 
    }
    throw error; 
  }
}