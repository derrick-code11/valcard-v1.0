import { useState } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormMessage,
} from "@/components/ui/form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import * as z from "zod";
import { Mail, Loader2, ArrowLeft } from "lucide-react";
import { AuthLayout } from "./AuthLayout";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";

const resetSchema = z.object({
  email: z.string().email("Please enter a valid email address"),
});

type ResetValues = z.infer<typeof resetSchema>;

export function ResetPasswordPage() {
  const [isLoading, setIsLoading] = useState(false);
  const [isEmailSent, setIsEmailSent] = useState(false);
  const { resetPassword } = useAuth();
  const { toast } = useToast();

  const form = useForm<ResetValues>({
    resolver: zodResolver(resetSchema),
    defaultValues: {
      email: "",
    },
  });

  const onSubmit = async (data: ResetValues) => {
    setIsLoading(true);
    try {
      const result = await resetPassword(data.email);
      if (result.error) {
        toast({
          title: "Password reset failed",
          description: result.error,
          variant: "destructive",
        });
      } else {
        setIsEmailSent(true);
        toast({
          title: "Email sent",
          description: "Check your email for password reset instructions.",
        });
      }
    } catch (error) {
      toast({
        title: "Password reset failed",
        description: "An unexpected error occurred. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsLoading(false);
    }
  };

  if (isEmailSent) {
    return (
      <AuthLayout
        title="Check Your Email"
        subtitle="We've sent you a link to reset your password"
      >
        <div className="text-center">
          <p className="text-gray-600 mb-8">
            Please check your email for a link to reset your password. If you
            don't see it, check your spam folder.
          </p>
          <Link to="/auth/login">
            <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
              Return to Sign In
            </Button>
          </Link>
        </div>
      </AuthLayout>
    );
  }

  return (
    <AuthLayout
      title="Reset Password"
      subtitle="Enter your email to receive a password reset link"
    >
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-4">
          <FormField
            control={form.control}
            name="email"
            render={({ field }) => (
              <FormItem>
                <FormControl>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-400" />
                    <Input
                      placeholder="Email address"
                      className="pl-10"
                      {...field}
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
            disabled={isLoading}
          >
            {isLoading ? (
              <Loader2 className="w-4 h-4 mr-2 animate-spin" />
            ) : null}
            Send Reset Link
          </Button>

          <div className="text-center mt-6">
            <Link
              to="/auth/login"
              className="inline-flex items-center text-sm text-gray-600 hover:text-gray-900"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Sign In
            </Link>
          </div>
        </form>
      </Form>
    </AuthLayout>
  );
}
