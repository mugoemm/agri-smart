import { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Trash2, Edit3, Save } from "lucide-react";

export default function ListingCard({ listing, onSave, onDelete }) {
  const [isEditing, setIsEditing] = useState(false);
  const [cropName, setCropName] = useState(listing.cropName || "");
  const [description, setDescription] = useState(listing.description || "");
  const [pricePerUnit, setPricePerUnit] = useState(listing.pricePerUnit || 0);
  const [quantity, setQuantity] = useState(listing.quantity || 0);
  const [unit, setUnit] = useState(listing.unit || "kg");
  const [location, setLocation] = useState(listing.location || "");

  const handleSave = () => {
    onSave?.({
      ...listing,
      cropName,
      description,
      pricePerUnit: Number(pricePerUnit),
      quantity: Number(quantity),
      unit,
      location,
    });
    setIsEditing(false);
  };

  return (
    <Card className="w-full max-w-sm shadow-md hover:shadow-lg transition-all duration-300 rounded-2xl">
      <CardHeader>
        {isEditing ? (
          <Input value={cropName} onChange={(e) => setCropName(e.target.value)} placeholder="Crop name" />
        ) : (
          <CardTitle>{cropName}</CardTitle>
        )}
      </CardHeader>

      <CardContent className="space-y-2">
        {isEditing ? (
          <>
            <Textarea value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Description" />
            <div className="grid grid-cols-2 gap-2">
              <Input type="number" value={pricePerUnit} onChange={(e) => setPricePerUnit(e.target.value)} placeholder="Price per unit" />
              <Input type="number" value={quantity} onChange={(e) => setQuantity(e.target.value)} placeholder="Quantity" />
            </div>
            <div className="grid grid-cols-2 gap-2">
              <Input value={unit} onChange={(e) => setUnit(e.target.value)} placeholder="Unit (kg/bag/crate)" />
              <Input value={location} onChange={(e) => setLocation(e.target.value)} placeholder="Location" />
            </div>
          </>
        ) : (
          <>
            <p className="text-sm text-muted-foreground">{description || "No description"}</p>
            <p className="mt-1 font-semibold">KES {pricePerUnit || "N/A"} / {unit || "kg"}</p>
            <p className="text-sm">Qty: {quantity || "N/A"} {unit || "kg"}</p>
            <p className="text-sm text-muted-foreground">Location: {location || "N/A"}</p>
          </>
        )}
      </CardContent>

      <CardFooter className="flex justify-end gap-2">
        {isEditing ? (
          <>
            <Button size="sm" variant="default" onClick={handleSave} className="flex items-center gap-1">
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
            <Button size="sm" variant="destructive" onClick={() => onDelete?.(listing._id)} className="flex items-center gap-1">
              <Trash2 size={16} /> Delete
            </Button>
          </>
        )}
      </CardFooter>
    </Card>
  );
}