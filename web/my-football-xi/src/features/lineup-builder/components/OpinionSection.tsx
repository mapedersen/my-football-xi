
import React, { useState } from 'react';

interface OpinionSectionProps {
  ownerOpinion: { rating: number; comments: string };
  managerOpinion: { rating: number; comments: string };
  onSaveOpinions: (ownerOpinion: any, managerOpinion: any) => void;
}

const OpinionSection: React.FC<OpinionSectionProps> = ({
  ownerOpinion,
  managerOpinion,
  onSaveOpinions
}) => {
  const [editMode, setEditMode] = useState(false);
  const [newOwnerOpinion, setNewOwnerOpinion] = useState(ownerOpinion);
  const [newManagerOpinion, setNewManagerOpinion] = useState(managerOpinion);
  
  const handleSave = () => {
    onSaveOpinions(newOwnerOpinion, newManagerOpinion);
    setEditMode(false);
  };
  
  if (editMode) {
    return (
      <div className="bg-white rounded-lg shadow p-4">
        <h2 className="text-xl font-bold mb-3">Your Opinions</h2>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">Owner View</h3>
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={newOwnerOpinion.rating} 
              onChange={(e) => setNewOwnerOpinion({...newOwnerOpinion, rating: Number(e.target.value)})}
              className="border rounded p-1 w-16"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Comments</label>
            <textarea
              value={newOwnerOpinion.comments}
              onChange={(e) => setNewOwnerOpinion({...newOwnerOpinion, comments: e.target.value})}
              className="w-full border rounded p-2 text-sm"
              rows={2}
            ></textarea>
          </div>
        </div>
        
        <div className="mb-4">
          <h3 className="font-medium mb-1">Manager View</h3>
          <div className="mb-2">
            <label className="block text-sm text-gray-600 mb-1">Rating (1-10)</label>
            <input 
              type="number" 
              min="1" 
              max="10" 
              value={newManagerOpinion.rating} 
              onChange={(e) => setNewManagerOpinion({...newManagerOpinion, rating: Number(e.target.value)})}
              className="border rounded p-1 w-16"
            />
          </div>
          <div>
            <label className="block text-sm text-gray-600 mb-1">Comments</label>
            <textarea
              value={newManagerOpinion.comments}
              onChange={(e) => setNewManagerOpinion({...newManagerOpinion, comments: e.target.value})}
              className="w-full border rounded p-2 text-sm"
              rows={2}
            ></textarea>
          </div>
        </div>
        
        <button 
          onClick={handleSave}
          className="w-full py-2 bg-united-red text-white rounded hover:bg-red-700"
        >
          Save Opinions
        </button>
      </div>
    );
  }
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-center mb-3">
        <h2 className="text-xl font-bold">Your Opinions</h2>
        <button 
          onClick={() => setEditMode(true)}
          className="text-sm text-united-red hover:text-red-700"
        >
          Edit
        </button>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-1">Owner View</h3>
        <div className="flex items-center mb-1">
          <span className="text-lg font-bold">{ownerOpinion.rating}/10</span>
          <span className="text-sm text-gray-500 ml-2">Overall rating</span>
        </div>
        <p className="text-sm">
          {ownerOpinion.comments || "No comments added yet."}
        </p>
      </div>
      
      <div>
        <h3 className="font-medium mb-1">Manager View</h3>
        <div className="flex items-center mb-1">
          <span className="text-lg font-bold">{managerOpinion.rating}/10</span>
          <span className="text-sm text-gray-500 ml-2">Overall rating</span>
        </div>
        <p className="text-sm">
          {managerOpinion.comments || "No comments added yet."}
        </p>
      </div>
    </div>
  );
};

export default OpinionSection;
