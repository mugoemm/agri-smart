import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { ListingsAPI } from "@/lib/api";
import NewListingDialog from "@/components/NewListingDialog";
import Analytics from "@/components/Analytics";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Home,
  LogOut,
  Plus,
  Edit,
  Trash2,
  Sprout,
  Apple,
  Coffee,
  PawPrint,
  BarChart3,
  Package,
} from "lucide-react";

export default function FarmerDashboard() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [listings, setListings] = useState([]);
  const [loading, setLoading] = useState(true);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [isNewListingOpen, setIsNewListingOpen] = useState(false);
  const [deleteLoading, setDeleteLoading] = useState(null);
  const [activeTab, setActiveTab] = useState("overview"); // "overview" or "analytics"

  useEffect(() => {
    fetchListings();
  }, []);

  const fetchListings = async () => {
    try {
      const data = await ListingsAPI.listAll();
      // Filter to show only current user's listings if user ID is available
      // For now, show all listings (in real app, filter by user._id)
      setListings(data);
    } catch (error) {
      console.error("Failed to fetch listings:", error);
      setListings([]);
    } finally {
      setLoading(false);
    }
  };

  const handleCreateListing = async (listingData) => {
    try {
      await ListingsAPI.create(listingData);
      await fetchListings(); // Refresh listings
    } catch (error) {
      console.error("Failed to create listing:", error);
      throw error;
    }
  };

  const handleDeleteListing = async (listingId) => {
    if (!confirm("Are you sure you want to delete this listing?")) return;

    setDeleteLoading(listingId);
    try {
      await ListingsAPI.delete(listingId);
      await fetchListings(); // Refresh listings
    } catch (error) {
      console.error("Failed to delete listing:", error);
      alert("Failed to delete listing. Please try again.");
    } finally {
      setDeleteLoading(null);
    }
  };

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  const categories = [
    {
      id: "horticulture",
      name: "Horticulture",
      icon: <Sprout className="w-12 h-12" />,
      color: "from-green-400 to-green-600",
      subcategories: [
        { id: "vegetables", name: "Vegetables", emoji: "🥕" },
        { id: "fruits", name: "Fruits", emoji: "🍎" },
      ],
    },
    {
      id: "animal-husbandry",
      name: "Animal Husbandry",
      icon: <PawPrint className="w-12 h-12" />,
      color: "from-amber-400 to-amber-600",
      subcategories: [
        { id: "poultry", name: "Poultry", emoji: "🐔" },
        { id: "cattle", name: "Cattle", emoji: "🐄" },
        { id: "goats", name: "Goats", emoji: "🐐" },
      ],
    },
    {
      id: "cash-crops",
      name: "Cash Crops",
      icon: <Coffee className="w-12 h-12" />,
      color: "from-purple-400 to-purple-600",
      subcategories: [
        { id: "coffee", name: "Coffee", emoji: "☕" },
        { id: "avocados", name: "Avocados", emoji: "🥑" },
        { id: "tea", name: "Tea", emoji: "🍵" },
      ],
    },
  ];

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-screen">
        <p className="text-lg text-gray-600">Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-green-700 font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>AgriSmart</span>
            <span className="text-sm font-normal text-gray-500 ml-2">| Farmer Dashboard</span>
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Farmer Dashboard</h1>
          <p className="text-gray-600">
            Manage your produce listings across all categories
          </p>
        </div>

        {/* Tab Navigation */}
        <div className="flex gap-4 mb-8 border-b border-gray-200">
          <button
            onClick={() => setActiveTab("overview")}
            className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-colors ${
              activeTab === "overview"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <Package className="w-5 h-5" />
            Listings Overview
          </button>
          <button
            onClick={() => setActiveTab("analytics")}
            className={`flex items-center gap-2 pb-4 px-4 font-semibold transition-colors ${
              activeTab === "analytics"
                ? "text-green-600 border-b-2 border-green-600"
                : "text-gray-500 hover:text-gray-700"
            }`}
          >
            <BarChart3 className="w-5 h-5" />
            Analytics
          </button>
        </div>

        {/* Content based on active tab */}
        {activeTab === "analytics" ? (
          /* Analytics View */
          <div>
            <div className="mb-6">
              <h2 className="text-2xl font-bold text-gray-800 mb-2">Your Performance Analytics</h2>
              <p className="text-gray-600">Track your sales, revenue, and product performance</p>
            </div>
            <Analytics userRole="farmer" />
          </div>
        ) : (
          /* Listings Overview */
          <>
            {!selectedCategory ? (
          /* Category Selection View */
          <div>
            <div className="flex justify-between items-center mb-6">
              <h2 className="text-2xl font-bold text-gray-800">Select a Category</h2>
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={() => setIsNewListingOpen(true)}
              >
                <Plus className="w-5 h-5" />
                New Listing
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
              {categories.map((category) => (
                <Card
                  key={category.id}
                  className="group hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer overflow-hidden border-2 hover:border-green-500"
                  onClick={() => setSelectedCategory(category)}
                >
                  <div
                    className={`relative h-40 bg-gradient-to-br ${category.color} overflow-hidden`}
                  >
                    <div className="absolute inset-0 flex items-center justify-center text-white">
                      {category.icon}
                    </div>
                  </div>
                  <CardHeader>
                    <CardTitle className="text-xl text-center">{category.name}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <div className="flex flex-wrap gap-2 justify-center">
                      {category.subcategories.map((sub) => (
                        <span
                          key={sub.id}
                          className="px-3 py-1 bg-gray-100 rounded-full text-sm text-gray-700"
                        >
                          {sub.emoji} {sub.name}
                        </span>
                      ))}
                    </div>
                  </CardContent>
                  <CardFooter>
                    <Button
                      className="w-full bg-green-600 hover:bg-green-700 group-hover:bg-green-700"
                      onClick={(e) => {
                        e.stopPropagation();
                        setSelectedCategory(category);
                      }}
                    >
                      Manage {category.name}
                    </Button>
                  </CardFooter>
                </Card>
              ))}
            </div>

            {/* Recent Listings */}
            <div className="mt-12">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">Your Recent Listings</h2>
              {listings.length === 0 ? (
                <Card className="p-8 text-center">
                  <p className="text-gray-500 mb-4">
                    You haven't created any listings yet.
                  </p>
                  <Button 
                    className="bg-green-600 hover:bg-green-700"
                    onClick={() => setIsNewListingOpen(true)}
                  >
                    <Plus className="w-5 h-5 mr-2" />
                    Create Your First Listing
                  </Button>
                </Card>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {listings.slice(0, 6).map((listing) => (
                    <Card key={listing._id} className="hover:shadow-lg transition-shadow">
                      <CardHeader>
                        <CardTitle>{listing.cropName || "N/A"}</CardTitle>
                        <p className="text-sm text-gray-500">{listing.category || "General"}</p>
                      </CardHeader>
                      <CardContent>
                        <div className="space-y-2 text-sm">
                          <div className="flex justify-between">
                            <span className="text-gray-600">Price:</span>
                            <span className="font-bold text-green-700">
                              KES {listing.pricePerUnit || "N/A"}/{listing.unit || "kg"}
                            </span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Quantity:</span>
                            <span className="font-medium">{listing.quantity || "N/A"} {listing.unit || "kg"}</span>
                          </div>
                          <div className="flex justify-between">
                            <span className="text-gray-600">Location:</span>
                            <span className="font-medium">{listing.location || "N/A"}</span>
                          </div>
                        </div>
                      </CardContent>
                      <CardFooter className="flex gap-2">
                        <Button
                          variant="outline"
                          size="sm"
                          className="flex-1"
                          onClick={() => {
                            // TODO: Implement edit listing
                            alert("Edit functionality coming soon!");
                          }}
                        >
                          <Edit className="w-4 h-4 mr-1" />
                          Edit
                        </Button>
                        <Button
                          variant="outline"
                          size="sm"
                          className="border-red-600 text-red-600 hover:bg-red-50"
                          onClick={() => handleDeleteListing(listing._id)}
                          disabled={deleteLoading === listing._id}
                        >
                          <Trash2 className="w-4 h-4" />
                        </Button>
                      </CardFooter>
                    </Card>
                  ))}
                </div>
              )}
            </div>
          </div>
        ) : (
          /* Category Detail View */
          <div>
            <div className="mb-6">
              <Button
                variant="outline"
                onClick={() => setSelectedCategory(null)}
                className="mb-4"
              >
                ← Back to Categories
              </Button>
              <h2 className="text-3xl font-bold text-gray-800 mb-2">
                {selectedCategory.name}
              </h2>
              <p className="text-gray-600">
                Manage your {selectedCategory.name.toLowerCase()} listings
              </p>
            </div>

            {/* Subcategories */}
            <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-8">
              {selectedCategory.subcategories.map((sub) => (
                <Card
                  key={sub.id}
                  className="hover:shadow-md transition-shadow cursor-pointer text-center p-4"
                >
                  <div className="text-4xl mb-2">{sub.emoji}</div>
                  <p className="text-sm font-medium">{sub.name}</p>
                </Card>
              ))}
            </div>

            {/* Category Listings */}
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-bold text-gray-800">
                Your {selectedCategory.name} Listings
              </h3>
              <Button 
                className="bg-green-600 hover:bg-green-700 flex items-center gap-2"
                onClick={() => setIsNewListingOpen(true)}
              >
                <Plus className="w-5 h-5" />
                Add New
              </Button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {listings
                .filter((l) => l.category?.toLowerCase() === selectedCategory.id.toLowerCase())
                .map((listing) => (
                  <Card key={listing._id} className="hover:shadow-lg transition-shadow">
                    <CardHeader>
                      <CardTitle>{listing.cropName || "N/A"}</CardTitle>
                      <p className="text-sm text-gray-500">{listing.subcategory || "General"}</p>
                    </CardHeader>
                    <CardContent>
                      <div className="space-y-2 text-sm">
                        <div className="flex justify-between">
                          <span className="text-gray-600">Price:</span>
                          <span className="font-bold text-green-700">
                            KES {listing.pricePerUnit || "N/A"}/{listing.unit || "kg"}
                          </span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Quantity:</span>
                          <span className="font-medium">{listing.quantity || "N/A"} {listing.unit || "kg"}</span>
                        </div>
                        <div className="flex justify-between">
                          <span className="text-gray-600">Location:</span>
                          <span className="font-medium">{listing.location || "N/A"}</span>
                        </div>
                      </div>
                    </CardContent>
                    <CardFooter className="flex gap-2">
                      <Button 
                        variant="outline" 
                        size="sm" 
                        className="flex-1"
                        onClick={() => alert("Edit functionality coming soon!")}
                      >
                        <Edit className="w-4 h-4 mr-1" />
                        Edit
                      </Button>
                      <Button
                        variant="outline"
                        size="sm"
                        className="border-red-600 text-red-600 hover:bg-red-50"
                        onClick={() => handleDeleteListing(listing._id)}
                        disabled={deleteLoading === listing._id}
                      >
                        <Trash2 className="w-4 h-4" />
                      </Button>
                    </CardFooter>
                  </Card>
                ))}
            </div>

            {listings.filter(
              (l) => l.category?.toLowerCase() === selectedCategory.id.toLowerCase()
            ).length === 0 && (
              <Card className="p-8 text-center">
                <p className="text-gray-500 mb-4">
                  No listings in this category yet.
                </p>
                <Button 
                  className="bg-green-600 hover:bg-green-700"
                  onClick={() => setIsNewListingOpen(true)}
                >
                  <Plus className="w-5 h-5 mr-2" />
                  Create Listing
                </Button>
              </Card>
            )}
          </div>
        )}
        </>
        )}
      </main>

      {/* New Listing Dialog */}
      <NewListingDialog
        isOpen={isNewListingOpen}
        onClose={() => setIsNewListingOpen(false)}
        onCreate={handleCreateListing}
      />
    </div>
  );
}
