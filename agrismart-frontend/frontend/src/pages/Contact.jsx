import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent } from "@/components/ui/card";
import { Leaf, Mail, Phone, MapPin, Facebook, Twitter, Instagram, Menu, X, Star } from "lucide-react";

export default function Contact() {
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
            <Link to="/marketplace" className="hover:text-green-600 transition-colors">Marketplace</Link>
            <Link to="/prices" className="hover:text-green-600 transition-colors">Price Insights</Link>
            <Link to="/about" className="hover:text-green-600 transition-colors">About</Link>
            <Link to="/contact" className="text-green-600 font-semibold">Contact</Link>
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
            <Link to="/prices" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Price Insights</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">About</Link>
            <Link to="/contact" onClick={() => setMobileOpen(false)} className="block py-2 text-green-600 font-semibold">Contact</Link>
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

      {/* Contact Content */}
      <section className="pt-32 pb-16">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Get In Touch</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Have questions? We'd love to hear from you. Send us a message and we'll respond as soon as possible.
            </p>
          </div>

          <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-12">
            {/* Contact Information */}
            <div className="bg-gradient-to-br from-green-600 to-green-700 text-white rounded-2xl p-8">
              <div className="flex items-center gap-2 mb-6">
                <Leaf className="w-8 h-8" />
                <span className="text-2xl font-bold">AgriSmart</span>
              </div>
              
              <p className="text-green-100 mb-8">
                Empowering farmers and buyers across Kenya with transparent marketplace solutions.
              </p>

              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Phone className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Phone</h3>
                    <p className="text-green-100">+254 700 123 456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <Mail className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <p className="text-green-100">info@agrismart.co.ke</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-10 h-10 bg-white/10 rounded-full flex items-center justify-center shrink-0">
                    <MapPin className="w-5 h-5" />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Location</h3>
                    <p className="text-green-100">Nairobi, Kenya</p>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-8 border-t border-white/20">
                <h3 className="font-semibold mb-4">Follow Us</h3>
                <div className="flex gap-4">
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                    <Facebook className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                    <Twitter className="w-5 h-5" />
                  </a>
                  <a href="#" className="w-10 h-10 bg-white/10 hover:bg-white/20 rounded-full flex items-center justify-center transition-colors">
                    <Instagram className="w-5 h-5" />
                  </a>
                </div>
              </div>
            </div>

            {/* Newsletter Subscription */}
            <div className="bg-white rounded-2xl p-8 shadow-lg">
              <h2 className="text-2xl font-bold text-gray-800 mb-4">Stay Updated</h2>
              <p className="text-gray-600 mb-6">
                Get market insights, price updates, and agricultural tips delivered to your inbox.
              </p>

              <div className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Full Name</label>
                  <Input placeholder="John Doe" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Email Address</label>
                  <Input type="email" placeholder="john@example.com" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Phone Number (Optional)</label>
                  <Input placeholder="+254 700 000 000" />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">Message</label>
                  <textarea 
                    className="w-full min-h-[120px] rounded-md border border-gray-300 bg-white px-3 py-2 text-sm placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500"
                    placeholder="Tell us how we can help you..."
                  ></textarea>
                </div>

                <Button className="w-full bg-green-600 hover:bg-green-700 text-base py-6">
                  Send Message
                </Button>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="pb-16 bg-gradient-to-br from-green-50 to-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h2 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4">What Our Community Says</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              Real stories from farmers and buyers who've grown their business with AgriSmart.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl mx-auto">
            {testimonials.map((testimonial, idx) => (
              <Card key={idx} className="hover:shadow-xl transition-shadow">
                <CardContent className="pt-6">
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} className="w-5 h-5 fill-yellow-400 text-yellow-400" />
                    ))}
                  </div>
                  <p className="text-gray-700 italic mb-6">"{testimonial.quote}"</p>
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-gradient-to-br from-green-400 to-green-600 rounded-full flex items-center justify-center text-white font-bold text-lg">
                      {testimonial.name.charAt(0)}
                    </div>
                    <div>
                      <p className="font-semibold text-gray-800">{testimonial.name}</p>
                      <p className="text-sm text-gray-600">{testimonial.role}</p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}

const testimonials = [
  {
    name: "John Kamau",
    role: "Maize Farmer, Nakuru",
    quote:
      "AgriSmart helped me reach buyers I never knew existed. My income has increased by 40% in just 3 months!",
  },
  {
    name: "Grace Wanjiku",
    role: "Produce Buyer, Nairobi",
    quote:
      "The quality and freshness of produce I get through AgriSmart is unmatched. Highly recommended!",
  },
  {
    name: "Peter Omondi",
    role: "Coffee Farmer, Eldoret",
    quote:
      "Finally, a platform that understands farmers. Fair prices and transparent dealings all the way.",
  },
];
