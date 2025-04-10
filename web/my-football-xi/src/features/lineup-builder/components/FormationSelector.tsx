
import React from 'react';
import { Formation } from '../types';

interface FormationSelectorProps {
  currentFormation: Formation;
  onFormationChange: (formation: Formation) => void;
}

const FormationSelector: React.FC<FormationSelectorProps> = ({
  currentFormation,
  onFormationChange
}) => {
  const formations: Formation[] = ["4-3-3", "4-4-2", "3-5-2", "4-2-3-1", "5-3-2", "3-4-3", "4-5-1", "4-1-4-1", "4-4-1-1", "3-6-1"];
  
  return (
    <div className="flex items-center gap-2">
      <span className="text-sm text-gray-700">Formation:</span>
      <select
        value={currentFormation}
        onChange={(e) => onFormationChange(e.target.value as Formation)}
        className="border rounded py-1 px-2 text-sm"
      >
        {formations.map(formation => (
          <option key={formation} value={formation}>
            {formation}
          </option>
        ))}
      </select>
    </div>
  );
};

export default FormationSelector;
