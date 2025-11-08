import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import NoteCard from "../components/NoteCard";
import NewNoteDialog from "../components/NewNoteDialog";
import ListingCard from "../components/ListingCard";
import NewListingDialog from "../components/NewListingDialog";
import { NotesAPI, ListingsAPI } from "../lib/api";

export default function Dashboard() {
  const [notes, setNotes] = useState([]);
  const [listings, setListings] = useState([]);

  const [isNoteDialogOpen, setIsNoteDialogOpen] = useState(false);
  const [isListingDialogOpen, setIsListingDialogOpen] = useState(false);

  // Fetch notes from backend
  const fetchNotes = async () => {
    const userId = import.meta.env.VITE_FAKE_USER_ID || "demo";
    const data = await NotesAPI.list(userId);
    setNotes(data);
  };

  // Fetch listings from backend
  const fetchListings = async () => {
    const data = await ListingsAPI.listAll();
    setListings(data);
  };

  useEffect(() => {
    fetchNotes();
    fetchListings();
  }, []);

  // Handlers for Notes
  const handleCreateNote = async (note) => {
    await NotesAPI.create(note);
    fetchNotes();
  };

  const handleDeleteNote = async (id) => {
    await NotesAPI.delete(id);
    fetchNotes();
  };

  const handleUpdateNote = async (note) => {
    await NotesAPI.update(note._id, note);
    fetchNotes();
  };

  // Handlers for Listings
  const handleCreateListing = async (formData) => {
    await ListingsAPI.create(formData); // backend expects JSON
    fetchListings();
  };

  const handleDeleteListing = async (id) => {
    await ListingsAPI.delete(id);
    fetchListings();
  };

  const handleUpdateListing = async (listing) => {
    await ListingsAPI.update(listing._id, listing);
    fetchListings();
  };

  return (
    <div className="p-4 space-y-8">
      {/* Notes Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Notes</h2>
          <Button onClick={() => setIsNoteDialogOpen(true)}>New Note</Button>
        </div>

        <NewNoteDialog
          isOpen={isNoteDialogOpen}
          onClose={() => setIsNoteDialogOpen(false)}
          onCreate={handleCreateNote}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {notes.map((note) => (
            <NoteCard
              key={note._id}
              note={note}
              onDelete={handleDeleteNote}
              onSave={handleUpdateNote}
            />
          ))}
        </div>
      </section>

      {/* Listings Section */}
      <section>
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-semibold">My Listings</h2>
          <Button onClick={() => setIsListingDialogOpen(true)}>New Listing</Button>
        </div>

        <NewListingDialog
          isOpen={isListingDialogOpen}
          onClose={() => setIsListingDialogOpen(false)}
          onCreate={handleCreateListing}
        />

        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
          {listings.map((listing) => (
            <ListingCard
              key={listing._id}
              listing={listing}
              onDelete={handleDeleteListing}
              onSave={handleUpdateListing}
            />
          ))}
        </div>
      </section>
    </div>
  );
}
