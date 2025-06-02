"use client";

import { useState } from 'react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { personalizedGiftSuggestions, type PersonalizedGiftSuggestionsOutput } from '@/ai/flows/ai-gift-suggestions';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent, CardHeader, CardTitle, CardFooter, CardDescription } from '@/components/ui/card';
import { Form, FormControl, FormField, FormItem, FormLabel, FormMessage } from '@/components/ui/form';
import { Loader2, Wand2, Gift } from 'lucide-react';
import { Alert, AlertDescription, AlertTitle } from "@/components/ui/alert";


const formSchema = z.object({
  recipientInterests: z.string().min(3, "Please describe recipient's interests."),
  recipientAge: z.coerce.number().min(1, "Age must be at least 1.").max(120, "Age seems too high."),
  occasion: z.string().min(3, "Please specify the occasion."),
  giftPreferences: z.string().optional(),
  budget: z.coerce.number().min(0, "Budget cannot be negative."),
});

type FormData = z.infer<typeof formSchema>;

export default function AIGiftFinderForm() {
  const [suggestions, setSuggestions] = useState<PersonalizedGiftSuggestionsOutput | null>(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const form = useForm<FormData>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      recipientInterests: '',
      recipientAge: undefined, // Use undefined for number inputs to show placeholder
      occasion: '',
      giftPreferences: '',
      budget: undefined,
    },
  });

  const onSubmit: SubmitHandler<FormData> = async (data) => {
    setIsLoading(true);
    setError(null);
    setSuggestions(null);
    try {
      const result = await personalizedGiftSuggestions(data);
      setSuggestions(result);
    } catch (e) {
      console.error(e);
      setError("Sorry, we couldn't generate suggestions at this time. Please try again later.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="space-y-8">
      <Card className="shadow-lg rounded-lg">
        <CardHeader className="text-center">
          <Wand2 className="mx-auto h-12 w-12 text-primary mb-2" />
          <CardTitle className="text-3xl font-headline font-bold text-foreground">AI Gift Genie</CardTitle>
          <CardDescription className="text-muted-foreground">
            Let our AI help you find the perfect gift! Fill in the details below.
          </CardDescription>
        </CardHeader>
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)}>
            <CardContent className="space-y-6 p-6">
              <FormField
                control={form.control}
                name="recipientInterests"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Recipient's Interests</FormLabel>
                    <FormControl>
                      <Textarea placeholder="e.g., hiking, reading sci-fi, cooking" {...field} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <div className="grid sm:grid-cols-2 gap-6">
                <FormField
                  control={form.control}
                  name="recipientAge"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Recipient's Age</FormLabel>
                      <FormControl>
                        <Input type="number" placeholder="e.g., 30" {...field} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
                <FormField
                  control={form.control}
                  name="occasion"
                  render={({ field }) => (
                    <FormItem>
                      <FormLabel>Occasion</FormLabel>
                      <FormControl>
                        <Input placeholder="e.g., Birthday, Anniversary" {...field} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                      </FormControl>
                      <FormMessage />
                    </FormItem>
                  )}
                />
              </div>
              <FormField
                control={form.control}
                name="giftPreferences"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Gift Preferences (Optional)</FormLabel>
                    <FormControl>
                      <Input placeholder="e.g., prefers experiences, handmade items" {...field} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
              <FormField
                control={form.control}
                name="budget"
                render={({ field }) => (
                  <FormItem>
                    <FormLabel>Budget ($)</FormLabel>
                    <FormControl>
                      <Input type="number" placeholder="e.g., 50" {...field} className="rounded-md shadow-sm border-primary/50 focus:ring-primary" />
                    </FormControl>
                    <FormMessage />
                  </FormItem>
                )}
              />
            </CardContent>
            <CardFooter className="p-6">
              <Button type="submit" disabled={isLoading} className="w-full bg-primary hover:bg-primary/90 text-primary-foreground text-lg py-3 rounded-md shadow-md hover:shadow-lg transition-all">
                {isLoading ? (
                  <Loader2 className="mr-2 h-5 w-5 animate-spin" />
                ) : (
                  <Wand2 className="mr-2 h-5 w-5" />
                )}
                Find Gifts
              </Button>
            </CardFooter>
          </form>
        </Form>
      </Card>

      {error && (
         <Alert variant="destructive" className="rounded-md shadow-sm">
          <AlertTitle>Error</AlertTitle>
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {suggestions && (
        <Card className="mt-8 shadow-lg rounded-lg">
          <CardHeader>
            <Gift className="mx-auto h-10 w-10 text-primary mb-2" />
            <CardTitle className="text-2xl font-headline text-center text-foreground">Gift Suggestions</CardTitle>
          </CardHeader>
          <CardContent className="space-y-4">
            <h3 className="font-semibold text-lg text-foreground">Why these gifts?</h3>
            <p className="text-muted-foreground italic bg-accent/30 p-3 rounded-md shadow-xs">{suggestions.reasoning}</p>
            
            <h3 className="font-semibold text-lg text-foreground mt-4">Our Top Picks:</h3>
            <ul className="list-disc pl-5 space-y-2 text-foreground">
              {suggestions.giftSuggestions.map((suggestion, index) => (
                <li key={index} className="p-2 bg-secondary/30 rounded-md shadow-xs hover:bg-secondary/50 transition-colors">
                  {suggestion}
                </li>
              ))}
            </ul>
          </CardContent>
        </Card>
      )}
    </div>
  );
}
