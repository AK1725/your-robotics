
import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import { 
  Tabs, TabsContent, TabsList, TabsTrigger 
} from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import {
  LayoutGrid,
  Home,
  ShoppingBag,
  Star,
  CircleDashed,
} from 'lucide-react';

import { WebsiteContent } from '@/components/admin/website-content/types';
import AddContentDialog from '@/components/admin/website-content/AddContentDialog';
import EditContentDialog from '@/components/admin/website-content/EditContentDialog';
import SectionView from '@/components/admin/website-content/SectionView';
import { ContentFormValues, contentSchema } from '@/components/admin/website-content/ContentForm';

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
    mutationFn: async (data: ContentFormValues) => {
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
    mutationFn: async ({ id, data }: { id: string; data: ContentFormValues }) => {
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

  const handleAddContent = (data: ContentFormValues) => {
    createContentMutation.mutate(data);
  };

  const handleEditContent = (content: WebsiteContent) => {
    setEditingContent(content);
  };

  const handleUpdateContent = (data: ContentFormValues) => {
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
        <AddContentDialog 
          isOpen={isAddDialogOpen}
          onOpenChange={setIsAddDialogOpen}
          onAdd={handleAddContent}
          activeTab={activeTab}
        />
        <EditContentDialog
          content={editingContent}
          onOpenChange={(open) => !open && setEditingContent(null)}
          onUpdate={handleUpdateContent}
        />
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
            <SectionView
              section={section}
              icon={getTabIcon(section)}
              isLoading={isLoading}
              contents={filteredContents}
              onAdd={() => setIsAddDialogOpen(true)}
              onEdit={handleEditContent}
              onDelete={handleDeleteContent}
            />
          </TabsContent>
        ))}
      </Tabs>
    </div>
  );
};

export default WebsiteContent;
