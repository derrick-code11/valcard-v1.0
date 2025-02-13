import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import { Card } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { CARD_TEMPLATES } from "./CardTemplates";
import { motion } from "framer-motion";
import { Heart, Lock } from "lucide-react";
import { getCard } from "@/lib/firebase-utils";
import { useAuth } from "@/contexts/auth-context";

interface SharedCard {
  templateId: string;
  generatedCard: string;
  createdAt: any;
  userId: string;
  userName: string;
  isPublic: boolean;
}

export function SharedCardView() {
  const { shareId } = useParams();
  const [card, setCard] = useState<SharedCard | null>(null);
  const [template, setTemplate] = useState(CARD_TEMPLATES[0]);
  const [error, setError] = useState<string | null>(null);
  const [isLoading, setIsLoading] = useState(true);
  const { user } = useAuth();

  useEffect(() => {
    console.log("Auth state:", {
      user: user?.email || "no user",
      isAuthenticated: !!user,
    });
  }, [user]);

  useEffect(() => {
    async function fetchCard() {
      if (!shareId) {
        setError("Invalid card link");
        setIsLoading(false);
        return;
      }

      try {
        const cardData = await getCard(shareId);
        if (cardData) {
          // Check if the card is private and the viewer is not the owner
          if (!cardData.isPublic && (!user || user.uid !== cardData.userId)) {
            setError("This card is private");
          } else {
            setCard(cardData);
            const foundTemplate = CARD_TEMPLATES.find(
              (t) => t.id === cardData.templateId
            );
            if (foundTemplate) {
              setTemplate(foundTemplate);
            }
          }
        } else {
          setError("Card not found");
        }
      } catch (err) {
        setError("Error loading card");
      } finally {
        setIsLoading(false);
      }
    }

    fetchCard();
  }, [shareId, user]);

  if (isLoading) {
    return (
      <div className="min-h-screen bg-[#FDF7F7] flex items-center justify-center">
        <div className="animate-pulse">
          <Heart className="w-12 h-12 text-pink-500" />
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-[#FDF7F7] flex items-center justify-center">
        <div className="text-center max-w-md mx-auto px-4">
          {error === "This card is private" ? (
            <>
              <Lock className="w-12 h-12 text-gray-400 mx-auto mb-4" />
              <h1 className="text-3xl font-bold text-gray-900 mb-4">
                Private Card
              </h1>
              <p className="text-gray-600 mb-8">
                This card is private and can only be viewed by its creator.
              </p>
            </>
          ) : (
            <>
              <h1 className="text-3xl font-bold text-gray-900 mb-4">Oops!</h1>
              <p className="text-gray-600 mb-8">{error}</p>
            </>
          )}
          <Link to="/">
            <Button className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600">
              Return Home
            </Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#FDF7F7]">
      <div className="container mx-auto px-4 py-8">
        <div className="max-w-2xl mx-auto space-y-12">
          <div className="text-center">
            <h1 className="font-script text-7xl bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 mb-3">
              A Valentine's Card
            </h1>
            <p className="text-gray-600 text-lg">
              {card?.userName
                ? `A heartfelt message from ${card.userName}`
                : "Someone special has sent you a heartfelt message"}
            </p>
          </div>

          <Card
            className={`relative p-12 shadow-xl rounded-xl overflow-hidden ${template.className}`}
          >
            {template.id === "postcard" && (
              <div className="absolute top-4 right-4">
                <Heart className="w-12 h-12 text-red-200" />
              </div>
            )}

            {(template.id === "scroll" || template.id === "polaroid") &&
              template.backgroundImage && (
                <>
                  <div
                    className="absolute inset-0 bg-cover bg-center bg-no-repeat"
                    style={{
                      backgroundImage: `url(${template.backgroundImage})`,
                    }}
                  />
                  <div className={template.overlayStyle} />
                </>
              )}

            <motion.div
              initial={{ scale: 0.8, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="relative z-10"
            >
              <div className="prose max-w-none">
                <div className="text-center mb-12">
                  <motion.h2
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className={template.titleClass}
                  >
                    Forever Yours
                  </motion.h2>
                  <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.2 }}
                    className={template.subtitleClass}
                  >
                    with all my heart
                  </motion.div>
                </div>
                <div
                  className={`whitespace-pre-wrap leading-relaxed ${template.contentClass}`}
                >
                  {card?.generatedCard.split("\n\n").map((paragraph, index) => (
                    <motion.p
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.3 + index * 0.2 }}
                      className="mb-6 last:mb-0"
                    >
                      {paragraph}
                    </motion.p>
                  ))}
                </div>
              </div>
            </motion.div>

            {template.id === "modern" ? (
              <div className="absolute inset-0 pointer-events-none">
                <div className="absolute top-0 right-0 w-64 h-64 bg-gradient-to-br from-pink-400/20 to-transparent rounded-full transform translate-x-32 -translate-y-32"></div>
                <div className="absolute bottom-0 left-0 w-64 h-64 bg-gradient-to-tr from-red-400/20 to-transparent rounded-full transform -translate-x-32 translate-y-32"></div>
              </div>
            ) : (
              <>
                <div className="absolute top-0 right-0 w-32 h-32 pointer-events-none opacity-10">
                  <div className="absolute top-4 right-4 transform rotate-12">
                    <Heart className="w-24 h-24 text-red-400" />
                  </div>
                </div>
                <div className="absolute bottom-0 left-0 w-32 h-32 pointer-events-none opacity-10">
                  <div className="absolute bottom-4 left-4 transform -rotate-12">
                    <Heart className="w-20 h-20 text-pink-400" />
                  </div>
                </div>
              </>
            )}
          </Card>

          {/* Debug render */}
          <div className="hidden">
            Auth Debug: {user ? "User is logged in" : "No user"}
          </div>

          {/* CTA Section with explicit condition */}
          {user === null && (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5 }}
              className="bg-white rounded-xl shadow-lg p-8 text-center"
            >
              <Heart className="w-12 h-12 text-red-500 mx-auto mb-4" />
              <h2 className="text-2xl font-bold text-gray-900 mb-3">
                Create Your Own Valentine's Card
              </h2>
              <p className="text-gray-600 mb-6">
                Want to create a special Valentine's card for someone you love?
                Join now and start creating your own personalized cards in
                minutes!
              </p>
              <Link to="/auth/signup">
                <Button
                  size="lg"
                  className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 w-full sm:w-auto"
                >
                  Create Your Free Account
                </Button>
              </Link>
            </motion.div>
          )}
        </div>
      </div>
    </div>
  );
}
