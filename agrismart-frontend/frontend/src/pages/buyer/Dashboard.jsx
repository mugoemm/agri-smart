import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ListingsAPI } from "@/lib/api";
import Analytics from "@/components/Analytics";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Leaf,
  Home,
  LogOut,
  Search,
  Filter,
  MapPin,
  Sprout,
  PawPrint,
  Coffee,
  BarChart3,
  ShoppingBag,
  Phone,
  Mail,
  User,
} from "lucide-react";

export default function BuyerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [listings, setListings] = useState([]);
  const [filteredListings, setFilteredListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("all");
  const [locationFilter, setLocationFilter] = useState("");
  const [priceRange, setPriceRange] = useState({ min: "", max: "" });
  const [activeTab, setActiveTab] = useState("marketplace"); // "marketplace" or "analytics"

  useEffect(() => {
    fetchListings();
  }, []);

  useEffect(() => {
    applyFilters();
  }, [listings, searchTerm, selectedCategory, locationFilter, priceRange]);

  const fetchListings = async () => {
    try {
      const data = await ListingsAPI.listAll();
      setListings(data);
      setFilteredListings(data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
    } finally {
      setLoading(false);
    }
  };

  const applyFilters = () => {
    let filtered = [...listings];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(
        (listing) =>
          listing.cropName?.toLowerCase().includes(searchTerm.toLowerCase()) ||
          listing.description?.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (selectedCategory && selectedCategory !== "all") {
      filtered = filtered.filter(
        (listing) => listing.category?.toLowerCase() === selectedCategory.toLowerCase()
      );
    }

    // Location filter
    if (locationFilter) {
      filtered = filtered.filter((listing) =>
        listing.location?.toLowerCase().includes(locationFilter.toLowerCase())
      );
    }

    // Price range filter
    if (priceRange.min) {
      filtered = filtered.filter(
        (listing) => listing.pricePerUnit >= parseFloat(priceRange.min)
      );
    }
    if (priceRange.max) {
      filtered = filtered.filter(
        (listing) => listing.pricePerUnit <= parseFloat(priceRange.max)
      );
    }

    setFilteredListings(filtered);
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const categories = [
    {
      id: "all",
      name: "All Categories",
      icon: <Leaf className="w-8 h-8" />,
      color: "from-gray-400 to-gray-600",
    },
    {
      id: "horticulture",
      name: "Horticulture",
      icon: <Sprout className="w-8 h-8" />,
      color: "from-green-400 to-green-600",
    },
    {
      id: "animal-husbandry",
      name: "Animal Husbandry",
      icon: <PawPrint className="w-8 h-8" />,
      color: "from-amber-400 to-amber-600",
    },
    {
      id: "cash-crops",
      name: "Cash Crops",
      icon: <Coffee className="w-8 h-8" />,
      color: "from-purple-400 to-purple-600",
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading marketplace...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-blue-700 font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>AgriSmart</span>
            <span className="text-sm font-normal text-gray-500 ml-2">| Buyer Marketplace</span>
          </div>

          <div className="flex items-center gap-4">
            <Button
              variant="outline"
              size="sm"
              onClick={() => navigate("/")}
              className="flex items-center gap-2"
            >
              <Home className="w-4 h-4" />
              Home
            </Button>
            <span className="text-sm text-gray-600">
              Welcome, {user?.name || user?.email}
            </span>
            <Button
              variant="outline"
              size="sm"
              onClick={handleLogout}
              className="flex items-center gap-2 border-red-600 text-red-600 hover:bg-red-50"
            >
              <LogOut className="w-4 h-4" />
              Logout
            </Button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <main className="container mx-auto px-4 py-8">
        {/* Header Section */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Buyer Marketplace</h1>
          <p className="text-gray-600">
            Browse fresh produce directly from local farmers across Kenya
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("marketplace")}
            className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-colors ${
              activeTab === "marketplace"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <ShoppingBag className="w-5 h-5" />
            Marketplace
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-colors ${
              activeTab === "analytics"
                ? "text-blue-600 border-b-2 border-blue-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            My Analytics
          </button>
        </div>

        {activeTab === "analytics" ? (
          /* Analytics View */
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Purchase Analytics</h2>
              <p className="text-gray-600">Track your spending, orders, and savings</p>
            </div>
            <Analytics userRole="buyer" />
          </div>
        ) : (
          /* Marketplace View */
          <>
        {/* Category Cards */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
          {categories.map((category) => (
            <Card
              key={category.id}
              className={`cursor-pointer hover:shadow-lg transition-all duration-300 overflow-hidden ${
                selectedCategory === category.id
                  ? "ring-2 ring-blue-500 shadow-lg"
                  : ""
              }`}
              onClick={() => setSelectedCategory(category.id)}
            >
              <div
                className={`h-24 bg-gradient-to-br ${category.color} flex items-center justify-center text-white`}
              >
                {category.icon}
              </div>
              <CardContent className="pt-4 pb-4 text-center">
                <p className="font-semibold text-sm">{category.name}</p>
              </CardContent>
            </Card>
          ))}
        </div>

        {/* Search and Filters */}
        <Card className="mb-8">
          <CardContent className="pt-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {/* Search */}
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Search produce..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Location Filter */}
              <div className="relative">
                <MapPin className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4 text-gray-400" />
                <Input
                  placeholder="Location (e.g., Nairobi)"
                  value={locationFilter}
                  onChange={(e) => setLocationFilter(e.target.value)}
                  className="pl-10"
                />
              </div>

              {/* Price Range - Min */}
              <Input
                type="number"
                placeholder="Min price (KES)"
                value={priceRange.min}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, min: e.target.value }))
                }
              />

              {/* Price Range - Max */}
              <Input
                type="number"
                placeholder="Max price (KES)"
                value={priceRange.max}
                onChange={(e) =>
                  setPriceRange((prev) => ({ ...prev, max: e.target.value }))
                }
              />
            </div>

            <div className="mt-4 flex items-center justify-between">
              <p className="text-sm text-gray-600">
                Showing {filteredListings.length} of {listings.length} listings
              </p>
              <Button
                variant="outline"
                size="sm"
                onClick={() => {
                  setSearchTerm("");
                  setSelectedCategory("all");
                  setLocationFilter("");
                  setPriceRange({ min: "", max: "" });
                }}
                className="flex items-center gap-2"
              >
                <Filter className="w-4 h-4" />
                Clear Filters
              </Button>
            </div>
          </CardContent>
        </Card>

        {/* Listings Grid */}
        {filteredListings.length === 0 ? (
          <Card className="p-12 text-center">
            <p className="text-gray-500 text-lg mb-2">No listings found</p>
            <p className="text-sm text-gray-400">
              Try adjusting your filters or search terms
            </p>
          </Card>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredListings.map((listing) => (
              <Card
                key={listing._id}
                className="hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="h-32 bg-gradient-to-br from-green-100 to-green-200 flex items-center justify-center">
                  <div className="text-6xl">
                    {listing.category === "horticulture"
                      ? "🌾"
                      : listing.category === "animal-husbandry"
                      ? "🐄"
                      : "☕"}
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{listing.cropName || "N/A"}</CardTitle>
                  <p className="text-sm text-gray-500 capitalize">
                    {listing.category?.replace("-", " ") || "General"}
                  </p>
                </CardHeader>
                <CardContent>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between items-baseline">
                      <span className="text-gray-600">Price:</span>
                      <span className="text-2xl font-bold text-green-700">
                        KES {listing.pricePerUnit || "N/A"}
                        <span className="text-sm text-gray-500 font-normal">/{listing.unit || "kg"}</span>
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600">Available:</span>
                      <span className="font-medium">{listing.quantity || "N/A"} {listing.unit || "kg"}</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span className="text-gray-600">Location:</span>
                      <span className="font-medium flex items-center gap-1">
                        <MapPin className="w-3 h-3" />
                        {listing.location || "N/A"}
                      </span>
                    </div>
                    {listing.description && (
                      <p className="text-gray-600 text-xs mt-2 line-clamp-2">
                        {listing.description}
                      </p>
                    )}
                    
                    {/* Farmer Contact Information */}
                    {listing.farmerId && (
                      <div className="mt-4 pt-4 border-t border-gray-200">
                        <p className="text-xs font-semibold text-gray-700 mb-2">Farmer Details:</p>
                        <div className="space-y-1">
                          <div className="flex items-center gap-2 text-xs text-gray-600">
                            <User className="w-3 h-3 text-green-600" />
                            <span className="font-medium">{listing.farmerId.name || "N/A"}</span>
                          </div>
                          {listing.farmerId.phone && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Phone className="w-3 h-3 text-blue-600" />
                              <a href={`tel:${listing.farmerId.phone}`} className="hover:text-blue-600 hover:underline">
                                {listing.farmerId.phone}
                              </a>
                            </div>
                          )}
                          {listing.farmerId.email && (
                            <div className="flex items-center gap-2 text-xs text-gray-600">
                              <Mail className="w-3 h-3 text-purple-600" />
                              <a href={`mailto:${listing.farmerId.email}`} className="hover:text-purple-600 hover:underline truncate">
                                {listing.farmerId.email}
                              </a>
                            </div>
                          )}
                        </div>
                      </div>
                    )}
                  </div>
                </CardContent>
                <CardFooter className="flex gap-2">
                  {listing.farmerId?.phone && (
                    <Button 
                      className="flex-1 bg-green-600 hover:bg-green-700"
                      onClick={() => window.location.href = `tel:${listing.farmerId.phone}`}
                    >
                      <Phone className="w-4 h-4 mr-1" />
                      Call
                    </Button>
                  )}
                  {listing.farmerId?.email && (
                    <Button 
                      variant="outline"
                      className="flex-1 border-blue-600 text-blue-600 hover:bg-blue-50"
                      onClick={() => window.location.href = `mailto:${listing.farmerId.email}?subject=Inquiry about ${listing.cropName}`}
                    >
                      <Mail className="w-4 h-4 mr-1" />
                      Email
                    </Button>
                  )}
                  {!listing.farmerId?.phone && !listing.farmerId?.email && (
                    <Button className="w-full bg-blue-600 hover:bg-blue-700">
                      Contact Farmer
                    </Button>
                  )}
                </CardFooter>
              </Card>
            ))}
          </div>
        )}
          </>
        )}
      </main>
    </div>
  );
}
