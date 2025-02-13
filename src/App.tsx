import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { LandingPage } from "@/components/LandingPage";
import { TemplatesPage } from "@/components/TemplatesPage";
import { CardCreator } from "@/components/CardCreator";
import { SharedCardView } from "@/components/SharedCardView";
import { MyCards } from "@/components/MyCards";
import { LoginPage } from "@/components/auth/LoginPage";
import { SignUpPage } from "@/components/auth/SignUpPage";
import { ResetPasswordPage } from "@/components/auth/ResetPasswordPage";
import { ProtectedRoute } from "@/components/auth/ProtectedRoute";
import { AuthProvider } from "@/contexts/auth-context";
import { Toaster } from "@/components/ui/toaster";
import { useAuth } from "@/contexts/auth-context";

function AuthRoutes() {
  const { user } = useAuth();

  // Redirect to create page if user is already logged in
  if (user) {
    return <Navigate to="/create" replace />;
  }

  return (
    <Routes>
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<SignUpPage />} />
      <Route path="/reset-password" element={<ResetPasswordPage />} />
    </Routes>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route path="/" element={<LandingPage />} />
          <Route path="/templates" element={<TemplatesPage />} />
          <Route
            path="/create"
            element={
              <ProtectedRoute>
                <CardCreator />
              </ProtectedRoute>
            }
          />
          <Route
            path="/my-cards"
            element={
              <ProtectedRoute>
                <MyCards />
              </ProtectedRoute>
            }
          />
          <Route path="/share/:shareId" element={<SharedCardView />} />
          <Route path="/auth/*" element={<AuthRoutes />} />
        </Routes>
        <Toaster />
      </AuthProvider>
    </BrowserRouter>
  );
}
