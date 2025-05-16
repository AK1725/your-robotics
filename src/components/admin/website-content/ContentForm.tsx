
import React from 'react';
import { z } from 'zod';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Button } from '@/components/ui/button';
import { Switch } from '@/components/ui/switch';

// Schema imported from parent component
const contentSchema = z.object({
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

export type ContentFormValues = z.infer<typeof contentSchema>;

interface ContentFormProps {
  defaultValues: ContentFormValues;
  onSubmit: (data: ContentFormValues) => void;
  onCancel: () => void;
  submitButtonText: string;
}

const ContentForm = ({ defaultValues, onSubmit, onCancel, submitButtonText }: ContentFormProps) => {
  const form = useForm<ContentFormValues>({
    resolver: zodResolver(contentSchema),
    defaultValues,
  });

  return (
    <Form {...form}>
      <form
        onSubmit={form.handleSubmit(onSubmit)}
        className="space-y-4"
      >
        <FormField
          control={form.control}
          name="section"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Section</FormLabel>
              <FormControl>
                <select
                  className="w-full p-2 border rounded-md"
                  {...field}
                >
                  <option value="hero">Hero Section</option>
                  <option value="categories">Categories Section</option>
                  <option value="featured">Featured Products</option>
                  <option value="products">Products Section</option>
                </select>
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="title"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Title</FormLabel>
              <FormControl>
                <Input placeholder="Section Title" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="subtitle"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Subtitle</FormLabel>
              <FormControl>
                <Input placeholder="Section Subtitle" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="content"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Content</FormLabel>
              <FormControl>
                <Textarea
                  placeholder="Content text..."
                  className="min-h-[100px]"
                  {...field}
                />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <FormField
          control={form.control}
          name="imageUrl"
          render={({ field }) => (
            <FormItem>
              <FormLabel>Image URL</FormLabel>
              <FormControl>
                <Input placeholder="https://example.com/image.jpg" {...field} />
              </FormControl>
              <FormMessage />
            </FormItem>
          )}
        />

        <div className="grid grid-cols-2 gap-4">
          <FormField
            control={form.control}
            name="buttonText"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Text</FormLabel>
                <FormControl>
                  <Input placeholder="Shop Now" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="buttonLink"
            render={({ field }) => (
              <FormItem>
                <FormLabel>Button Link</FormLabel>
                <FormControl>
                  <Input placeholder="/products" {...field} />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />
        </div>

        <FormField
          control={form.control}
          name="isActive"
          render={({ field }) => (
            <FormItem className="flex flex-row items-center justify-between rounded-lg border p-3">
              <div>
                <FormLabel>Active</FormLabel>
              </div>
              <FormControl>
                <Switch
                  checked={field.value}
                  onCheckedChange={field.onChange}
                />
              </FormControl>
            </FormItem>
          )}
        />

        <div className="flex justify-end gap-2">
          <Button
            type="button"
            variant="outline"
            onClick={onCancel}
          >
            Cancel
          </Button>
          <Button type="submit">{submitButtonText}</Button>
        </div>
      </form>
    </Form>
  );
};

export { ContentForm, contentSchema };
