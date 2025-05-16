
import React from 'react';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Pencil, Trash2 } from 'lucide-react';

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

interface ContentCardProps {
  content: WebsiteContent;
  onEdit: (content: WebsiteContent) => void;
  onDelete: (id: string) => void;
}

const ContentCard = ({ content, onEdit, onDelete }: ContentCardProps) => {
  return (
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
            onClick={() => onEdit(content)}
          >
            <Pencil className="h-4 w-4" />
          </Button>
          <Button 
            size="icon" 
            variant="destructive"
            onClick={() => onDelete(content._id)}
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
  );
};

export default ContentCard;
