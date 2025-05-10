
import React from 'react';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import axios from 'axios';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { toast } from '@/components/ui/sonner';

import {
  Form,
  FormControl,
  FormDescription,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from '@/components/ui/select';
import { Textarea } from '@/components/ui/textarea';
import { Switch } from '@/components/ui/switch';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { RadioGroup, RadioGroupItem } from '@/components/ui/radio-group';
import { Card } from '@/components/ui/card';

interface Product {
  _id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  images: string[];
  category: string;
  tags: string[];
  stock: number;
  isInStock: boolean;
  discount: {
    type: 'none' | 'percentage' | 'fixed';
    value: number;
  };
  featured?: boolean;
}

const categories = [
  'Microcontrollers', 
  'Sensors', 
  'Motors & Drivers',
  'Power Supply',
  'IoT & Wireless',
  'Tools',
  'Displays',
  'Accessories',
  'Development Boards'
];

// Define the schema for form validation with the proper transformation for tags
const productSchema = z.object({
  name: z.string().min(1, 'Product name is required'),
  description: z.string().min(1, 'Description is required'),
  price: z.coerce.number().min(0.01, 'Price must be greater than 0'),
  imageUrl: z.string().optional(),
  category: z.string().min(1, 'Category is required'),
  // For the form, tags is a string that gets transformed to string[]
  tagsInput: z.string().default(''),
  stock: z.coerce.number().int().min(0, 'Stock cannot be negative'),
  isInStock: z.boolean().default(true),
  discount: z.object({
    type: z.enum(['none', 'percentage', 'fixed']),
    value: z.coerce.number().min(0, 'Discount value cannot be negative'),
  }),
})
// Transform the form data to include tags as string[] for the API
.transform((data) => {
  return {
    ...data,
    tags: data.tagsInput ? data.tagsInput.split(',').map(tag => tag.trim()) : [],
  };
})
// Remove the intermediate tagsInput field from the output
.transform(({tagsInput, ...rest}) => rest);

type ProductFormValues = z.infer<typeof productSchema>;

interface AddEditProductFormProps {
  product?: Product;
  onSuccess: () => void;
}

const AddEditProductForm: React.FC<AddEditProductFormProps> = ({ product, onSuccess }) => {
  const isEditing = !!product;
  const queryClient = useQueryClient();

  // Create form defaultValues with tagsInput as a string (comma-separated)
  const defaultValues = {
    name: product?.name || '',
    description: product?.description || '',
    price: product?.price || 0,
    imageUrl: product?.imageUrl || '',
    category: product?.category || '',
    tagsInput: product?.tags ? product.tags.join(', ') : '',
    stock: product?.stock || 0,
    isInStock: product?.isInStock ?? true,
    discount: {
      type: product?.discount?.type || 'none',
      value: product?.discount?.value || 0,
    },
  };

  const form = useForm<any>({
    resolver: zodResolver(productSchema),
    defaultValues,
  });

  const createProductMutation = useMutation({
    mutationFn: (data: ProductFormValues) => {
      return axios.post('/api/products', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product created successfully');
      form.reset();
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to create product');
    },
  });

  const updateProductMutation = useMutation({
    mutationFn: (data: ProductFormValues) => {
      return axios.put(`/api/products/${product?._id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['products'] });
      toast.success('Product updated successfully');
      onSuccess();
    },
    onError: () => {
      toast.error('Failed to update product');
    },
  });

  const onSubmit = (data: ProductFormValues) => {
    if (isEditing) {
      updateProductMutation.mutate(data);
    } else {
      createProductMutation.mutate(data);
    }
  };

  const discountType = form.watch('discount.type');

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
        <Tabs defaultValue="basic" className="w-full">
          <TabsList className="grid w-full grid-cols-3">
            <TabsTrigger value="basic">Basic Info</TabsTrigger>
            <TabsTrigger value="pricing">Pricing & Inventory</TabsTrigger>
            <TabsTrigger value="media">Media</TabsTrigger>
          </TabsList>

          <TabsContent value="basic" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="name"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Product Name</FormLabel>
                  <FormControl>
                    <Input placeholder="Arduino Uno R3" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea 
                      placeholder="Describe your product..." 
                      className="min-h-[120px]" 
                      {...field} 
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="category"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Category</FormLabel>
                    <Select 
                      onValueChange={field.onChange} 
                      defaultValue={field.value}
                    >
                      <FormControl>
                        <SelectTrigger>
                          <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                      </FormControl>
                      <SelectContent>
                        {categories.map((category) => (
                          <SelectItem key={category} value={category}>
                            {category}
                          </SelectItem>
                        ))}
                      </SelectContent>
                    </Select>
                    <FormMessage />
                  </FormItem>
                )}
              />
              
              <FormField
                control={form.control}
                name="tagsInput"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Tags</FormLabel>
                    <FormControl>
                      <Input 
                        placeholder="arduino, robotics, electronics" 
                        {...field} 
                      />
                    </FormControl>
                    <FormDescription>
                      Separate tags with commas
                    </FormDescription>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>
          </TabsContent>

          <TabsContent value="pricing" className="space-y-4 pt-4">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <FormField
                control={form.control}
                name="price"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Price ($)</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        step="0.01" 
                        min="0"
                        placeholder="29.99" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              <FormField
                control={form.control}
                name="stock"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Stock Quantity</FormLabel>
                    <FormControl>
                      <Input 
                        type="number" 
                        min="0" 
                        placeholder="100" 
                        {...field} 
                      />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </div>

            <FormField
              control={form.control}
              name="isInStock"
              render={({ field }) => (
                <FormItem className="flex flex-row items-center justify-between rounded-lg border p-4">
                  <div className="space-y-0.5">
                    <FormLabel className="text-base">Available in Stock</FormLabel>
                    <FormDescription>
                      Mark if this product is available for purchase
                    </FormDescription>
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

            <Card className="p-4">
              <FormField
                control={form.control}
                name="discount.type"
                render={({ field }) => (
                  <FormItem className="space-y-3">
                    <FormLabel>Discount Type</FormLabel>
                    <FormControl>
                      <RadioGroup
                        onValueChange={field.onChange}
                        defaultValue={field.value}
                        className="flex flex-col space-y-1"
                      >
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="none" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            No Discount
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="percentage" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Percentage Discount (%)
                          </FormLabel>
                        </FormItem>
                        <FormItem className="flex items-center space-x-3 space-y-0">
                          <FormControl>
                            <RadioGroupItem value="fixed" />
                          </FormControl>
                          <FormLabel className="font-normal">
                            Fixed Amount Discount ($)
                          </FormLabel>
                        </FormItem>
                      </RadioGroup>
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />

              {discountType !== 'none' && (
                <FormField
                  control={form.control}
                  name="discount.value"
                  render={({ field }) => (
                    <FormItem className="mt-4">
                      <FormLabel>
                        {discountType === 'percentage' ? 'Discount Percentage (%)' : 'Discount Amount ($)'}
                      </FormLabel>
                      <FormControl>
                        <Input 
                          type="number" 
                          min="0" 
                          step={discountType === 'percentage' ? "1" : "0.01"} 
                          max={discountType === 'percentage' ? "100" : undefined}
                          placeholder={discountType === 'percentage' ? "10" : "5.00"} 
                          {...field} 
                        />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              )}
            </Card>
          </TabsContent>

          <TabsContent value="media" className="space-y-4 pt-4">
            <FormField
              control={form.control}
              name="imageUrl"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Main Image URL</FormLabel>
                  <FormControl>
                    <Input placeholder="https://example.com/image.jpg" {...field} />
                  </FormControl>
                  <FormMessage />
                  {field.value && (
                    <div className="mt-2">
                      <p className="text-sm mb-2">Preview:</p>
                      <div className="border rounded-md w-full max-w-[200px] h-[150px] flex items-center justify-center overflow-hidden">
                        <img 
                          src={field.value} 
                          alt="Preview" 
                          className="max-w-full max-h-full object-contain" 
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = 'https://placehold.co/200x150?text=Image+Error';
                          }}
                        />
                      </div>
                    </div>
                  )}
                  <FormDescription>
                    For better performance, consider uploading images to a CDN and provide the URL here.
                  </FormDescription>
                </FormItem>
              )}
            />
          </TabsContent>
        </Tabs>

        <div className="flex justify-end gap-4">
          <Button 
            type="button" 
            variant="outline" 
            onClick={onSuccess}
          >
            Cancel
          </Button>
          <Button 
            type="submit" 
            disabled={createProductMutation.isPending || updateProductMutation.isPending}
          >
            {isEditing ? 'Update Product' : 'Create Product'}
          </Button>
        </div>
      </form>
    </Form>
  );
};

export default AddEditProductForm;
