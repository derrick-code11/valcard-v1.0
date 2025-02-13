import { LogOut, Heart } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/contexts/auth-context";
import { useToast } from "@/hooks/use-toast";
import { Link } from "react-router-dom";

export function UserMenu() {
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
    }
  };

  if (!user) return null;

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          variant="ghost"
          className="relative h-10 w-10 rounded-full p-0 overflow-hidden"
        >
          {user.photoURL ? (
            <img
              src={user.photoURL}
              alt={user.displayName || "User avatar"}
              className="h-full w-full object-cover"
            />
          ) : (
            <div className="h-full w-full bg-gradient-to-r from-red-500 to-pink-500 flex items-center justify-center">
              <span className="text-lg font-semibold text-white">
                {user.displayName?.[0]?.toUpperCase() ||
                  user.email?.[0]?.toUpperCase()}
              </span>
            </div>
          )}
        </Button>
      </DropdownMenuTrigger>
      <DropdownMenuContent align="end" className="w-56">
        <div className="flex items-center justify-start gap-2 p-2">
          <div className="flex flex-col space-y-1 w-full">
            <p className="text-sm font-medium leading-none">
              {user.displayName || "User"}
            </p>
            <p className="text-xs leading-none text-muted-foreground truncate">
              {user.email}
            </p>
          </div>
        </div>
        <DropdownMenuSeparator />
        <Link to="/my-cards">
          <DropdownMenuItem className="cursor-pointer">
            <Heart className="mr-2 h-4 w-4" />
            <span>My Cards</span>
          </DropdownMenuItem>
        </Link>
        <DropdownMenuItem
          onClick={handleLogout}
          className="text-red-600 cursor-pointer"
        >
          <LogOut className="mr-2 h-4 w-4" />
          <span>Sign out</span>
        </DropdownMenuItem>
      </DropdownMenuContent>
    </DropdownMenu>
  );
}
