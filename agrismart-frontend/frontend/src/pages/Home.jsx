import { useState, useEffect } from "react";
import { useNavigate, Link } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import {
  Leaf,
  TrendingUp,
  Users,
  ShieldCheck,
  Mail,
  Phone,
  MapPin,
  Facebook,
  Twitter,
  Instagram,
  ChevronRight,
  Star,
  Menu,
  X,
  UserCircle,
  ShoppingCart,
} from "lucide-react";

export default function Home() {
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
            <Link to="/" className="text-green-600 font-semibold">Home</Link>
            <Link to="/marketplace" className="hover:text-green-600 transition-colors">Marketplace</Link>
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
            <Link to="/" onClick={() => setMobileOpen(false)} className="block py-2 text-green-600 font-semibold">Home</Link>
            <Link to="/marketplace" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Marketplace</Link>
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

      {/* Hero Section */}
      <section
        className="relative pt-24 pb-20 md:pt-32 md:pb-28 bg-gradient-to-br from-green-600 via-green-700 to-green-800 text-white overflow-hidden"
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-96 h-96 bg-yellow-300 rounded-full blur-3xl"></div>
          <div className="absolute bottom-0 right-0 w-96 h-96 bg-green-300 rounded-full blur-3xl"></div>
        </div>

        <div className="container mx-auto px-4 relative z-10">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
              Connecting Farmers and Buyers for a Smarter Future
            </h1>
            <p className="text-lg md:text-xl mb-8 text-green-100">
              Discover fresh produce directly from local farms. Fair prices, transparent marketplace, sustainable agriculture.
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center">
              <Button
                size="lg"
                className="bg-white text-green-700 hover:bg-green-50 font-semibold text-base group"
                onClick={() => navigate("/marketplace")}
              >
                Browse Produce
                <ChevronRight className="ml-1 group-hover:translate-x-1 transition-transform" />
              </Button>
              <Button asChild size="lg" className="bg-green-600 hover:bg-green-700 font-semibold text-base">
                <Link to={user ? "/farmer/dashboard" : "/login"}>Join as Farmer</Link>
              </Button>
              <Button asChild size="lg" className="bg-blue-600 hover:bg-blue-700 font-semibold text-base">
                <Link to={user ? "/buyer/dashboard" : "/login"}>Join as Buyer</Link>
              </Button>
            </div>
          </div>
        </div>

        {/* Decorative wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-auto">
            <path
              fill="#fefefe"
              d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,64C960,75,1056,85,1152,80C1248,75,1344,53,1392,42.7L1440,32L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
            ></path>
          </svg>
        </div>
      </section>

      {/* Impact Metrics Section */}
      <section className="py-20 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Our Impact in Numbers
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Transforming agriculture through technology and empowering communities across Kenya
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {/* Farmers Empowered */}
            <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-green-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Users className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-green-700 mb-2">1,250+</div>
              <div className="text-gray-700 font-semibold mb-1">Farmers Empowered</div>
              <div className="text-sm text-gray-600">Across 15+ counties</div>
            </div>

            {/* Food Traded */}
            <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-blue-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <TrendingUp className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-blue-700 mb-2">2,500+</div>
              <div className="text-gray-700 font-semibold mb-1">Tons of Produce</div>
              <div className="text-sm text-gray-600">Traded successfully</div>
            </div>

            {/* Income Increase */}
            <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-purple-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <Star className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-purple-700 mb-2">35%</div>
              <div className="text-gray-700 font-semibold mb-1">Income Increase</div>
              <div className="text-sm text-gray-600">Average for farmers</div>
            </div>

            {/* Waste Reduced */}
            <div className="bg-gradient-to-br from-amber-50 to-amber-100 rounded-2xl p-8 text-center transform hover:scale-105 transition-transform duration-300 shadow-lg">
              <div className="bg-amber-600 w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-4">
                <ShieldCheck className="w-8 h-8 text-white" />
              </div>
              <div className="text-4xl font-bold text-amber-700 mb-2">40%</div>
              <div className="text-gray-700 font-semibold mb-1">Waste Reduced</div>
              <div className="text-sm text-gray-600">Through direct sales</div>
            </div>
          </div>

          {/* Additional Impact Stats */}
          <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6 max-w-4xl mx-auto">
            <div className="bg-gradient-to-r from-green-600 to-green-700 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">98%</div>
              <div className="text-green-100">Satisfaction Rate</div>
            </div>
            <div className="bg-gradient-to-r from-blue-600 to-blue-700 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">15,000+</div>
              <div className="text-blue-100">Transactions Completed</div>
            </div>
            <div className="bg-gradient-to-r from-purple-600 to-purple-700 rounded-xl p-6 text-white text-center">
              <div className="text-3xl font-bold mb-2">24/7</div>
              <div className="text-purple-100">Platform Availability</div>
            </div>
          </div>
        </div>
      </section>

      {/* Why Choose AgriSmart Section */}
      <section className="py-20 bg-gradient-to-b from-gray-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Why Choose AgriSmart?
            </h2>
            <p className="text-lg text-gray-600 max-w-2xl mx-auto">
              Built for farmers, trusted by buyers, designed for impact
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-6xl mx-auto">
            {/* Feature 1 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-green-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <TrendingUp className="w-7 h-7 text-green-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Fair Pricing</h3>
              <p className="text-gray-600">
                Real-time market insights and transparent pricing ensure farmers get fair value for their produce.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-blue-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <Users className="w-7 h-7 text-blue-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Direct Connection</h3>
              <p className="text-gray-600">
                Cut out middlemen and connect directly with buyers, maximizing profits for farmers.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-shadow">
              <div className="bg-purple-100 w-14 h-14 rounded-lg flex items-center justify-center mb-6">
                <ShieldCheck className="w-7 h-7 text-purple-600" />
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-3">Secure & Reliable</h3>
              <p className="text-gray-600">
                Verified users, secure transactions, and reliable delivery tracking for peace of mind.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl md:text-4xl font-bold mb-6">
            Ready to Transform Your Agricultural Business?
          </h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Join thousands of farmers and buyers already benefiting from AgriSmart
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 font-semibold text-lg px-8"
              onClick={() => navigate("/login")}
            >
              Get Started Free
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8"
              onClick={() => navigate("/about")}
            >
              Learn More
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}
 