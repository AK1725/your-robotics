
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Skeleton } from '@/components/ui/skeleton';
import { ImageIcon, Plus } from 'lucide-react';
import ContentCard, { WebsiteContent } from './ContentCard';

interface SectionViewProps {
  section: string;
  icon: React.ReactNode;
  isLoading: boolean;
  contents: WebsiteContent[];
  onAdd: () => void;
  onEdit: (content: WebsiteContent) => void;
  onDelete: (id: string) => void;
}

const SectionView = ({ 
  section, 
  icon, 
  isLoading, 
  contents, 
  onAdd, 
  onEdit, 
  onDelete 
}: SectionViewProps) => {
  const displayName = section.charAt(0).toUpperCase() + section.slice(1);

  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          {icon}
          {displayName} Section
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
        ) : contents.length === 0 ? (
          <div className="text-center p-6">
            <ImageIcon className="h-10 w-10 mx-auto text-muted-foreground mb-3" />
            <h3 className="text-lg font-semibold">No content found</h3>
            <p className="text-muted-foreground mb-4">
              Add content to display in the {section} section
            </p>
            <Button onClick={onAdd}>
              <Plus className="h-4 w-4 mr-2" />
              Add Content
            </Button>
          </div>
        ) : (
          <div className="grid gap-4 md:grid-cols-2">
            {contents.map((content) => (
              <ContentCard 
                key={content._id}
                content={content}
                onEdit={onEdit}
                onDelete={onDelete}
              />
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default SectionView;
