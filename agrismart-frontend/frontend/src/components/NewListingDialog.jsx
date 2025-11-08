import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";

export default function NewListingDialog({ isOpen, onClose, onCreate }) {
  const [cropName, setCropName] = useState("");
  const [description, setDescription] = useState("");
  const [pricePerUnit, setPricePerUnit] = useState("");
  const [quantity, setQuantity] = useState("");
  const [unit, setUnit] = useState("kg");
  const [location, setLocation] = useState("");
  const [loading, setLoading] = useState(false);

  const handleCreate = async () => {
    if (!cropName.trim()) return;
    setLoading(true);
    try {
      await onCreate?.({
        cropName,
        description,
        pricePerUnit: Number(pricePerUnit) || 0,
        quantity: Number(quantity) || 0,
        unit,
        location,
      });
      // Reset form
      setCropName("");
      setDescription("");
      setPricePerUnit("");
      setQuantity("");
      setUnit("kg");
      setLocation("");
      onClose?.();
    } finally {
      setLoading(false);
    }
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent className="sm:max-w-lg">
        <DialogHeader>
          <DialogTitle>New Listing</DialogTitle>
        </DialogHeader>

        <div className="flex flex-col gap-4 mt-4">
          <Input
            value={cropName}
            onChange={(e) => setCropName(e.target.value)}
            placeholder="Crop Name (e.g., Tomatoes)"
          />
          <Textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            placeholder="Description..."
            rows={3}
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              type="number"
              value={pricePerUnit}
              onChange={(e) => setPricePerUnit(e.target.value)}
              placeholder="Price per unit"
            />
            <Input
              type="number"
              value={quantity}
              onChange={(e) => setQuantity(e.target.value)}
              placeholder="Quantity"
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              value={unit}
              onChange={(e) => setUnit(e.target.value)}
              placeholder="Unit (kg/bag/crate)"
            />
            <Input
              value={location}
              onChange={(e) => setLocation(e.target.value)}
              placeholder="Location"
            />
          </div>
        </div>

        <DialogFooter className="mt-4">
          <Button variant="outline" onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button onClick={handleCreate} disabled={loading}>
            {loading ? "Creating..." : "Create Listing"}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  );
}
