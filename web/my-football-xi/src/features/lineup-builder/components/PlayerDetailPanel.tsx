
import React, { useState } from 'react';
import { Player } from '../types';

interface PlayerDetailPanelProps {
  player: Player;
  onClose: () => void;
  onUpdatePlayer: (updatedPlayer: Player) => void;
}

const PlayerDetailPanel: React.FC<PlayerDetailPanelProps> = ({
  player,
  onClose,
  onUpdatePlayer
}) => {
  const [rating, setRating] = useState<number>(player.rating || 0);
  const [notes, setNotes] = useState<string>('');
  const [status, setStatus] = useState<string>(player.status?.recommendation || 'keep');
  
  const handleSave = () => {
    const updatedPlayer = {
      ...player,
      rating,
      status: {
        ...player.status,
        recommendation: status
      }
    };
    onUpdatePlayer(updatedPlayer);
    onClose();
  };
  
  return (
    <div className="bg-white rounded-lg shadow p-4">
      <div className="flex justify-between items-start mb-4">
        <h2 className="text-xl font-bold">{player.name}</h2>
        <button 
          onClick={onClose}
          className="text-gray-500 hover:text-gray-700"
        >
          Close
        </button>
      </div>
      
      <div className="mb-4">
        <img 
          src={player.image} 
          alt={player.name}
          className="w-24 h-24 mx-auto rounded-full"
        />
      </div>
      
      <div className="grid grid-cols-2 gap-4 mb-4">
        <div>
          <span className="text-gray-500 text-sm">Position</span>
          <div>{player.position}</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Number</span>
          <div>{player.number}</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Nationality</span>
          <div>{player.nationality}</div>
        </div>
        <div>
          <span className="text-gray-500 text-sm">Salary</span>
          <div>{player.salary}</div>
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Your Rating</h3>
        <div className="flex gap-1">
          {[1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map((num) => (
            <button
              key={num}
              onClick={() => setRating(num)}
              className={`w-8 h-8 rounded flex items-center justify-center ${
                rating === num ? 'bg-united-red text-white' : 'bg-gray-100'
              }`}
            >
              {num}
            </button>
          ))}
        </div>
      </div>
      
      <div className="mb-4">
        <h3 className="font-medium mb-2">Player Status</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setStatus('keep')}
            className={`px-3 py-1 rounded text-sm ${
              status === 'keep' ? 'bg-green-600 text-white' : 'bg-gray-100'
            }`}
          >
            Keep
          </button>
          <button
            onClick={() => setStatus('sell')}
            className={`px-3 py-1 rounded text-sm ${
              status === 'sell' ? 'bg-red-600 text-white' : 'bg-gray-100'
            }`}
          >
            Sell
          </button>
          <button
            onClick={() => setStatus('loan')}
            className={`px-3 py-1 rounded text-sm ${
              status === 'loan' ? 'bg-blue-600 text-white' : 'bg-gray-100'
            }`}
          >
            Loan
          </button>
        </div>
      </div>
      
      <div className="mb-4">
        <label className="block mb-1 text-sm">Notes</label>
        <textarea
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
          className="w-full p-2 border rounded"
          rows={3}
        ></textarea>
      </div>
      
      <button
        onClick={handleSave}
        className="w-full py-2 bg-united-red text-white rounded hover:bg-red-700"
      >
        Save Changes
      </button>
    </div>
  );
};

export default PlayerDetailPanel;
