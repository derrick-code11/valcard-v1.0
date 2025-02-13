import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Menu, X, LogOut } from "lucide-react";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
}

export function MobileMenu({ isOpen, onClose }: MobileMenuProps) {
  const { user, logout } = useAuth();
  const { toast } = useToast();

  const handleLogout = async () => {
    const result = await logout();
    if (result.error) {
      toast({
        title: "Error",
        description: "Failed to sign out. Please try again.",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Signed out",
        description: "You have been successfully signed out.",
      });
      onClose();
    }
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/20 backdrop-blur-sm z-40"
            onClick={onClose}
          />

          {/* Menu */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", damping: 20 }}
            className="fixed right-0 top-0 bottom-0 w-[250px] bg-white shadow-xl z-50 flex flex-col"
          >
            <div className="flex justify-end p-4">
              <button onClick={onClose}>
                <X className="w-6 h-6 text-gray-500" />
              </button>
            </div>

            {user && (
              <div className="px-4 py-2 border-b">
                <div className="flex items-center space-x-3">
                  {user.photoURL ? (
                    <img
                      src={user.photoURL}
                      alt={user.displayName || "User avatar"}
                      className="h-10 w-10 rounded-full object-cover"
                    />
                  ) : (
                    <div className="h-10 w-10 rounded-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
                      <span className="text-lg font-semibold text-white">
                        {user.displayName?.[0]?.toUpperCase() ||
                          user.email?.[0]?.toUpperCase()}
                      </span>
                    </div>
                  )}
                  <div>
                    <p className="font-medium">{user.displayName || "User"}</p>
                    <p className="text-sm text-gray-500">{user.email}</p>
                  </div>
                </div>
              </div>
            )}

            <nav className="flex flex-col px-4 py-2">
              <Link
                to="/"
                className="py-3 text-gray-600 hover:text-red-500 transition border-b border-gray-100"
                onClick={onClose}
              >
                Home
              </Link>
              <Link
                to="/templates"
                className="py-3 text-gray-600 hover:text-red-500 transition border-b border-gray-100"
                onClick={onClose}
              >
                Templates
              </Link>
              <Link
                to="/create"
                className="py-3 text-gray-600 hover:text-red-500 transition border-b border-gray-100"
                onClick={onClose}
              >
                Create Card
              </Link>
            </nav>

            <div className="mt-auto p-4 space-y-3">
              {user ? (
                <Button
                  variant="outline"
                  className="w-full text-red-600 hover:text-red-700"
                  onClick={handleLogout}
                >
                  <LogOut className="w-4 h-4 mr-2" />
                  Sign out
                </Button>
              ) : (
                <>
                  <Link to="/auth/login" className="block" onClick={onClose}>
                    <Button variant="outline" className="w-full">
                      Log in
                    </Button>
                  </Link>
                  <Link to="/auth/signup" className="block" onClick={onClose}>
                    <Button className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                      Sign up
                    </Button>
                  </Link>
                </>
              )}
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
