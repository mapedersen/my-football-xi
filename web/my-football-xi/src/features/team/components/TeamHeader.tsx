
import React from 'react';
import { NavLink } from 'react-router-dom';
import { ChevronRight, Users, User, PieChart, Shirt, MessageSquare } from 'lucide-react';

interface TeamHeaderProps {
  teamInfo: {
    name: string;
    shortName: string;
    primaryColor: string;
    logoClass: string;
  };
  currentView: string;
}

const TeamHeader: React.FC<TeamHeaderProps> = ({ teamInfo, currentView }) => {
  return (
    <header className="bg-white border-b shadow-sm">
      <div className="container mx-auto px-4 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-2">
            <div className={`w-10 h-10 ${teamInfo.logoClass} rounded flex items-center justify-center text-white font-bold`}>
              {teamInfo.shortName[0]}
            </div>
            <h1 className={`text-xl font-bold ${teamInfo.primaryColor}`}>{teamInfo.name}</h1>
          </div>
          
          <div className="flex items-center gap-1 text-xs text-gray-500">
            <span>Team</span>
            <ChevronRight className="h-3 w-3" />
            <span className="font-medium text-black">{teamInfo.name}</span>
          </div>
        </div>
        
        <nav className="mt-4">
          <ul className="flex flex-wrap gap-1 sm:gap-3">
            <li>
              <NavLink 
                to={`/team/${teamInfo.name.toLowerCase().replace(/\s+/g, '-')}`}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                    currentView === 'pitch' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <Shirt className="h-4 w-4" />
                <span className="hidden sm:inline">Pitch View</span>
                <span className="sm:hidden">Pitch</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to={`/team/${teamInfo.name.toLowerCase().replace(/\s+/g, '-')}/squad`}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                    currentView === 'squad' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <Users className="h-4 w-4" />
                <span className="hidden sm:inline">Squad Analysis</span>
                <span className="sm:hidden">Squad</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to={`/team/${teamInfo.name.toLowerCase().replace(/\s+/g, '-')}/transfer-hub`}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                    currentView === 'transfers' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <PieChart className="h-4 w-4" />
                <span className="hidden sm:inline">Transfer Hub</span>
                <span className="sm:hidden">Transfers</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to={`/team/${teamInfo.name.toLowerCase().replace(/\s+/g, '-')}/management`}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                    currentView === 'management' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <User className="h-4 w-4" />
                <span className="hidden sm:inline">Management</span>
                <span className="sm:hidden">Manage</span>
              </NavLink>
            </li>
            
            <li>
              <NavLink 
                to={`/team/${teamInfo.name.toLowerCase().replace(/\s+/g, '-')}/fan-pulse`}
                className={({ isActive }) => 
                  `px-3 py-2 rounded-md text-sm font-medium flex items-center gap-1 ${
                    currentView === 'fan-pulse' 
                      ? 'bg-gray-100 text-gray-900' 
                      : 'text-gray-600 hover:text-gray-900 hover:bg-gray-50'
                  }`
                }
              >
                <MessageSquare className="h-4 w-4" />
                <span className="hidden sm:inline">Fan Pulse</span>
                <span className="sm:hidden">Fans</span>
              </NavLink>
            </li>
          </ul>
        </nav>
      </div>
    </header>
  );
};

export default TeamHeader;
