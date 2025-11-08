import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingUp, Menu, X } from "lucide-react";
import { PriceAPI } from "@/lib/api";

export default function Prices() {
  const navigate = useNavigate();
  const { user, logout } = useAuth();
  const [prices, setPrices] = useState([]);
  const [isScrolled, setIsScrolled] = useState(false);
  const [mobileOpen, setMobileOpen] = useState(false);

  useEffect(() => {
    const fetchPrices = async () => {
      try {
        const data = await PriceAPI.insights();
        setPrices(data);
      } catch (err) {
        console.error("Failed to fetch prices:", err);
      }
    };
    fetchPrices();

    const handleScroll = () => setIsScrolled(window.scrollY > 50);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-50 to-white">
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
            <Link to="/marketplace" className="hover:text-green-600 transition-colors">Marketplace</Link>
            <Link to="/prices" className="text-green-600 font-semibold">Price Insights</Link>
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
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Marketplace</Link>
            <Link to="/prices" onClick={() => setMobileOpen(false)} className="block py-2 text-green-600 font-semibold">Price Insights</Link>
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

      {/* Price Insights Content */}
      <section className="pt-32 pb-16 bg-gradient-to-br from-amber-50 to-green-50">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <div className="inline-flex items-center gap-2 bg-amber-100 text-amber-800 px-4 py-2 rounded-full text-sm font-semibold mb-4">
              <TrendingUp className="w-4 h-4" />
              Market Intelligence
            </div>
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Live Price Insights</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Stay informed with real-time market prices across Kenya. Make data-driven decisions.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {prices.length > 0 ? (
              prices.map((item, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow border-2 hover:border-green-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{item.crop}</h3>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Price</span>
                        <span className="font-bold text-green-700">
                          KES {item.averagePrice} / {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium text-gray-700">{item.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            ) : (
              // Placeholder data
              samplePrices.map((item, idx) => (
                <Card key={idx} className="hover:shadow-lg transition-shadow border-2 hover:border-green-300">
                  <CardContent className="pt-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-xl font-bold text-gray-800">{item.crop}</h3>
                      <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                        <Leaf className="w-6 h-6 text-green-600" />
                      </div>
                    </div>
                    <div className="space-y-2">
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Avg. Price</span>
                        <span className="font-bold text-green-700">
                          KES {item.averagePrice} / {item.unit}
                        </span>
                      </div>
                      <div className="flex justify-between text-sm">
                        <span className="text-gray-600">Location</span>
                        <span className="font-medium text-gray-700">{item.location}</span>
                      </div>
                    </div>
                  </CardContent>
                </Card>
              ))
            )}
          </div>
        </div>
      </section>
    </div>
  );
}

const samplePrices = [
  { crop: "Tomatoes", averagePrice: 80, unit: "kg", location: "Nairobi" },
  { crop: "Maize", averagePrice: 50, unit: "kg", location: "Nakuru" },
  { crop: "Avocados", averagePrice: 150, unit: "kg", location: "Eldoret" },
  { crop: "Potatoes", averagePrice: 55, unit: "kg", location: "Nyandarua" },
  { crop: "Carrots", averagePrice: 70, unit: "kg", location: "Meru" },
  { crop: "Cabbage", averagePrice: 40, unit: "kg", location: "Kiambu" },
];
