import React from 'react';
import TimeZoneCard from './TimeZoneCard';
import { useTimeZones } from '../context/TimeZoneContext';

const TimeZoneList: React.FC = () => {
  const { selectedTimeZones, currentTimes } = useTimeZones();

  if (selectedTimeZones.length === 0) {
    return (
      <div className="text-center p-8 text-gray-500">
        <p>No time zones selected. Add one to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-4 p-4">
      {selectedTimeZones.map(timezone => (
        currentTimes[timezone.id] && (
          <TimeZoneCard 
            key={timezone.id} 
            timezone={timezone} 
            timeDisplay={currentTimes[timezone.id]} 
          />
        )
      ))}
    </div>
  );
};

export default TimeZoneList;