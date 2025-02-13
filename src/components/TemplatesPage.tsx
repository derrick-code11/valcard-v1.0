import { useState } from "react";
import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Search,
  Heart,
  ArrowRight,
  PenTool,
  Stamp,
  Image,
  Palette,
  Sticker,
  Gift,
  Home,
} from "lucide-react";
import { CARD_TEMPLATES } from "./CardTemplates";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/auth-context";

export function TemplatesPage() {
  const [searchQuery, setSearchQuery] = useState("");
  const { user } = useAuth();

  const filteredTemplates = CARD_TEMPLATES.filter(
    (template) =>
      template.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      template.id.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center justify-between mb-8">
            <Link to="/" className="flex items-center space-x-2">
              <Heart className="w-8 h-8 text-red-500" />
              <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
                ValCard
              </span>
            </Link>
            <div className="flex items-center space-x-4">
              <Link to="/">
                <Button variant="outline" size="sm" className="hidden sm:flex">
                  <Home className="w-4 h-4 mr-2" />
                  Back to Home
                </Button>
              </Link>
              {user && <UserMenu />}
            </div>
          </div>
          <h1 className="text-3xl sm:text-4xl font-bold text-center mb-4">
            Valentine's Card Templates
          </h1>
          <p className="text-gray-600 text-center mb-8">
            Choose from our collection of beautiful templates to create your
            perfect Valentine's card
          </p>
          <div className="max-w-2xl mx-auto">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
              <Input
                type="text"
                placeholder="Search templates by name or style..."
                className="pl-10"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
          </div>
        </div>
      </div>

      {/* Templates Grid */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {filteredTemplates.map((template, index) => (
            <motion.div
              key={template.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="bg-white rounded-xl overflow-hidden shadow-lg group hover:shadow-xl transition"
            >
              <div className="relative aspect-[4/3] overflow-hidden">
                {template.backgroundImage ? (
                  <div
                    className="w-full h-full bg-cover bg-center"
                    style={{
                      backgroundImage: `url(${template.backgroundImage})`,
                    }}
                  >
                    <div className={template.overlayStyle} />
                  </div>
                ) : (
                  <div
                    className={`w-full h-full ${template.className} flex items-center justify-center`}
                  >
                    {template.preview}
                  </div>
                )}
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold mb-2">{template.name}</h3>
                <p className="text-gray-600 mb-4">
                  {template.id === "notebook" &&
                    "A charming notebook-style design with handwritten flair"}
                  {template.id === "scroll" &&
                    "An elegant scroll design with a vintage touch"}
                  {template.id === "postcard" &&
                    "A classic postcard layout with a modern twist"}
                  {template.id === "modern" &&
                    "Clean and contemporary design with bold typography"}
                  {template.id === "polaroid" &&
                    "A nostalgic photo-inspired layout"}
                  {template.id === "watercolor" &&
                    "Delicate watercolor effects with soft hues"}
                  {template.id === "cute" &&
                    "Playful and sweet design with adorable elements"}
                  {template.id === "chocolate" &&
                    "Rich and romantic design inspired by sweet treats"}
                </p>
                <Link to={`/create?template=${template.id}`}>
                  <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 group">
                    <span>Use This Template</span>
                    <ArrowRight className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform" />
                  </Button>
                </Link>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
}
