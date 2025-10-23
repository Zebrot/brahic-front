import { createClient } from "next-sanity";

export const client = createClient({
  projectId: "qdj3qc70",
  dataset: "production",
  apiVersion: "2025-08-10",
  useCdn: false,
});

