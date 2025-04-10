
import React, { useState } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Label } from "@/components/ui/label";
import { Slider } from "@/components/ui/slider";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";

interface Opinion {
  rating: number;
  comments: string;
}

interface OpinionSectionProps {
  ownerOpinion: Opinion;
  managerOpinion: Opinion;
  onSaveOpinions: (ownerOpinion: Opinion, managerOpinion: Opinion) => void;
}

const OpinionSection: React.FC<OpinionSectionProps> = ({
  ownerOpinion: initialOwnerOpinion = { rating: 5, comments: "" },
  managerOpinion: initialManagerOpinion = { rating: 5, comments: "" },
  onSaveOpinions,
}) => {
  const [ownerOpinion, setOwnerOpinion] = useState<Opinion>(initialOwnerOpinion);
  const [managerOpinion, setManagerOpinion] = useState<Opinion>(initialManagerOpinion);
  const [isEditing, setIsEditing] = useState(false);

  const handleSave = () => {
    onSaveOpinions(ownerOpinion, managerOpinion);
    setIsEditing(false);
  };

  const renderRatingEmoji = (rating: number) => {
    if (rating <= 2) return "😡";
    if (rating <= 4) return "😕";
    if (rating <= 6) return "😐";
    if (rating <= 8) return "🙂";
    return "😄";
  };

  const renderRatingText = (rating: number) => {
    if (rating <= 2) return "Very Unsatisfied";
    if (rating <= 4) return "Unsatisfied";
    if (rating <= 6) return "Neutral";
    if (rating <= 8) return "Satisfied";
    return "Very Satisfied";
  };

  return (
    <div className="space-y-4">
      <Card>
        <CardHeader>
          <CardTitle className="text-lg">Club Leadership Opinions</CardTitle>
        </CardHeader>
        <CardContent>
          {!isEditing ? (
            <div className="space-y-4">
              <div>
                <h3 className="font-medium mb-1">Owners (INEOS & Glazers)</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{renderRatingEmoji(ownerOpinion.rating)}</span>
                  <span>{renderRatingText(ownerOpinion.rating)}</span>
                </div>
                {ownerOpinion.comments && (
                  <p className="text-sm text-gray-600 mt-1">{ownerOpinion.comments}</p>
                )}
              </div>
              
              <div>
                <h3 className="font-medium mb-1">Manager (Erik ten Hag)</h3>
                <div className="flex items-center space-x-2">
                  <span className="text-2xl">{renderRatingEmoji(managerOpinion.rating)}</span>
                  <span>{renderRatingText(managerOpinion.rating)}</span>
                </div>
                {managerOpinion.comments && (
                  <p className="text-sm text-gray-600 mt-1">{managerOpinion.comments}</p>
                )}
              </div>
              
              <Button 
                variant="outline" 
                className="w-full mt-2"
                onClick={() => setIsEditing(true)}
              >
                Edit Opinions
              </Button>
            </div>
          ) : (
            <div className="space-y-4">
              <div>
                <Label htmlFor="owner-rating" className="font-medium">
                  Owners (INEOS & Glazers)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Slider
                    id="owner-rating"
                    value={[ownerOpinion.rating]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values) => setOwnerOpinion({...ownerOpinion, rating: values[0]})}
                  />
                  <span className="font-bold">
                    {ownerOpinion.rating}/10 {renderRatingEmoji(ownerOpinion.rating)}
                  </span>
                </div>
                <Textarea
                  className="mt-2"
                  placeholder="Comments about the owners..."
                  value={ownerOpinion.comments}
                  onChange={(e) => setOwnerOpinion({...ownerOpinion, comments: e.target.value})}
                />
              </div>
              
              <div>
                <Label htmlFor="manager-rating" className="font-medium">
                  Manager (Erik ten Hag)
                </Label>
                <div className="flex items-center gap-2 mt-2">
                  <Slider
                    id="manager-rating"
                    value={[managerOpinion.rating]}
                    min={1}
                    max={10}
                    step={1}
                    onValueChange={(values) => setManagerOpinion({...managerOpinion, rating: values[0]})}
                  />
                  <span className="font-bold">
                    {managerOpinion.rating}/10 {renderRatingEmoji(managerOpinion.rating)}
                  </span>
                </div>
                <Textarea
                  className="mt-2"
                  placeholder="Comments about the manager..."
                  value={managerOpinion.comments}
                  onChange={(e) => setManagerOpinion({...managerOpinion, comments: e.target.value})}
                />
              </div>
              
              <div className="flex justify-end gap-2">
                <Button 
                  variant="outline" 
                  onClick={() => setIsEditing(false)}
                >
                  Cancel
                </Button>
                <Button 
                  onClick={handleSave}
                >
                  Save Opinions
                </Button>
              </div>
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default OpinionSection;
