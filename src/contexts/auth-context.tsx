import React, { createContext, useContext, useEffect, useState } from "react";
import { User } from "firebase/auth";
import { useNavigate } from "react-router-dom";
import {
  getCurrentUser,
  onAuthStateChange,
  loginWithEmail,
  signUpWithEmail,
  loginWithGoogle,
  resetPassword,
  logOut,
} from "@/lib/firebase-auth";

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<{ error: string | null }>;
  signUp: (
    email: string,
    password: string
  ) => Promise<{ error: string | null }>;
  loginWithGoogle: () => Promise<{ error: string | null }>;
  resetPassword: (email: string) => Promise<{ error: string | null }>;
  logout: () => Promise<{ error: string | null }>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(getCurrentUser());
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = onAuthStateChange((user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  const login = async (email: string, password: string) => {
    const result = await loginWithEmail(email, password);
    if (!result.error) {
      navigate("/create");
    }
    return { error: result.error };
  };

  const signUp = async (email: string, password: string) => {
    const result = await signUpWithEmail(email, password);
    if (!result.error) {
      navigate("/create");
    }
    return { error: result.error };
  };

  const googleLogin = async () => {
    const result = await loginWithGoogle();
    if (!result.error) {
      navigate("/create");
    }
    return { error: result.error };
  };

  const handleResetPassword = async (email: string) => {
    const result = await resetPassword(email);
    return { error: result.error };
  };

  const logout = async () => {
    const result = await logOut();
    if (!result.error) {
      navigate("/");
    }
    return { error: result.error };
  };

  const value = {
    user,
    loading,
    login,
    signUp,
    loginWithGoogle: googleLogin,
    resetPassword: handleResetPassword,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
