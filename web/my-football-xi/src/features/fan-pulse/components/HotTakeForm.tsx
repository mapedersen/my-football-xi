
import React, { useState } from "react";
import { MessageSquare, Send } from "lucide-react";
import { Button } from "@/shared/components/ui/button";
import { Textarea } from "@/shared/components/ui/textarea";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/shared/components/ui/select";
import { Separator } from "@/shared/components/ui/separator";

interface HotTakeFormProps {
  teamId: string;
  onSubmit: (take: any) => void;
}

const HotTakeForm: React.FC<HotTakeFormProps> = ({ teamId, onSubmit }) => {
  const [takeContent, setTakeContent] = useState("");
  const [category, setCategory] = useState("general");
  const [isSubmitting, setIsSubmitting] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (takeContent.trim().length < 10) {
      alert("Please enter a longer take (at least 10 characters)");
      return;
    }
    
    setIsSubmitting(true);
    
    // Create take object
    const take = {
      content: takeContent,
      category,
      teamId,
      timestamp: new Date().toISOString()
    };
    
    // Simulate API delay
    setTimeout(() => {
      onSubmit(take);
      setTakeContent("");
      setIsSubmitting(false);
    }, 800);
  };
  
  // Calculate characters left
  const maxChars = 280;
  const charsLeft = maxChars - takeContent.length;
  const isNearLimit = charsLeft < 40;
  const isOverLimit = charsLeft < 0;
  
  return (
    <div className="space-y-6">
      <div>
        <h2 className="text-2xl font-bold mb-4 flex items-center gap-2">
          <MessageSquare className="h-6 w-6" />
          Submit Your Hot Take
        </h2>
        <p className="text-gray-600 mb-6">
          Share your opinion with other United fans
        </p>
      </div>
      
      <form onSubmit={handleSubmit} className="space-y-4">
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-1">
            Category
          </label>
          <Select
            value={category}
            onValueChange={setCategory}
          >
            <SelectTrigger className="w-full">
              <SelectValue placeholder="Select a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="transfer">Transfer Target/Opinion</SelectItem>
              <SelectItem value="lineup">Lineup Suggestion</SelectItem>
              <SelectItem value="tactics">Tactical Analysis</SelectItem>
              <SelectItem value="general">General Opinion</SelectItem>
            </SelectContent>
          </Select>
        </div>
        
        <div>
          <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
            Your Take
          </label>
          <Textarea
            id="content"
            placeholder="What's your opinion on the team?"
            value={takeContent}
            onChange={(e) => setTakeContent(e.target.value)}
            className="w-full"
            rows={5}
          />
          <div className={`text-xs mt-1 flex justify-end ${
            isOverLimit ? "text-red-600" : isNearLimit ? "text-yellow-600" : "text-gray-500"
          }`}>
            {charsLeft} characters left
          </div>
        </div>
        
        <Separator />
        
        <div className="space-y-2">
          <h3 className="text-sm font-medium">Guidelines</h3>
          <ul className="text-xs text-gray-600 space-y-1 list-disc pl-5">
            <li>Keep it respectful and constructive</li>
            <li>Avoid personal attacks on players or staff</li>
            <li>Be specific - detailed takes get more engagement</li>
            <li>Popular takes will appear in the Fan Pulse dashboard</li>
          </ul>
        </div>
        
        <div className="flex justify-end">
          <Button 
            type="submit" 
            disabled={isSubmitting || takeContent.trim().length < 10 || isOverLimit}
            className="flex items-center gap-2"
          >
            <Send className="h-4 w-4" />
            {isSubmitting ? "Submitting..." : "Submit Take"}
          </Button>
        </div>
      </form>
    </div>
  );
};

export default HotTakeForm;
