import React, { useState } from 'react';
import { ArrowRight } from 'lucide-react';
import { useTimeZones } from '../context/TimeZoneContext';

const TimeDifferenceCalculator: React.FC = () => {
  const { selectedTimeZones, getTimeDifference } = useTimeZones();
  const [from, setFrom] = useState('');
  const [to, setTo] = useState('');
  
  if (selectedTimeZones.length < 2) {
    return null;
  }
  
  const difference = from && to ? getTimeDifference(from, to) : '';
  
  return (
    <div className="bg-white rounded-lg shadow p-4 m-4">
      <h2 className="text-lg font-semibold mb-2">Time Difference Calculator</h2>
      <div className="flex flex-col sm:flex-row items-center gap-2">
        <select 
          value={from}
          onChange={(e) => setFrom(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg flex-1"
        >
          <option value="">Select location</option>
          {selectedTimeZones.map(tz => (
            <option key={tz.id} value={tz.id}>
              {tz.city}, {tz.country}
            </option>
          ))}
        </select>
        
        <div className="flex items-center justify-center">
          <ArrowRight className="h-5 w-5 text-gray-500" />
        </div>
        
        <select 
          value={to}
          onChange={(e) => setTo(e.target.value)}
          className="p-2 border border-gray-300 rounded-lg flex-1"
        >
          <option value="">Select location</option>
          {selectedTimeZones.map(tz => (
            <option key={tz.id} value={tz.id}>
              {tz.city}, {tz.country}
            </option>
          ))}
        </select>
      </div>
      
      {difference && (
        <div className="mt-3 text-center">
          <p className="text-indigo-600 font-medium">
            Time difference: {difference}
          </p>
        </div>
      )}
    </div>
  );
};

export default TimeDifferenceCalculator;