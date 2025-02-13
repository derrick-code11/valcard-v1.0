import { motion } from "framer-motion";
import { Heart, Printer, Share2, Edit2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import { CARD_TEMPLATES } from "./CardTemplates";

interface CardPreviewProps {
  selectedTemplate: (typeof CARD_TEMPLATES)[0];
  generatedCard: string;
  onEdit: () => void;
  onPrint: () => void;
  onShare: () => void;
}

export function CardPreview({
  selectedTemplate,
  generatedCard,
  onEdit,
  onPrint,
  onShare,
}: CardPreviewProps) {
  const handlePrint = () => {
    // Add print class to the main container
    const container = document.querySelector(".print-container");
    if (container) {
      container.classList.add("print-only");
    }

    // Trigger print
    window.print();

    // Clean up after printing
    setTimeout(() => {
      if (container) {
        container.classList.remove("print-only");
      }
    }, 500);
  };

  return (
    <>
      <div className="scroll-container relative mb-8 print-container">
        {selectedTemplate.id === "scroll" && (
          <>
            <div className="absolute inset-0 bg-[#F8E8E8] rounded-xl transform rotate-2 shadow-lg scroll-layer"></div>
            <div className="absolute inset-0 bg-[#F5E0E0] rounded-xl transform -rotate-1 shadow-lg scroll-layer"></div>
          </>
        )}
        <Card
          className={`relative p-12 shadow-xl rounded-xl overflow-hidden ${selectedTemplate.className} card-content`}
        >
          {selectedTemplate.id === "postcard" && (
            <div className="absolute top-4 right-4">
              <Heart className="w-12 h-12 text-red-200" />
            </div>
          )}

          {(selectedTemplate.id === "scroll" ||
            selectedTemplate.id === "polaroid") &&
            selectedTemplate.backgroundImage && (
              <>
                <div
                  className="absolute inset-0 bg-cover bg-center bg-no-repeat card-bg"
                  style={{
                    backgroundImage: `url(${selectedTemplate.backgroundImage})`,
                  }}
                />
                <div className={selectedTemplate.overlayStyle} />
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
                  className={selectedTemplate.titleClass}
                >
                  Forever Yours
                </motion.h2>
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className={selectedTemplate.subtitleClass}
                >
                  with all my heart
                </motion.div>
              </div>
              <div
                className={`whitespace-pre-wrap leading-relaxed ${selectedTemplate.contentClass}`}
              >
                {generatedCard.split("\n\n").map((paragraph, index) => (
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

          {selectedTemplate.id === "modern" ? (
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
      </div>

      <div className="flex gap-4 justify-center no-print">
        <Button
          variant="outline"
          size="lg"
          className="bg-white"
          onClick={onEdit}
        >
          <Edit2 className="w-5 h-5 mr-2" />
          Edit
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
          onClick={handlePrint}
        >
          <Printer className="w-5 h-5 mr-2" />
          Save as PDF
        </Button>
        <Button
          size="lg"
          className="bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
          onClick={onShare}
        >
          <Share2 className="w-5 h-5 mr-2" />
          Share
        </Button>
      </div>
    </>
  );
}
