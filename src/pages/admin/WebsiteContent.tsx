
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Card, CardContent, CardDescription, CardHeader, CardTitle 
} from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Badge } from '@/components/ui/badge';
import { toast } from '@/components/ui/sonner';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import * as z from 'zod';
import {
  LayoutGrid,
  Home,
  ShoppingBag,
  Star,
  Plus,
  Pencil,
  Trash2,
  Image as ImageIcon,
  CircleDashed,
} from 'lucide-react';
import { Skeleton } from '@/components/ui/skeleton';
import { Switch } from '@/components/ui/switch';

interface WebsiteContent {
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

const WebsiteContent = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<WebsiteContent | null>(null);

  const { data: contents, isLoading } = useQuery({
    queryKey: ['websiteContents'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/content');
        return response.data as WebsiteContent[];
      } catch (error) {
        console.error('Error fetching website content:', error);
        return [];
      }
    },
  });

  const createContentMutation = useMutation({
    mutationFn: async (data: z.infer<typeof contentSchema>) => {
      return await axios.post('/api/content', data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websiteContents'] });
      toast.success('Content added successfully');
      setIsAddDialogOpen(false);
    },
    onError: (error) => {
      console.error('Error creating content:', error);
      toast.error('Failed to add content');
    },
  });

  const updateContentMutation = useMutation({
    mutationFn: async ({ id, data }: { id: string; data: z.infer<typeof contentSchema> }) => {
      return await axios.put(`/api/content/${id}`, data);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websiteContents'] });
      toast.success('Content updated successfully');
      setEditingContent(null);
    },
    onError: (error) => {
      console.error('Error updating content:', error);
      toast.error('Failed to update content');
    },
  });

  const deleteContentMutation = useMutation({
    mutationFn: async (id: string) => {
      return await axios.delete(`/api/content/${id}`);
    },
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['websiteContents'] });
      toast.success('Content deleted successfully');
    },
    onError: (error) => {
      console.error('Error deleting content:', error);
      toast.error('Failed to delete content');
    },
  });

  const form = useForm<z.infer<typeof contentSchema>>({
    resolver: zodResolver(contentSchema),
    defaultValues: {
      section: activeTab,
      title: '',
      subtitle: '',
      content: '',
      imageUrl: '',
      buttonText: '',
      buttonLink: '',
      isActive: true,
      order: 0,
    },
  });

  const handleAddContent = (data: z.infer<typeof contentSchema>) => {
    createContentMutation.mutate(data);
  };

  const handleEditContent = (content: WebsiteContent) => {
    setEditingContent(content);
    form.reset({
      section: content.section,
      title: content.title,
      subtitle: content.subtitle,
      content: content.content,
      imageUrl: content.imageUrl,
      buttonText: content.buttonText,
      buttonLink: content.buttonLink,
      isActive: content.isActive,
      order: content.order,
    });
  };

  const handleUpdateContent = (data: z.infer<typeof contentSchema>) => {
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent._id, data });
    }
  };

  const handleDeleteContent = (id: string) => {
    if (confirm('Are you sure you want to delete this content?')) {
      deleteContentMutation.mutate(id);
    }
  };

  const getTabIcon = (tab: string) => {
    switch (tab) {
      case 'hero':
        return <Home className="h-4 w-4" />;
      case 'categories':
        return <LayoutGrid className="h-4 w-4" />;
      case 'featured':
        return <Star className="h-4 w-4" />;
      case 'products':
        return <ShoppingBag className="h-4 w-4" />;
      default:
        return <CircleDashed className="h-4 w-4" />;
    }
  };

  const filteredContents = contents?.filter(
    (content) => content.section === activeTab
  ) || [];

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Website Content</h1>
          <p className="text-muted-foreground">
            Manage content displayed on your website
          </p>
        </div>
        <Dialog open={isAddDialogOpen} onOpenChange={setIsAddDialogOpen}>
          <DialogTrigger asChild>
            <Button>
              <Plus className="mr-2 h-4 w-4" />
              Add Content
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Add Website Content</DialogTitle>
            </DialogHeader>
            <Form {...form}>
              <form
                onSubmit={form.handleSubmit(handleAddContent)}
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
                    onClick={() => setIsAddDialogOpen(false)}
                  >
                    Cancel
                  </Button>
                  <Button type="submit">Add Content</Button>
                </div>
              </form>
            </Form>
          </DialogContent>
        </Dialog>

        {/* Edit Dialog */}
        <Dialog 
          open={!!editingContent} 
          onOpenChange={(open) => !open && setEditingContent(null)}
        >
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle>Edit Website Content</DialogTitle>
            </DialogHeader>
            {editingContent && (
              <Form {...form}>
                <form
                  onSubmit={form.handleSubmit(handleUpdateContent)}
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
                      onClick={() => setEditingContent(null)}
                    >
                      Cancel
                    </Button>
                    <Button type="submit">Update Content</Button>
                  </div>
                </form>
              </Form>
            )}
          </DialogContent>
        </Dialog>
      </div>

      <Tabs defaultValue={activeTab} onValueChange={setActiveTab} className="space-y-4">
        <TabsList>
          <TabsTrigger value="hero" className="flex items-center gap-2">
            <Home className="h-4 w-4" />
            <span>Hero</span>
          </TabsTrigger>
          <TabsTrigger value="categories" className="flex items-center gap-2">
            <LayoutGrid className="h-4 w-4" />
            <span>Categories</span>
          </TabsTrigger>
          <TabsTrigger value="featured" className="flex items-center gap-2">
            <Star className="h-4 w-4" />
            <span>Featured</span>
          </TabsTrigger>
          <TabsTrigger value="products" className="flex items-center gap-2">
            <ShoppingBag className="h-4 w-4" />
            <span>Products</span>
          </TabsTrigger>
        </TabsList>

        {['hero', 'categories', 'featured', 'products'].map((section) => (
          <TabsContent key={section} value={section}>
            <Card>
              <CardHeader>
                <CardTitle className="flex items-center gap-2">
                  {getTabIcon(section)}
                  {section.charAt(0).toUpperCase() + section.slice(1)} Section
                </CardTitle>
                <CardDescription>
                  Manage content for the {section} section of your website
                </CardDescription>
              </CardHeader>
              <CardContent>
                {isLoading ? (
                  <div className="space-y-4">
                    {Array(3).fill(null).map((_, i) => (
                      <Skeleton key={i} className="h-24 w-full" />
                    ))}
                  </div>
                ) : filteredContents.length === 0 ? (
                  <div className="text-center p-6">
                    <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
                    <h3 className="text-lg font-semibold">No content found</h3>
                    <p className="text-muted-foreground mb-4">
                      Add content to display in the {section} section
                    </p>
                    <Button onClick={() => setIsAddDialogOpen(true)}>
                      <Plus className="h-4 w-4 mr-2" />
                      Add Content
                    </Button>
                  </div>
                ) : (
                  <div className="grid gap-4 md:grid-cols-2">
                    {filteredContents.map((content) => (
                      <Card key={content._id}>
                        <div className="relative">
                          {content.imageUrl && (
                            <div className="h-40 w-full overflow-hidden rounded-t-md">
                              <img 
                                src={content.imageUrl} 
                                alt={content.title}
                                className="h-full w-full object-cover"
                                onError={(e) => {
                                  const target = e.target as HTMLImageElement;
                                  target.src = 'https://placehold.co/600x400?text=Image+Error';
                                }}
                              />
                            </div>
                          )}
                          <div className="absolute top-2 right-2 flex gap-1">
                            <Button 
                              size="icon" 
                              variant="secondary" 
                              onClick={() => handleEditContent(content)}
                            >
                              <Pencil className="h-4 w-4" />
                            </Button>
                            <Button 
                              size="icon" 
                              variant="destructive"
                              onClick={() => handleDeleteContent(content._id)}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                        <CardContent className="pt-4">
                          <div className="flex items-center justify-between">
                            <h3 className="font-semibold">{content.title || 'Untitled'}</h3>
                            <div className="flex items-center gap-2">
                              {content.isActive ? (
                                <Badge variant="default" className="bg-green-500">Active</Badge>
                              ) : (
                                <Badge variant="secondary">Inactive</Badge>
                              )}
                            </div>
                          </div>
                          {content.subtitle && (
                            <p className="text-sm text-muted-foreground mt-1">{content.subtitle}</p>
                          )}
                          {content.content && (
                            <p className="text-sm mt-2 line-clamp-3">{content.content}</p>
                          )}
                          {content.buttonText && (
                            <div className="mt-2">
                              <Badge variant="outline">{content.buttonText} → {content.buttonLink}</Badge>
                            </div>
                          )}
                        </CardContent>
                      </Card>
                    ))}
                  </div>
                )}
              </CardContent>
            </Card>
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WebsiteContent;
