import { X, GripVertical } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useState } from "react";

interface ImageFile {
  id: string;
  file: File;
  preview: string;
}

interface ImagePreviewProps {
  images: ImageFile[];
  onRemove: (id: string) => void;
  onReorder: (images: ImageFile[]) => void;
}

const ImagePreview = ({ images, onRemove, onReorder }: ImagePreviewProps) => {
  const [draggedId, setDraggedId] = useState<string | null>(null);
  const [dragOverId, setDragOverId] = useState<string | null>(null);

  const handleDragStart = (id: string) => {
    setDraggedId(id);
  };

  const handleDragOver = (id: string) => {
    if (draggedId && draggedId !== id) {
      setDragOverId(id);
    }
  };

  const handleDrop = (targetId: string) => {
    if (!draggedId || draggedId === targetId) return;

    const draggedIndex = images.findIndex((img) => img.id === draggedId);
    const targetIndex = images.findIndex((img) => img.id === targetId);

    if (draggedIndex === -1 || targetIndex === -1) return;

    const newImages = [...images];
    const [draggedImage] = newImages.splice(draggedIndex, 1);
    newImages.splice(targetIndex, 0, draggedImage);

    onReorder(newImages);
    setDraggedId(null);
    setDragOverId(null);
  };

  const handleDragEnd = () => {
    setDraggedId(null);
    setDragOverId(null);
  };

  if (images.length === 0) return null;

  return (
    <div className="space-y-3">
      <div className="flex items-center justify-between">
        <h3 className="text-sm font-medium text-foreground">
          Uploaded Images ({images.length})
        </h3>
        <span className="text-xs text-muted-foreground">Drag to reorder</span>
      </div>
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4">
        {images.map((image, index) => (
          <div
            key={image.id}
            draggable
            onDragStart={() => handleDragStart(image.id)}
            onDragOver={() => handleDragOver(image.id)}
            onDrop={() => handleDrop(image.id)}
            onDragEnd={handleDragEnd}
            className={`group relative aspect-square rounded-lg overflow-hidden border-2 bg-card shadow-sm hover:shadow-md transition-all cursor-move ${
              draggedId === image.id
                ? "opacity-50 border-primary"
                : dragOverId === image.id
                  ? "border-primary bg-primary/5"
                  : "border-border"
            }`}
          >
            <img
              src={image.preview}
              alt={image.file.name}
              className="w-full h-full object-cover pointer-events-none"
            />
            <div className="absolute inset-0 bg-foreground/0 group-hover:bg-foreground/10 transition-colors" />
            <div className="absolute top-2 left-2 bg-secondary text-secondary-foreground text-xs font-mono px-2 py-1 rounded">
              {index + 1}
            </div>
            <Button
              variant="destructive"
              size="icon"
              className="absolute top-2 right-2 w-6 h-6 opacity-0 group-hover:opacity-100 transition-opacity"
              onClick={() => onRemove(image.id)}
            >
              <X className="w-3 h-3" />
            </Button>
            <div className="absolute bottom-0 left-0 right-0 bg-card/90 backdrop-blur-sm px-2 py-1.5">
              <p className="text-xs text-foreground truncate font-medium">
                {image.file.name}
              </p>
            </div>
            <div className="absolute left-2 top-1/2 -translate-y-1/2 opacity-0 group-hover:opacity-75 transition-opacity pointer-events-none">
              <GripVertical className="w-4 h-4 text-foreground" />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ImagePreview;
