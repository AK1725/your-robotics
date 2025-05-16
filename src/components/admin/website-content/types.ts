
import { z } from 'zod';

export const contentSchema = z.object({
  section: z.string().min(1, "Section is required"),
  title: z.string().optional(),
  subtitle: z.string().optional(),
  content: z.string().optional(),
  imageUrl: z.string().optional(),
  buttonText: z.string().optional(),
  buttonLink: z.string().optional(),
  isActive: z.boolean().default(true),
  order: z.number().default(0),
});

export interface WebsiteContent {
  _id: string;
  section: string;
  title: string;
  subtitle: string;
  content: string;
  imageUrl: string;
  buttonText: string;
  buttonLink: string;
  isActive: boolean;
  order: number;
  createdAt: string;
  updatedAt: string;
}
