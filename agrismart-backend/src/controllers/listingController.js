import Listing from "../models/Listing.js";

// Create new listing
export const createListing = async (req, res) => {
  try {
    const { cropName, quantity, unit, pricePerUnit, location, description } = req.body;
    
    console.log("Creating listing:", { cropName, quantity, unit, pricePerUnit, location, description });
    console.log("Farmer ID:", req.user._id);

    const listing = await Listing.create({
      farmerId: req.user._id,
      cropName,
      quantity,
      unit,
      pricePerUnit,
      location,
      description
    });
    
    console.log("Listing created successfully:", listing);

    res.status(201).json({ msg: "Listing created", listing });
  } catch (err) {
    console.error("Create listing error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get all listings
export const getListings = async (req, res) => {
  try {
    const listings = await Listing.find().populate("farmerId", "name phone email");
    console.log(`Fetched ${listings.length} listings`);
    if (listings.length > 0) {
      console.log("Sample listing:", listings[0]);
    }
    res.json(listings);
  } catch (err) {
    console.error("Get listings error:", err);
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Get single listing
export const getListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id).populate("farmerId", "name phone email");
    if (!listing) return res.status(404).json({ msg: "Listing not found" });
    res.json(listing);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Update listing (farmer only)
export const updateListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ msg: "Listing not found" });
    if (!listing.farmerId.equals(req.user._id))
      return res.status(403).json({ msg: "Not authorized" });

    const fields = ["cropName", "quantity", "unit", "pricePerUnit", "location", "description"];
    fields.forEach((f) => {
      if (req.body[f] !== undefined) listing[f] = req.body[f];
    });

    await listing.save();
    res.json({ msg: "Listing updated", listing });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};

// Delete listing (farmer only)
export const deleteListing = async (req, res) => {
  try {
    const listing = await Listing.findById(req.params.id);
    if (!listing) return res.status(404).json({ msg: "Listing not found" });
    if (!listing.farmerId.equals(req.user._id))
      return res.status(403).json({ msg: "Not authorized" });

    await listing.deleteOne();
    res.json({ msg: "Listing deleted" });
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
};
