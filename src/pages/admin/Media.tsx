
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from '@/components/ui/dropdown-menu';
import { toast } from '@/components/ui/sonner';
import { Copy, Download, ImageIcon, MoreHorizontal, Search, Trash2, Upload } from 'lucide-react';

const demoImages = [
  'https://images.unsplash.com/photo-1518770660439-4636190af475',
  'https://images.unsplash.com/photo-1581090464777-f3220bbe1b8b',
  'https://images.unsplash.com/photo-1460925895917-afdab827c52f',
  'https://images.unsplash.com/photo-1498050108023-c5249f4df085',
  'https://images.unsplash.com/photo-1649972904349-6e44c42644a7',
  'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b',
  'https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d',
  'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158'
];

interface MediaFile {
  id: string;
  url: string;
  name: string;
  type: string;
  size: string;
  date: string;
}

const Media: React.FC = () => {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedFiles, setSelectedFiles] = useState<Set<string>>(new Set());

  // Mock data for media files
  const mediaFiles: MediaFile[] = demoImages.map((url, index) => ({
    id: `file-${index + 1}`,
    url: url + '?w=300&h=300&fit=crop',
    name: `robotics-image-${index + 1}.jpg`,
    type: 'image/jpeg',
    size: `${Math.floor(Math.random() * 900) + 100}KB`,
    date: new Date(Date.now() - Math.floor(Math.random() * 30) * 24 * 60 * 60 * 1000).toLocaleDateString(),
  }));

  const filteredFiles = mediaFiles.filter(file => 
    file.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleFileSelection = (fileId: string) => {
    const newSelectedFiles = new Set(selectedFiles);
    if (newSelectedFiles.has(fileId)) {
      newSelectedFiles.delete(fileId);
    } else {
      newSelectedFiles.add(fileId);
    }
    setSelectedFiles(newSelectedFiles);
  };

  const copyToClipboard = (url: string) => {
    navigator.clipboard.writeText(url).then(() => {
      toast.success('URL copied to clipboard');
    });
  };

  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files.length > 0) {
      // In a real app, this would upload the file to your server or CDN
      toast.success(`${e.target.files.length} file(s) selected for upload`);
      setTimeout(() => {
        toast('Note: This is a demo. Files are not actually uploaded.');
      }, 500);
    }
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        <div>
          <h1 className="text-2xl font-bold tracking-tight">Media Library</h1>
          <p className="text-muted-foreground">Manage your media files</p>
        </div>
        <div className="flex gap-2 items-center">
          <Button variant="outline" className="flex gap-2">
            <Upload className="h-4 w-4" />
            <label htmlFor="file-upload" className="cursor-pointer">
              Upload Files
            </label>
            <Input 
              id="file-upload"
              type="file"
              multiple
              className="hidden"
              onChange={handleFileUpload}
            />
          </Button>
          {selectedFiles.size > 0 && (
            <Button variant="destructive" size="icon">
              <Trash2 className="h-4 w-4" />
            </Button>
          )}
        </div>
      </div>

      <div className="flex items-center gap-4">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-muted-foreground" />
          <Input
            placeholder="Search files..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
      </div>

      <Card>
        <CardHeader className="p-4 pb-0">
          <Tabs defaultValue="grid">
            <div className="flex justify-between items-center">
              <TabsList>
                <TabsTrigger value="grid">Grid</TabsTrigger>
                <TabsTrigger value="list">List</TabsTrigger>
              </TabsList>
              <div className="text-sm text-muted-foreground">
                {filteredFiles.length} items
              </div>
            </div>
          </Tabs>
        </CardHeader>
        <CardContent className="p-4">
          <Tabs defaultValue="grid">
            <TabsContent value="grid">
              {filteredFiles.length > 0 ? (
                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
                  {filteredFiles.map((file) => (
                    <Card 
                      key={file.id}
                      className={`relative overflow-hidden cursor-pointer hover:border-primary transition-colors ${
                        selectedFiles.has(file.id) ? 'ring-2 ring-primary' : ''
                      }`}
                      onClick={() => toggleFileSelection(file.id)}
                    >
                      <div className="h-40 relative">
                        <img
                          src={file.url}
                          alt={file.name}
                          className="w-full h-full object-cover"
                        />
                        <div className="absolute top-2 right-2">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon" className="h-7 w-7 bg-black/40 hover:bg-black/60 text-white rounded-full">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(file.url);
                              }}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </div>
                      </div>
                      <div className="p-2">
                        <div className="truncate text-sm font-medium">{file.name}</div>
                        <div className="text-xs text-muted-foreground">{file.size}</div>
                      </div>
                    </Card>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12">
                  <div className="mx-auto mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-muted">
                    <ImageIcon className="h-6 w-6" />
                  </div>
                  <h3 className="text-lg font-semibold">No files found</h3>
                  <p className="text-sm text-muted-foreground mt-2">
                    {searchTerm ? "Try a different search term" : "Upload some files to get started"}
                  </p>
                </div>
              )}
            </TabsContent>
            <TabsContent value="list">
              <div className="rounded-md border">
                <table className="w-full text-sm">
                  <thead>
                    <tr className="border-b bg-muted/50">
                      <th className="py-2 px-4 text-left font-medium">File</th>
                      <th className="py-2 px-4 text-left font-medium">Type</th>
                      <th className="py-2 px-4 text-left font-medium">Size</th>
                      <th className="py-2 px-4 text-left font-medium">Date</th>
                      <th className="py-2 px-4 text-right font-medium">Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {filteredFiles.map((file) => (
                      <tr 
                        key={file.id} 
                        className={`border-b hover:bg-muted/50 ${selectedFiles.has(file.id) ? 'bg-muted/50' : ''}`}
                        onClick={() => toggleFileSelection(file.id)}
                      >
                        <td className="py-2 px-4">
                          <div className="flex items-center gap-3">
                            <div className="h-10 w-10 overflow-hidden rounded border">
                              <img 
                                src={file.url} 
                                alt={file.name}
                                className="h-full w-full object-cover"
                              />
                            </div>
                            <span className="truncate max-w-[150px]">{file.name}</span>
                          </div>
                        </td>
                        <td className="py-2 px-4">{file.type}</td>
                        <td className="py-2 px-4">{file.size}</td>
                        <td className="py-2 px-4">{file.date}</td>
                        <td className="py-2 px-4 text-right">
                          <DropdownMenu>
                            <DropdownMenuTrigger asChild onClick={(e) => e.stopPropagation()}>
                              <Button variant="ghost" size="icon">
                                <MoreHorizontal className="h-4 w-4" />
                              </Button>
                            </DropdownMenuTrigger>
                            <DropdownMenuContent align="end">
                              <DropdownMenuItem onClick={(e) => {
                                e.stopPropagation();
                                copyToClipboard(file.url);
                              }}>
                                <Copy className="mr-2 h-4 w-4" />
                                Copy URL
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Download className="mr-2 h-4 w-4" />
                                Download
                              </DropdownMenuItem>
                              <DropdownMenuItem onClick={(e) => e.stopPropagation()}>
                                <Trash2 className="mr-2 h-4 w-4" />
                                Delete
                              </DropdownMenuItem>
                            </DropdownMenuContent>
                          </DropdownMenu>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </TabsContent>
          </Tabs>
        </CardContent>
      </Card>
    </div>
  );
};

export default Media;
