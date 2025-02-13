import { useState } from "react";
import { AnimatePresence } from "framer-motion";
import { useToast } from "@/hooks/use-toast";
import { generateValentineMessage } from "@/lib/openai";
import { HangingHeart } from "@/components/HangingHeart";
import { CARD_TEMPLATES } from "@/components/CardTemplates";
import { CardForm } from "@/components/CardForm";
import { CardPreview } from "@/components/CardPreview";
import { GenerationEnvelope } from "@/components/GenerationEnvelope";
import { saveCard } from "@/lib/firebase-utils";
import { Link } from "react-router-dom";
import { Heart, Home } from "lucide-react";
import { Button } from "@/components/ui/button";
import { UserMenu } from "./UserMenu";
import { useAuth } from "@/contexts/auth-context";

export function CardCreator() {
  const [step, setStep] = useState<"form" | "preview">("form");
  const [isGenerating, setIsGenerating] = useState(false);
  const [showEnvelope, setShowEnvelope] = useState(false);
  const [selectedTemplate, setSelectedTemplate] = useState(CARD_TEMPLATES[0]);
  const [formData, setFormData] = useState({
    partnerName: "",
    memories: "",
    thingsLoved: "",
    creatorName: "",
  });
  const [generatedCard, setGeneratedCard] = useState("");
  const { toast } = useToast();
  const { user } = useAuth();

  const handleGenerate = async () => {
    // Trim all form values to check if they're actually empty
    if (
      !formData.partnerName.trim() ||
      !formData.memories.trim() ||
      !formData.thingsLoved.trim() ||
      !formData.creatorName.trim()
    ) {
      toast({
        title: "Please fill in all fields",
        description: "We need this information to create a personalized card.",
        variant: "destructive",
      });
      return;
    }

    setIsGenerating(true);
    setShowEnvelope(true);

    try {
      const message = await generateValentineMessage(
        formData.partnerName,
        formData.memories,
        formData.thingsLoved,
        formData.creatorName
      );

      setGeneratedCard(message);
      setStep("preview");
    } catch (error) {
      toast({
        title: "Generation failed",
        description: "There was an error creating your card. Please try again.",
        variant: "destructive",
      });
    } finally {
      setIsGenerating(false);
      setShowEnvelope(false);
    }
  };

  const handleShare = async () => {
    if (!user) return;

    try {
      // Save the card to Firebase
      const { shareId, error } = await saveCard({
        templateId: selectedTemplate.id,
        generatedCard: generatedCard,
        userId: user.uid,
        userName: user.displayName || "Anonymous",
        isPublic: true, // Default to public
      });

      if (error || !shareId) {
        throw new Error(error || "Failed to save card");
      }

      // Create the share URL
      const shareUrl = `${window.location.origin}/share/${shareId}`;

      if (navigator.share) {
        try {
          await navigator.share({
            title: "My Valentine's Card",
            text: "I've created a special Valentine's card for you!",
            url: shareUrl,
          });
          toast({
            title: "Shared successfully",
            description: "Your card has been shared!",
          });
        } catch (error) {
          if (error.name !== "AbortError") {
            handleCopyLink(shareUrl);
          }
        }
      } else {
        handleCopyLink(shareUrl);
      }
    } catch (error) {
      toast({
        title: "Sharing failed",
        description: "There was an error sharing your card. Please try again.",
        variant: "destructive",
      });
    }
  };

  const handleCopyLink = async (shareUrl: string) => {
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

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="min-h-screen bg-[#FDF7F7] overflow-hidden">
      {/* Header */}
      <div className="bg-white border-b">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex items-center justify-between">
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
              <UserMenu />
            </div>
          </div>
        </div>
      </div>

      <div className="fixed inset-0 pointer-events-none">
        {Array.from({ length: 12 }).map((_, i) => (
          <div
            key={i}
            className="absolute"
            style={{
              left: `${(i % 4) * 33}%`,
              top: `${Math.random() * 20}%`,
              transform: `translateX(${Math.random() * 100 - 50}px)`,
            }}
          >
            <HangingHeart
              color={i % 2 === 0 ? "#FF4D6D" : "#FFB3C1"}
              delay={i * 0.2}
              scale={0.8 + Math.random() * 0.4}
            />
          </div>
        ))}
      </div>

      <div className="min-h-screen relative">
        <div className="max-w-2xl mx-auto pt-8 px-6 pb-12">
          <div className="text-center mb-12">
            <h1 className="font-script text-7xl bg-clip-text text-transparent bg-gradient-to-r from-red-600 to-pink-600 mb-3">
              Valentine's
            </h1>
            <h2 className="text-4xl font-bold text-gray-900 tracking-tight mb-3">
              Card Creator
            </h2>
            <p className="text-gray-600 text-lg">
              Create a heartfelt message for your special someone
            </p>
          </div>

          <AnimatePresence mode="wait">
            {showEnvelope && <GenerationEnvelope key="envelope" />}

            {step === "form" ? (
              <CardForm
                key="form"
                formData={formData}
                selectedTemplate={selectedTemplate}
                isGenerating={isGenerating}
                onFormChange={setFormData}
                onTemplateChange={setSelectedTemplate}
                onGenerate={handleGenerate}
              />
            ) : (
              <CardPreview
                key="preview"
                selectedTemplate={selectedTemplate}
                generatedCard={generatedCard}
                onEdit={() => setStep("form")}
                onPrint={handlePrint}
                onShare={handleShare}
              />
            )}
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
