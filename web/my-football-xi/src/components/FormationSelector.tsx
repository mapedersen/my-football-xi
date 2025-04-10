
import React from "react";
import { Button } from "@/components/ui/button";
import { 
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue
} from "@/components/ui/select";
import { Formation } from "../models/Player";
import { Grid3X3, GridIcon } from "lucide-react";

interface FormationSelectorProps {
  currentFormation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const FormationSelector: React.FC<FormationSelectorProps> = ({
  currentFormation,
  onFormationChange,
}) => {
  // List of all available formations
  const formations: Formation[] = [
    "4-3-3", 
    "4-4-2", 
    "3-5-2", 
    "4-2-3-1", 
    "5-3-2", 
    "3-4-3", 
    "4-5-1", 
    "4-1-4-1",
    "4-4-1-1",
    "3-6-1"
  ];

  // Group formations by category for the dropdown
  const popularFormations: Formation[] = ["4-3-3", "4-4-2", "4-2-3-1", "3-5-2"];
  const alternativeFormations: Formation[] = formations.filter(
    f => !popularFormations.includes(f)
  );

  return (
    <div className="flex items-center gap-2">
      <span className="text-sm font-medium hidden sm:inline">Formation:</span>
      
      {/* Quick buttons for popular formations on desktop */}
      <div className="hidden md:flex gap-1">
        {popularFormations.map((formation) => (
          <Button
            key={formation}
            size="sm"
            variant={currentFormation === formation ? "default" : "outline"}
            onClick={() => onFormationChange(formation)}
            className="px-2 py-1 h-auto"
          >
            {formation}
          </Button>
        ))}
      </div>
      
      {/* Dropdown for all formations (mobile and desktop) */}
      <Select
        value={currentFormation}
        onValueChange={(value) => onFormationChange(value as Formation)}
      >
        <SelectTrigger className="w-24 h-8 md:hidden">
          <GridIcon className="mr-1 h-4 w-4" />
          <SelectValue placeholder="Formation" />
        </SelectTrigger>
        <SelectTrigger className="w-40 h-8 hidden md:flex">
          <Grid3X3 className="mr-1 h-4 w-4" />
          <SelectValue placeholder="More Formations" />
        </SelectTrigger>
        <SelectContent>
          <SelectItem value="4-3-3">4-3-3</SelectItem>
          <SelectItem value="4-4-2">4-4-2</SelectItem>
          <SelectItem value="3-5-2">3-5-2</SelectItem>
          <SelectItem value="4-2-3-1">4-2-3-1</SelectItem>
          <SelectItem value="5-3-2">5-3-2</SelectItem>
          <SelectItem value="3-4-3">3-4-3</SelectItem>
          <SelectItem value="4-5-1">4-5-1</SelectItem>
          <SelectItem value="4-1-4-1">4-1-4-1</SelectItem>
          <SelectItem value="4-4-1-1">4-4-1-1</SelectItem>
          <SelectItem value="3-6-1">3-6-1</SelectItem>
        </SelectContent>
      </Select>
    </div>
  );
};

export default FormationSelector;
