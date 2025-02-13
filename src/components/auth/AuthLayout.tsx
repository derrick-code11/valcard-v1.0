import { Link } from "react-router-dom";
import { Heart } from "lucide-react";
import { motion } from "framer-motion";

interface AuthLayoutProps {
  children: React.ReactNode;
  title: string;
  subtitle: string;
}

export function AuthLayout({ children, title, subtitle }: AuthLayoutProps) {
  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex flex-col">
      <div className="h-16 border-b bg-white/50 backdrop-blur-sm flex items-center px-4">
        <Link to="/" className="flex items-center space-x-2">
          <Heart className="w-8 h-8 text-red-500" />
          <span className="text-2xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600">
            ValCard
          </span>
        </Link>
      </div>

      <div className="flex-1 flex items-center justify-center p-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="w-full max-w-md"
        >
          <div className="bg-white rounded-xl shadow-xl p-8">
            <div className="text-center mb-8">
              <h1 className="text-2xl font-bold text-gray-900 mb-2">{title}</h1>
              <p className="text-gray-600">{subtitle}</p>
            </div>
            {children}
          </div>
        </motion.div>
      </div>
    </div>
  );
} 