import React, { useState } from 'react';
import { Sun, Moon, Clock, X, Info } from 'lucide-react';
import { TimeZone, TimeDisplay } from '../types';
import { formatTime, formatDate, getDaytimeGradient, getTextColorForTime } from '../utils/timeZoneUtils';
import { useTimeZones } from '../context/TimeZoneContext';

interface TimeZoneCardProps {
  timezone: TimeZone;
  timeDisplay: TimeDisplay;
}

const TimeZoneCard: React.FC<TimeZoneCardProps> = ({ timezone, timeDisplay }) => {
  const { removeTimeZone } = useTimeZones();
  const [showInfo, setShowInfo] = useState(false);
  
  const hour = timeDisplay.time.getHours();
  const gradientClass = getDaytimeGradient(hour);
  const textColorClass = getTextColorForTime(hour);
  
  const handleRemove = (e: React.MouseEvent) => {
    e.stopPropagation();
    removeTimeZone(timezone.id);
  };
  
  const toggleInfo = (e: React.MouseEvent) => {
    e.stopPropagation();
    setShowInfo(!showInfo);
  };

  return (
    <div 
      className={`relative rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-xl ${gradientClass} ${showInfo ? 'h-44' : 'h-32'}`}
    >
      <div className={`p-4 h-full flex flex-col justify-between ${textColorClass}`}>
        <div className="flex justify-between items-start">
          <div>
            <h2 className="text-xl font-bold">{timezone.city}</h2>
            <p className={`text-sm ${textColorClass} opacity-90`}>{timezone.country}</p>
          </div>
          <div className="flex space-x-1">
            <button 
              onClick={toggleInfo}
              className={`p-1 rounded-full ${textColorClass} opacity-70 hover:opacity-100 transition-opacity`}
            >
              <Info size={16} />
            </button>
            <button 
              onClick={handleRemove}
              className={`p-1 rounded-full ${textColorClass} opacity-70 hover:opacity-100 transition-opacity`}
            >
              <X size={16} />
            </button>
          </div>
        </div>
        
        <div className="flex items-center justify-between mt-2">
          <div className={`text-3xl font-bold ${textColorClass}`}>
            {formatTime(timeDisplay.time)}
          </div>
          <div className={`${textColorClass} opacity-90 flex items-center`}>
            {timeDisplay.isDay ? 
              <Sun className="h-5 w-5 mr-1" /> : 
              <Moon className="h-5 w-5 mr-1" />
            }
            {formatDate(timeDisplay.time)}
          </div>
        </div>
        
        {showInfo && (
          <div className={`mt-2 text-sm ${textColorClass}`}>
            <p>GMT{timezone.offset >= 0 ? '+' : ''}{timezone.offset}</p>
            <p>Coordinates: {timezone.latitude.toFixed(2)}, {timezone.longitude.toFixed(2)}</p>
          </div>
        )}
      </div>
      
      <div className="absolute bottom-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-white to-transparent opacity-20"></div>
    </div>
  );
};

export default TimeZoneCard;