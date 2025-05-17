import React, { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import axios from 'axios';
import {
  Tabs,
  TabsContent,
  TabsList,
  TabsTrigger
} from '@/components/ui/tabs';
import { toast } from '@/components/ui/sonner';
import {
  LayoutGrid,
  Home,
  ShoppingBag,
  Star,
  CircleDashed,
} from 'lucide-react';

import type { WebsiteContent as WebsiteContentType } from '@/components/admin/website-content/types';
import AddContentDialog from '@/components/admin/website-content/AddContentDialog';
import EditContentDialog from '@/components/admin/website-content/EditContentDialog';
import SectionView from '@/components/admin/website-content/SectionView';
import { ContentFormValues } from '@/components/admin/website-content/ContentForm';

const SECTIONS = [
  { id: 'hero', name: 'Hero', icon: <LayoutGrid size={20} /> },
  { id: 'about', name: 'About', icon: <Home size={20} /> },
  { id: 'products', name: 'Products', icon: <ShoppingBag size={20} /> },
  { id: 'testimonials', name: 'Testimonials', icon: <Star size={20} /> },
  { id: 'misc', name: 'Misc', icon: <CircleDashed size={20} /> },
];

const WebsiteContentAdminPage = () => {
  const queryClient = useQueryClient();
  const [activeTab, setActiveTab] = useState<string>('hero');
  const [isAddDialogOpen, setIsAddDialogOpen] = useState(false);
  const [editingContent, setEditingContent] = useState<WebsiteContentType | null>(null);

  const { data: contents = [], isLoading } = useQuery({
    queryKey: ['websiteContents'],
    queryFn: async () => {
      try {
        const response = await axios.get('/api/content');
        return response.data as WebsiteContentType[];
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

  const handleEditContent = (content: WebsiteContentType) => {
    setEditingContent(content);
  };

  const handleUpdateContent = (data: ContentFormValues) => {
    if (editingContent) {
      updateContentMutation.mutate({ id: editingContent._id, data });
    }
  };

  const handleDeleteContent = (id: string) => {
    if (window.confirm('Are you sure you want to delete this content?')) {
      deleteContentMutation.mutate(id);
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Website Content Management</h1>
      <Tabs value={activeTab} onValueChange={setActiveTab}>
        <TabsList>
          {SECTIONS.map((section) => (
            <TabsTrigger key={section.id} value={section.id}>
              <span className="flex items-center gap-2">{section.icon}{section.name}</span>
            </TabsTrigger>
          ))}
        </TabsList>
        {SECTIONS.map((section) => (
          <TabsContent key={section.id} value={section.id}>
            <SectionView
              section={section.id}
              icon={section.icon}
              isLoading={isLoading}
              contents={contents.filter(c => c.section === section.id)}
              onAdd={() => setIsAddDialogOpen(true)}
              onEdit={handleEditContent}
              onDelete={handleDeleteContent}
            />
          </TabsContent>
        ))}
      </Tabs>
      <AddContentDialog
        isOpen={isAddDialogOpen}
        onOpenChange={setIsAddDialogOpen}
        activeTab={activeTab}
        onAdd={handleAddContent}
      />
      <EditContentDialog
        content={editingContent}
        onOpenChange={(open) => { if (!open) setEditingContent(null); }}
        onUpdate={handleUpdateContent}
      />
    </div>
  );
};

export default WebsiteContentAdminPage;
