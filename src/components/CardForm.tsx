import { Send } from "lucide-react";
import { zodResolver } from "@hookform/resolvers/zod";
import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Card } from "@/components/ui/card";
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
  FormDescription,
} from "@/components/ui/form";
import { CARD_TEMPLATES } from "./CardTemplates";
import { CardFormValues, cardFormSchema } from "@/lib/validations/card";

interface CardFormProps {
  formData: CardFormValues;
  selectedTemplate: (typeof CARD_TEMPLATES)[0];
  isGenerating: boolean;
  onFormChange: (data: CardFormValues) => void;
  onTemplateChange: (template: (typeof CARD_TEMPLATES)[0]) => void;
  onGenerate: () => void;
}

export function CardForm({
  formData,
  selectedTemplate,
  isGenerating,
  onFormChange,
  onTemplateChange,
  onGenerate,
}: CardFormProps) {
  const form = useForm<CardFormValues>({
    resolver: zodResolver(cardFormSchema),
    defaultValues: formData,
  });

  const onSubmit = (data: CardFormValues) => {
    onFormChange(data);
    onGenerate();
  };

  return (
    <Card className="p-8 bg-white shadow-xl rounded-xl border-pink-100">
      <Form {...form}>
        <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
          <div>
            <FormLabel className="block text-lg font-medium text-gray-700 mb-4">
              Choose a Template
            </FormLabel>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
              {CARD_TEMPLATES.map((template) => (
                <button
                  type="button"
                  key={template.id}
                  onClick={() => onTemplateChange(template)}
                  className={`relative rounded-lg overflow-hidden transition-all duration-200 ${
                    selectedTemplate.id === template.id
                      ? "ring-2 ring-red-500 ring-offset-2"
                      : "hover:ring-2 hover:ring-red-200 hover:ring-offset-2"
                  }`}
                >
                  {template.preview}
                </button>
              ))}
            </div>
          </div>

          <FormField
            control={form.control}
            name="creatorName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-lg font-medium text-gray-700">
                  Your Name
                </FormLabel>
                <FormDescription className="text-sm text-gray-500">
                  This will be shown as the sender of the card
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your name"
                      className="text-lg"
                      {...field}
                      aria-describedby="creator-name-description"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="partnerName"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-lg font-medium text-gray-700">
                  Partner's Name
                </FormLabel>
                <FormDescription className="text-sm text-gray-500">
                  The special someone you're creating this card for
                </FormDescription>
                <FormControl>
                  <div className="relative">
                    <Input
                      placeholder="Enter your partner's name"
                      className="text-lg"
                      {...field}
                      aria-describedby="partner-name-description"
                    />
                  </div>
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="memories"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-lg font-medium text-gray-700">
                  Favorite Memories Together
                </FormLabel>
                <FormDescription className="text-sm text-gray-500">
                  Share some special moments you've shared (minimum 10
                  characters)
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="E.g., Our first date at the park, the time we went stargazing..."
                    className="text-lg min-h-[120px] resize-none"
                    {...field}
                    aria-describedby="memories-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <FormField
            control={form.control}
            name="thingsLoved"
            render={({ field }) => (
              <FormItem>
                <FormLabel className="block text-lg font-medium text-gray-700">
                  Things You Love About Them
                </FormLabel>
                <FormDescription className="text-sm text-gray-500">
                  What makes them special to you? (minimum 10 characters)
                </FormDescription>
                <FormControl>
                  <Textarea
                    placeholder="E.g., Your kindness, the way you make me laugh, how you always know what to say..."
                    className="text-lg min-h-[120px] resize-none"
                    {...field}
                    aria-describedby="things-loved-description"
                  />
                </FormControl>
                <FormMessage />
              </FormItem>
            )}
          />

          <Button
            type="submit"
            size="lg"
            className="w-full text-lg bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 transition-all duration-300"
            disabled={isGenerating}
          >
            {isGenerating ? (
              "Creating your card..."
            ) : (
              <>
                <Send className="w-5 h-5 mr-2" />
                Generate Card
              </>
            )}
          </Button>
        </form>
      </Form>
    </Card>
  );
}
