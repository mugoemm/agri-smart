import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit3, Save } from "lucide-react";

export default function NoteCard({ note, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [title, setTitle] = useState(note.title || "");
  const [content, setContent] = useState(note.content || "");

  const handleSave = () => {
    onSave?.({ ...note, title, content });
    setIsEditing(false);
  };

  return (
    <Card className="w-full max-w-sm rounded-2xl shadow-md hover:shadow-lg transition-all">
      <CardHeader>
        {isEditing ? (
          <Input value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Title" />
        ) : (
          <CardTitle>{title}</CardTitle>
        )}
      </CardHeader>
      <CardContent>
        {isEditing ? (
          <Textarea value={content} onChange={(e) => setContent(e.target.value)} rows={5} />
        ) : (
          <p className="text-sm text-muted-foreground whitespace-pre-wrap">{content}</p>
        )}
      </CardContent>
      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button size="sm" onClick={handleSave} className="flex items-center gap-1">
              <Save size={16} /> Save
            </Button>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(false)}>
              Cancel
            </Button>
          </>
        ) : (
          <>
            <Button size="sm" variant="outline" onClick={() => setIsEditing(true)} className="flex items-center gap-1">
              <Edit3 size={16} /> Edit
            </Button>
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(note._id)} className="flex items-center gap-1">
              <Trash2 size={16} /> Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}
