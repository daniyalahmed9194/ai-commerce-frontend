import type { CaptionResult, ClientConfig, GenerationInput, ProductGeneration, ScheduledPost, ScheduledPostPlatform } from "./types";

const API_BASE = process.env.NEXT_PUBLIC_API_BASE_URL ?? "http://localhost:4000";

async function parseResponse<T>(response: Response): Promise<T> {
  if (!response.ok) {
    const text = await response.text();
    throw new Error(text || `Request failed with ${response.status}`);
  }

  return response.json() as Promise<T>;
}

export async function createGeneration(input: GenerationInput, sourceImage: File) {
  const form = new FormData();
  Object.entries(input).forEach(([key, value]) => form.append(key, value ?? ""));
  form.append("sourceImage", sourceImage);

  const response = await fetch(`${API_BASE}/generations`, {
    method: "POST",
    body: form
  });

  return parseResponse<ProductGeneration>(response);
}

export async function generateImage(id: string) {
  const response = await fetch(`${API_BASE}/generations/${id}/image`, { method: "POST" });
  return parseResponse<ProductGeneration>(response);
}

export async function generateCaption(id: string) {
  const response = await fetch(`${API_BASE}/generations/${id}/caption`, { method: "POST" });
  return parseResponse<ProductGeneration & CaptionResult>(response);
}

export async function listGenerations() {
  const response = await fetch(`${API_BASE}/generations`, { cache: "no-store" });
  return parseResponse<ProductGeneration[]>(response);
}

export async function getGeneration(id: string) {
  const response = await fetch(`${API_BASE}/generations/${id}`, { cache: "no-store" });
  return parseResponse<ProductGeneration>(response);
}

export async function updateGeneration(id: string, payload: Partial<ProductGeneration>) {
  const response = await fetch(`${API_BASE}/generations/${id}`, {
    method: "PATCH",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse<ProductGeneration>(response);
}

export async function approveGeneration(id: string) {
  const response = await fetch(`${API_BASE}/generations/${id}/approve`, { method: "POST" });
  return parseResponse<ProductGeneration>(response);
}

export async function deleteGeneration(id: string) {
  const response = await fetch(`${API_BASE}/generations/${id}`, { method: "DELETE" });
  return parseResponse<{ ok: boolean }>(response);
}

export async function getClientConfig() {
  const response = await fetch(`${API_BASE}/config/client`, { cache: "no-store" });
  return parseResponse<ClientConfig>(response);
}

export async function schedulePost(payload: { generationId: string; platform: ScheduledPostPlatform; scheduledAt: string }) {
  const response = await fetch(`${API_BASE}/posts/schedule`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse<ScheduledPost>(response);
}

export async function publishPost(payload: { generationId: string; platform: ScheduledPostPlatform }) {
  const response = await fetch(`${API_BASE}/posts/publish`, {
    method: "POST",
    headers: { "content-type": "application/json" },
    body: JSON.stringify(payload)
  });
  return parseResponse<ScheduledPost>(response);
}
