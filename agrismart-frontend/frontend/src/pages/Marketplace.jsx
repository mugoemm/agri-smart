import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, Home, LogOut, Menu, X } from "lucide-react";

export default function Marketplace() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-white">
      {/* Navigation Bar */}
      <nav
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
          isScrolled ? "bg-white shadow-md py-3" : "bg-white/90 backdrop-blur-sm py-4"
        }`}
      >
        <div className="container mx-auto px-4 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 text-green-700 font-bold text-2xl">
            <Leaf className="w-7 h-7" />
            <span>AgriSmart</span>
          </Link>

          {/* Desktop links */}
          <div className="hidden md:flex items-center gap-6 text-sm font-medium text-gray-700">
            <Link to="/" className="hover:text-green-600 transition-colors">Home</Link>
            <Link to="/marketplace" className="text-green-600 font-semibold">Marketplace</Link>
            <Link to="/prices" className="hover:text-green-600 transition-colors">Price Insights</Link>
            <Link to="/about" className="hover:text-green-600 transition-colors">About</Link>
            <Link to="/contact" className="hover:text-green-600 transition-colors">Contact</Link>
          </div>

          <div className="hidden md:block">
            {user ? (
              <div className="flex items-center gap-3">
                <span className="text-sm text-gray-600">Welcome, {user.name || user.email}</span>
                <Button variant="outline" onClick={logout} className="border-red-600 text-red-600 hover:bg-red-50">
                  Logout
                </Button>
              </div>
            ) : (
              <Button 
                variant="default" 
                className="bg-green-600 hover:bg-green-700"
                onClick={() => navigate("/login")}
              >
                Login
              </Button>
            )}
          </div>

          {/* Mobile hamburger */}
          <button
            className="md:hidden inline-flex items-center justify-center rounded-md p-2 text-gray-700 hover:bg-green-50"
            aria-label="Toggle menu"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
          </button>
        </div>

        {/* Mobile menu */}
        <div
          className={`md:hidden overflow-hidden transition-all duration-300 ease-out ${
            mobileOpen ? "max-h-64 opacity-100" : "max-h-0 opacity-0"
          }`}
        >
          <div className="px-4 pt-2 pb-4 space-y-2 text-gray-700 bg-white border-t">
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Home</Link>
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block py-2 text-green-600 font-semibold">Marketplace</Link>
            <Link to="/prices" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Price Insights</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Contact</Link>
            {user ? (
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  logout();
                }}
                className="w-full bg-red-600 hover:bg-red-700"
              >
                Logout
              </Button>
            ) : (
              <Button
                onClick={() => {
                  setMobileOpen(false);
                  navigate("/login");
                }}
                className="w-full bg-green-600 hover:bg-green-700"
              >
                Login
              </Button>
            )}
          </div>
        </div>
      </nav>

      {/* Marketplace Content */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Fresh Produce Marketplace</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Browse quality crops from verified local farmers. Find the best deals on fresh produce.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {featuredProduce.map((item, idx) => (
              <Card
                key={idx}
                className="group hover:shadow-xl transition-all duration-300 hover:-translate-y-1 overflow-hidden"
              >
                <div className="relative h-48 bg-gradient-to-br from-green-100 to-green-200 overflow-hidden">
                  <div className="absolute inset-0 flex items-center justify-center text-6xl">{item.icon}</div>
                  <div className="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded-full font-semibold">
                    Fresh
                  </div>
                </div>
                <CardHeader>
                  <CardTitle className="text-lg">{item.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">{item.location}</p>
                </CardHeader>
                <CardContent>
                  <div className="flex items-baseline gap-2">
                    <span className="text-2xl font-bold text-green-700">KES {item.price}</span>
                    <span className="text-sm text-gray-500">/ {item.unit}</span>
                  </div>
                  <p className="text-sm text-gray-600 mt-2">
                    Qty: {item.quantity} {item.unit}
                  </p>
                </CardContent>
                <CardFooter>
                  <Button className="w-full bg-green-600 hover:bg-green-700 group-hover:bg-green-700">View Details</Button>
                </CardFooter>
              </Card>
            ))}
          </div>

          <div className="text-center mt-10">
            <Button 
              variant="outline" 
              size="lg" 
              className="border-green-600 text-green-700 hover:bg-green-50"
              onClick={() => navigate("/buyer/dashboard")}
            >
              View All Listings
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const featuredProduce = [
  { name: "Fresh Tomatoes", price: 80, unit: "kg", quantity: 500, location: "Nairobi", icon: "🍅" },
  { name: "Organic Maize", price: 50, unit: "kg", quantity: 1000, location: "Nakuru", icon: "🌽" },
  { name: "Premium Avocados", price: 150, unit: "kg", quantity: 300, location: "Eldoret", icon: "🥑" },
  { name: "Sweet Potatoes", price: 60, unit: "kg", quantity: 750, location: "Kisumu", icon: "🍠" },
  { name: "Fresh Carrots", price: 70, unit: "kg", quantity: 400, location: "Meru", icon: "🥕" },
  { name: "Cabbage", price: 40, unit: "kg", quantity: 600, location: "Kiambu", icon: "🥬" },
  { name: "Green Beans", price: 120, unit: "kg", quantity: 200, location: "Thika", icon: "🫘" },
  { name: "Potatoes", price: 55, unit: "kg", quantity: 900, location: "Nyandarua", icon: "🥔" },
];
