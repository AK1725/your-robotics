
import React from 'react';
import { Dialog, DialogContent, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { ContentForm, ContentFormValues } from './ContentForm';
import { WebsiteContent } from './ContentCard';

interface EditContentDialogProps {
  content: WebsiteContent | null;
  onOpenChange: (open: boolean) => void;
  onUpdate: (data: ContentFormValues) => void;
}

const EditContentDialog = ({ content, onOpenChange, onUpdate }: EditContentDialogProps) => {
  if (!content) return null;

  const defaultValues = {
    section: content.section,
    title: content.title,
    subtitle: content.subtitle,
    content: content.content,
    imageUrl: content.imageUrl,
    buttonText: content.buttonText,
    buttonLink: content.buttonLink,
    isActive: content.isActive,
    order: content.order,
  };

  return (
    <Dialog 
      open={!!content} 
      onOpenChange={onOpenChange}
    >
      <DialogContent className="sm:max-w-[600px]">
        <DialogHeader>
          <DialogTitle>Edit Website Content</DialogTitle>
        </DialogHeader>
        <ContentForm 
          defaultValues={defaultValues}
          onSubmit={onUpdate}
          onCancel={() => onOpenChange(false)}
          submitButtonText="Update Content"
        />
      </DialogContent>
    </Dialog>
  );
};

export default EditContentDialog;
