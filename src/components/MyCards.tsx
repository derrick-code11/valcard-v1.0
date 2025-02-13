import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Switch } from "@/components/ui/switch";
import { useToast } from "@/hooks/use-toast";
import { useAuth } from "@/contexts/auth-context";
import {
  getUserCards,
  deleteCard,
  updateCardVisibility,
} from "@/lib/firebase-utils";
import {
  Heart,
  MoreVertical,
  Link as LinkIcon,
  Trash,
  Eye,
  EyeOff,
} from "lucide-react";

interface UserCard {
  id: string;
  templateId: string;
  generatedCard: string;
  createdAt: any;
  isPublic: boolean;
}

export function MyCards() {
  const [cards, setCards] = useState<UserCard[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();
  const { toast } = useToast();

  useEffect(() => {
    fetchUserCards();
  }, [user]);

  const fetchUserCards = async () => {
    if (!user) return;

    const { cards, error } = await getUserCards(user.uid);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to fetch your cards",
        variant: "destructive",
      });
    } else {
      setCards(cards as UserCard[]);
    }
    setIsLoading(false);
  };

  const handleDelete = async (cardId: string) => {
    if (!user) return;

    const { error } = await deleteCard(cardId, user.uid);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to delete the card",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: "Card deleted successfully",
      });
      setCards(cards.filter((card) => card.id !== cardId));
    }
  };

  const handleVisibilityChange = async (cardId: string, isPublic: boolean) => {
    if (!user) return;

    const { error } = await updateCardVisibility(cardId, user.uid, isPublic);
    if (error) {
      toast({
        title: "Error",
        description: "Failed to update card visibility",
        variant: "destructive",
      });
    } else {
      toast({
        title: "Success",
        description: `Card is now ${isPublic ? "public" : "private"}`,
      });
      setCards(
        cards.map((card) => (card.id === cardId ? { ...card, isPublic } : card))
      );
    }
  };

  const handleCopyLink = async (cardId: string) => {
    const shareUrl = `${window.location.origin}/share/${cardId}`;
    try {
      await navigator.clipboard.writeText(shareUrl);
      toast({
        title: "Link copied!",
        description: "Share this link with your special someone.",
      });
    } catch (err) {
      toast({
        title: "Couldn't copy link",
        description: "Please try selecting and copying the link manually.",
        variant: "destructive",
      });
    }
  };

  if (isLoading) {
    return (
      <div className="min-h-screen bg-gradient-to-b from-white to-pink-50 flex items-center justify-center">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-pink-500" />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-white to-pink-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 mb-4">My Cards</h1>
          <p className="text-lg text-gray-600">
            Manage your created Valentine's cards
          </p>
        </div>

        {cards.length === 0 ? (
          <div className="text-center">
            <p className="text-gray-600 mb-4">
              You haven't created any cards yet.
            </p>
            <Link to="/create">
              <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
                Create Your First Card
              </Button>
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {cards.map((card) => (
              <motion.div
                key={card.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
              >
                <Card>
                  <CardHeader>
                    <div className="flex items-center justify-between">
                      <CardTitle className="text-lg">
                        Valentine's Card
                      </CardTitle>
                      <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                          <Button variant="ghost" size="sm">
                            <MoreVertical className="h-4 w-4" />
                          </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent align="end">
                          <DropdownMenuItem
                            onClick={() => handleCopyLink(card.id)}
                          >
                            <LinkIcon className="mr-2 h-4 w-4" />
                            Copy Link
                          </DropdownMenuItem>
                          <DropdownMenuItem
                            onClick={() => handleDelete(card.id)}
                            className="text-red-600"
                          >
                            <Trash className="mr-2 h-4 w-4" />
                            Delete
                          </DropdownMenuItem>
                        </DropdownMenuContent>
                      </DropdownMenu>
                    </div>
                    <CardDescription>
                      Created on{" "}
                      {new Date(card.createdAt?.toDate()).toLocaleDateString()}
                    </CardDescription>
                  </CardHeader>
                  <CardContent>
                    <div className="flex items-center justify-between">
                      <div className="flex items-center space-x-2">
                        {card.isPublic ? (
                          <Eye className="h-4 w-4 text-gray-500" />
                        ) : (
                          <EyeOff className="h-4 w-4 text-gray-500" />
                        )}
                        <span className="text-sm text-gray-500">
                          {card.isPublic ? "Public" : "Private"}
                        </span>
                      </div>
                      <Switch
                        checked={card.isPublic}
                        onCheckedChange={(checked) =>
                          handleVisibilityChange(card.id, checked)
                        }
                      />
                    </div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
