import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  Home,
  LogOut,
  Users,
  ShoppingBag,
  TrendingUp,
  Shield,
} from "lucide-react";

export default function Admin() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [stats, setStats] = useState({
    totalUsers: 0,
    totalListings: 0,
    totalFarmers: 0,
    totalBuyers: 0,
  });

  useEffect(() => {
    // Fetch admin stats here (would call an API)
    // For now using placeholder values
  }, []);

  const handleLogout = () => {
    logout();
    navigate("/");
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-white">
      {/* Navigation Bar */}
      <nav className="bg-white shadow-md sticky top-0 z-50">
        <div className="container mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 text-purple-700 font-bold text-2xl">
            <Shield className="w-7 h-7" />
            <span>AgriSmart</span>
            <span className="text-sm font-normal text-gray-500 ml-2">| Admin Panel</span>
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
              Admin: {user?.name || user?.email}
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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Admin Dashboard</h1>
          <p className="text-gray-600">
            Manage users, listings, and platform statistics
          </p>
        </div>

        {/* Stats Cards */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center">
                  <Users className="w-6 h-6 text-blue-600" />
                </div>
                <span className="text-3xl font-bold text-blue-600">
                  {stats.totalUsers}
                </span>
              </div>
              <h3 className="font-semibold text-gray-700">Total Users</h3>
              <p className="text-sm text-gray-500">All registered accounts</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <Leaf className="w-6 h-6 text-green-600" />
                </div>
                <span className="text-3xl font-bold text-green-600">
                  {stats.totalFarmers}
                </span>
              </div>
              <h3 className="font-semibold text-gray-700">Total Farmers</h3>
              <p className="text-sm text-gray-500">Active farmer accounts</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center">
                  <ShoppingBag className="w-6 h-6 text-purple-600" />
                </div>
                <span className="text-3xl font-bold text-purple-600">
                  {stats.totalBuyers}
                </span>
              </div>
              <h3 className="font-semibold text-gray-700">Total Buyers</h3>
              <p className="text-sm text-gray-500">Active buyer accounts</p>
            </CardContent>
          </Card>

          <Card className="hover:shadow-lg transition-shadow">
            <CardContent className="pt-6">
              <div className="flex items-center justify-between mb-4">
                <div className="w-12 h-12 bg-amber-100 rounded-full flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-amber-600" />
                </div>
                <span className="text-3xl font-bold text-amber-600">
                  {stats.totalListings}
                </span>
              </div>
              <h3 className="font-semibold text-gray-700">Total Listings</h3>
              <p className="text-sm text-gray-500">Active marketplace items</p>
            </CardContent>
          </Card>
        </div>

        {/* Admin Actions */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Users className="w-5 h-5" />
                User Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View, edit, and manage all user accounts on the platform
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Manage Users
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <ShoppingBag className="w-5 h-5" />
                Listing Management
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Monitor and moderate marketplace listings for quality control
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Manage Listings
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <TrendingUp className="w-5 h-5" />
                Analytics & Reports
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                View detailed analytics and generate platform reports
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                View Analytics
              </Button>
            </CardContent>
          </Card>

          <Card>
            <CardHeader>
              <CardTitle className="flex items-center gap-2">
                <Shield className="w-5 h-5" />
                Security Settings
              </CardTitle>
            </CardHeader>
            <CardContent>
              <p className="text-gray-600 mb-4">
                Configure platform security and access controls
              </p>
              <Button className="w-full bg-purple-600 hover:bg-purple-700">
                Security Settings
              </Button>
            </CardContent>
          </Card>
        </div>
      </main>
    </div>
  );
}
