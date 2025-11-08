import { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "@/context/AuthContext";
import { Button } from "@/components/ui/button";
import { Leaf, TrendingUp, Users, ShieldCheck, Menu, X } from "lucide-react";

export default function About() {
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
            <Link to="/about" className="text-green-600 font-semibold">About</Link>
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
            <Link to="/prices" onClick={() => setMobileOpen(false)} className="block py-2 hover:text-green-600">Price Insights</Link>
            <Link to="/about" onClick={() => setMobileOpen(false)} className="block py-2 text-green-600 font-semibold">About</Link>
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

      {/* About Content */}
      <section className="pt-32 pb-16 bg-white">
        <div className="container mx-auto px-4">
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">Why Choose AgriSmart?</h1>
            <p className="text-gray-600 max-w-2xl mx-auto text-lg">
              Empowering farmers with technology and connecting them directly to buyers.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto mb-16">
            {benefits.map((benefit, idx) => (
              <div
                key={idx}
                className="text-center p-6 rounded-2xl bg-gradient-to-br from-green-50 to-white hover:shadow-lg transition-all group"
              >
                <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 group-hover:scale-110 transition-transform">
                  {benefit.icon}
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3">{benefit.title}</h3>
                <p className="text-gray-600">{benefit.description}</p>
              </div>
            ))}
          </div>

          {/* Mission Section */}
          <div className="max-w-4xl mx-auto bg-gradient-to-br from-green-100 to-green-50 rounded-2xl p-8 md:p-12 mb-16">
            <h2 className="text-3xl font-bold text-gray-800 mb-6">Our Mission</h2>
            <p className="text-gray-700 text-lg leading-relaxed mb-4">
              AgriSmart is dedicated to transforming Kenya's agricultural sector by creating a transparent, 
              efficient marketplace that connects farmers directly with buyers. We believe in fair prices, 
              sustainable farming practices, and leveraging technology to empower rural communities.
            </p>
            <p className="text-gray-700 text-lg leading-relaxed">
              Our platform eliminates middlemen, provides real-time market insights, and ensures that farmers 
              receive fair compensation for their hard work while buyers get access to fresh, quality produce 
              at competitive prices.
            </p>
          </div>

          {/* Vision & Values */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-12">Our Vision & Core Values</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-green-600">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Vision</h3>
                <p className="text-gray-600 leading-relaxed">
                  To become Africa's leading agricultural marketplace platform, revolutionizing food systems 
                  and creating prosperity for millions of smallholder farmers across the continent.
                </p>
              </div>
              <div className="bg-white rounded-xl p-8 shadow-lg border-l-4 border-blue-600">
                <h3 className="text-2xl font-bold text-gray-800 mb-4">Core Values</h3>
                <ul className="space-y-3 text-gray-600">
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Transparency:</strong> Open, honest dealings in all transactions</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Innovation:</strong> Leveraging technology for positive change</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Sustainability:</strong> Promoting eco-friendly farming practices</span>
                  </li>
                  <li className="flex items-start gap-2">
                    <span className="text-green-600 font-bold">•</span>
                    <span><strong>Empowerment:</strong> Uplifting farming communities</span>
                  </li>
                </ul>
              </div>
            </div>
          </div>

          {/* Impact Stories */}
          <div className="max-w-6xl mx-auto mb-16">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Real Impact, Real Stories</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              See how AgriSmart is transforming lives and livelihoods across Kenya
            </p>
            
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
              {/* Story 1 */}
              <div className="bg-gradient-to-br from-green-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-green-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  👨‍🌾
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">John Mwangi</h3>
                <p className="text-sm text-gray-500 mb-3 text-center">Tomato Farmer, Kiambu</p>
                <p className="text-gray-600 italic text-sm leading-relaxed">
                  "AgriSmart helped me increase my income by 45% in just 6 months. I now sell directly 
                  to hotels and supermarkets without middlemen taking huge cuts."
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Income increase:</span>
                    <span className="font-bold text-green-600">+45%</span>
                  </div>
                </div>
              </div>

              {/* Story 2 */}
              <div className="bg-gradient-to-br from-blue-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-blue-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  👩‍🌾
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Grace Wanjiku</h3>
                <p className="text-sm text-gray-500 mb-3 text-center">Dairy Farmer, Nakuru</p>
                <p className="text-gray-600 italic text-sm leading-relaxed">
                  "The platform's price insights helped me know when to sell. I'm now making informed 
                  decisions and my farm's profitability has doubled."
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Profit increase:</span>
                    <span className="font-bold text-blue-600">+100%</span>
                  </div>
                </div>
              </div>

              {/* Story 3 */}
              <div className="bg-gradient-to-br from-purple-50 to-white rounded-2xl p-6 shadow-lg hover:shadow-xl transition-shadow">
                <div className="w-20 h-20 bg-purple-600 rounded-full flex items-center justify-center mx-auto mb-4 text-3xl">
                  🏪
                </div>
                <h3 className="text-xl font-bold text-gray-800 mb-3 text-center">Fresh Mart Ltd</h3>
                <p className="text-sm text-gray-500 mb-3 text-center">Supermarket Chain, Nairobi</p>
                <p className="text-gray-600 italic text-sm leading-relaxed">
                  "We source 70% of our produce through AgriSmart. The quality is excellent, prices are 
                  competitive, and we support local farmers directly."
                </p>
                <div className="mt-4 pt-4 border-t border-gray-200">
                  <div className="flex justify-between text-sm">
                    <span className="text-gray-600">Cost savings:</span>
                    <span className="font-bold text-purple-600">-30%</span>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Team Section */}
          <div className="max-w-6xl mx-auto">
            <h2 className="text-3xl font-bold text-center text-gray-800 mb-4">Meet Our Team</h2>
            <p className="text-center text-gray-600 mb-12 max-w-2xl mx-auto">
              Passionate innovators dedicated to transforming agriculture in Africa
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-12">
              {/* Team Member 1 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-green-400 to-green-600 flex items-center justify-center text-6xl">
                  👨‍💼
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Bernard Kamoche</h3>
                  <p className="text-green-600 font-semibold mb-3">CEO & Co-Founder</p>
                  <p className="text-gray-600 text-sm">
                    Agricultural economist with 10+ years experience in agri-tech and rural development.
                  </p>
                </div>
              </div>

              {/* Team Member 2 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-blue-400 to-blue-600 flex items-center justify-center text-6xl">
                  👩‍💻
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Sarah Njeri</h3>
                  <p className="text-blue-600 font-semibold mb-3">CTO & Co-Founder</p>
                  <p className="text-gray-600 text-sm">
                    Software engineer passionate about building scalable solutions for emerging markets.
                  </p>
                </div>
              </div>

              {/* Team Member 3 */}
              <div className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
                <div className="h-48 bg-gradient-to-br from-purple-400 to-purple-600 flex items-center justify-center text-6xl">
                  👨‍🔬
                </div>
                <div className="p-6 text-center">
                  <h3 className="text-xl font-bold text-gray-800 mb-1">Dr. James Ochieng</h3>
                  <p className="text-purple-600 font-semibold mb-3">Head of Operations</p>
                  <p className="text-gray-600 text-sm">
                    Agricultural scientist focused on sustainable farming and supply chain optimization.
                  </p>
                </div>
              </div>
            </div>

            {/* Advisory Board */}
            <div className="bg-gradient-to-r from-gray-50 to-gray-100 rounded-2xl p-8">
              <h3 className="text-2xl font-bold text-center text-gray-800 mb-6">Advisory Board</h3>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-green-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    👔
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">Prof. Mary Wangari</h4>
                    <p className="text-sm text-gray-600">Agricultural Policy Expert, University of Nairobi</p>
                  </div>
                </div>
                <div className="flex items-start gap-4">
                  <div className="w-16 h-16 bg-blue-600 rounded-full flex items-center justify-center text-2xl flex-shrink-0">
                    👔
                  </div>
                  <div>
                    <h4 className="font-bold text-gray-800">David Kiprono</h4>
                    <p className="text-sm text-gray-600">Former CEO, Kenya Agricultural Board</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 bg-gradient-to-r from-green-600 to-green-800 text-white">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Join the AgriSmart Revolution</h2>
          <p className="text-xl text-green-100 mb-8 max-w-2xl mx-auto">
            Be part of the change. Empower farmers, support local agriculture, and build a sustainable future.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button
              size="lg"
              className="bg-white text-green-700 hover:bg-green-50 font-semibold text-lg px-8"
              onClick={() => navigate("/login")}
            >
              Get Started Today
            </Button>
            <Button
              size="lg"
              variant="outline"
              className="border-2 border-white text-white hover:bg-white/10 font-semibold text-lg px-8"
              onClick={() => navigate("/contact")}
            >
              Contact Us
            </Button>
          </div>
        </div>
      </section>
    </div>
  );
}

const benefits = [
  {
    icon: <TrendingUp className="w-8 h-8 text-white" />,
    title: "Fair Prices",
    description: "Get the best market rates with transparent pricing based on real-time data.",
  },
  {
    icon: <Users className="w-8 h-8 text-white" />,
    title: "Direct Market Access",
    description: "Connect directly with buyers and eliminate middlemen for better margins.",
  },
  {
    icon: <ShieldCheck className="w-8 h-8 text-white" />,
    title: "Secure Payments",
    description: "Fast, reliable payment systems ensure you get paid on time, every time.",
  },
];
