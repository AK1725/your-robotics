
import React from 'react';
import { 
  Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Plus } from 'lucide-react';
import { ContentForm, ContentFormValues } from './ContentForm';

interface AddContentDialogProps {
  isOpen: boolean;
  onOpenChange: (open: boolean) => void;
  onAdd: (data: ContentFormValues) => void;
  activeTab: string;
}

const AddContentDialog = ({ isOpen, onOpenChange, onAdd, activeTab }: AddContentDialogProps) => {
  const defaultValues = {
    section: activeTab,
    title: '',
    subtitle: '',
    content: '',
    imageUrl: '',
    buttonText: '',
    buttonLink: '',
    isActive: true,
    order: 0,
  };

  return (
    <Dialog open={isOpen} onOpenChange={onOpenChange}>
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
        <ContentForm 
          defaultValues={defaultValues}
          onSubmit={onAdd}
          onCancel={() => onOpenChange(false)}
          submitButtonText="Add Content"
        />
      </DialogContent>
    </Dialog>
  );
};

export default AddContentDialog;
