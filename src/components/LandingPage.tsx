import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Heart, Upload, Bell, Search, Menu } from "lucide-react";
import { Input } from "@/components/ui/input";
import { MobileMenu } from "./MobileMenu";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/auth-context";

export function LandingPage() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const { user } = useAuth();

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Header */}
      <header className="sticky top-0 border-b bg-white/50 backdrop-blur-sm z-30">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                ValCard
              </span>
            </Link>
            <nav className="hidden md:flex items-center space-x-8">
              <Link
                to="/"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Home
              </Link>
              <Link
                to="/templates"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Templates
              </Link>
              <Link
                to="/create"
                className="text-gray-600 hover:text-red-500 transition"
              >
                Create Card
              </Link>
            </nav>
            <div className="hidden md:flex items-center space-x-4">
              {user ? (
                <UserMenu />
              ) : (
                <>
                  <Link to="/auth/login">
                    <Button variant="outline">Log in</Button>
                  </Link>
                  <Link to="/auth/signup">
                    <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
            <button
              className="md:hidden p-2 hover:bg-gray-100 rounded-lg transition"
              onClick={() => setIsMobileMenuOpen(true)}
            >
              <Menu className="w-6 h-6 text-gray-600" />
            </button>
          </div>
        </div>
      </header>

      <MobileMenu
        isOpen={isMobileMenuOpen}
        onClose={() => setIsMobileMenuOpen(false)}
      />

      {/* Hero Section */}
      <section className="pt-12 sm:pt-20 pb-16 sm:pb-32">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="text-center lg:text-left"
            >
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold mb-6">
                Create Your{" "}
                <span className="bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                  Perfect
                </span>{" "}
                Valentine's Card
              </h1>
              <p className="text-lg sm:text-xl text-gray-600 mb-8">
                Express your love with our beautiful, personalized Valentine's
                cards. Create and share heartfelt messages that will make your
                special someone smile.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center lg:justify-start">
                <Link to="/create">
                  <Button
                    size="lg"
                    className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
                  >
                    Get Started
                  </Button>
                </Link>
                <Link to="/templates">
                  <Button size="lg" variant="outline">
                    View Templates
                  </Button>
                </Link>
              </div>
            </motion.div>

            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.5, delay: 0.2 }}
              className="relative mx-auto lg:mx-0 max-w-[500px] w-full"
            >
              <div className="relative w-full h-[400px] sm:h-[500px] bg-gradient-to-br from-red-100 to-pink-100 rounded-3xl overflow-hidden shadow-xl">
                <div className="absolute top-8 left-8 right-8">
                  <div className="flex items-center space-x-3 mb-6">
                    {[
                      "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=100&h=100&fit=crop",
                      "https://images.unsplash.com/photo-1517841905240-472988babdf9?w=100&h=100&fit=crop",
                      "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?w=100&h=100&fit=crop",
                    ].map((avatar, i) => (
                      <motion.div
                        key={i}
                        className="w-8 sm:w-10 h-8 sm:h-10 rounded-full bg-white shadow-md overflow-hidden"
                        initial={{ scale: 0 }}
                        animate={{ scale: 1 }}
                        transition={{ delay: 0.4 + i * 0.1 }}
                      >
                        <img
                          src={avatar}
                          alt={`User avatar ${i + 1}`}
                          className="w-full h-full object-cover"
                        />
                      </motion.div>
                    ))}
                    <motion.div
                      className="w-6 sm:w-8 h-6 sm:h-8 rounded-full bg-gray-200 flex items-center justify-center text-xs sm:text-sm font-medium text-gray-600"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: 0.7 }}
                    >
                      87+
                    </motion.div>
                  </div>

                  <div className="bg-white rounded-xl p-4 sm:p-6 shadow-lg mb-6">
                    <div className="flex items-center justify-between mb-4">
                      <h3 className="text-base sm:text-lg font-semibold">
                        Create Your Card
                      </h3>
                      <Upload className="w-4 sm:w-5 h-4 sm:h-5 text-red-500" />
                    </div>
                    <div className="space-y-4">
                      <Input placeholder="Enter recipient's name" />
                      <Input placeholder="Write your message" />
                      <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white">
                        Generate Card
                      </Button>
                    </div>
                  </div>

                  <div className="absolute bottom-8 right-0">
                    <motion.div
                      className="bg-[#4ade80] text-white px-3 sm:px-4 py-2 rounded-lg shadow-lg flex items-center space-x-2"
                      initial={{ x: 100, opacity: 0 }}
                      animate={{ x: 0, opacity: 1 }}
                      transition={{ delay: 0.8 }}
                    >
                      <Bell className="w-3 sm:w-4 h-3 sm:h-4" />
                      <span className="text-xs sm:text-sm">
                        Cards Created Today: 65
                      </span>
                    </motion.div>
                  </div>
                </div>
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Search Section */}
      <section className="py-12 sm:py-16 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="max-w-3xl mx-auto">
            <div className="text-center mb-8">
              <h2 className="text-2xl sm:text-3xl font-bold mb-4">
                Find Your Perfect Template
              </h2>
              <p className="text-gray-600">
                Choose from our collection of beautiful Valentine's card
                templates
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4">
              <div className="flex-1">
                <Input
                  placeholder="Search templates..."
                  className="w-full"
                  icon={<Search className="w-4 h-4 text-gray-400" />}
                />
              </div>
              <Button className="w-full sm:w-auto bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                <Link to="/templates" className="text-white">
                  Search
                </Link>
              </Button>
            </div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-16 sm:py-20 bg-gradient-to-b from-white to-pink-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-2xl sm:text-3xl font-bold mb-4">
              Why Choose ValCard?
            </h2>
            <p className="text-gray-600">
              Create beautiful, personalized cards in minutes
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {[
              {
                icon: <Heart className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />,
                title: "Beautiful Templates",
                description:
                  "Choose from our collection of professionally designed templates",
              },
              {
                icon: <Upload className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />,
                title: "Easy to Share",
                description:
                  "Share your card instantly via link or download as PDF",
              },
              {
                icon: <Bell className="w-6 sm:w-8 h-6 sm:h-8 text-red-500" />,
                title: "AI-Powered",
                description:
                  "Generate heartfelt messages with our AI assistant",
              },
            ].map((feature, index) => (
              <motion.div
                key={index}
                className="bg-white rounded-xl p-6 shadow-lg"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: index * 0.1 }}
              >
                <div className="mb-4">{feature.icon}</div>
                <h3 className="text-lg sm:text-xl font-semibold mb-2">
                  {feature.title}
                </h3>
                <p className="text-sm sm:text-base text-gray-600">
                  {feature.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
