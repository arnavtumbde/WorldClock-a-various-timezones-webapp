import React, { createContext, useState, useEffect, useContext } from 'react';
import { TimeZone, TimeZoneContextType, TimeDisplay } from '../types';
import { timeZonesData } from '../data/timeZones';
import { getCurrentTimeInZone, calculateTimeDifference } from '../utils/timeZoneUtils';

const TimeZoneContext = createContext<TimeZoneContextType | undefined>(undefined);

export const useTimeZones = () => {
  const context = useContext(TimeZoneContext);
  if (!context) {
    throw new Error('useTimeZones must be used within a TimeZoneProvider');
  }
  return context;
};

export const TimeZoneProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [timeZones] = useState<TimeZone[]>(timeZonesData);
  const [selectedTimeZones, setSelectedTimeZones] = useState<TimeZone[]>(() => {
    const saved = localStorage.getItem('selectedTimeZones');
    if (saved) {
      try {
        const parsed = JSON.parse(saved);
        // Validate the saved data
        if (Array.isArray(parsed) && parsed.every(item => 
          typeof item === 'object' && item !== null && 'id' in item)) {
          return parsed;
        }
      } catch (e) {
        console.error('Failed to parse saved time zones', e);
      }
    }
    // Default time zones: User's local, New York, London, Tokyo
    return [
      timeZonesData.find(tz => tz.id === 'new-york') as TimeZone,
      timeZonesData.find(tz => tz.id === 'london') as TimeZone,
      timeZonesData.find(tz => tz.id === 'tokyo') as TimeZone,
    ];
  });
  
  const [currentTimes, setCurrentTimes] = useState<Record<string, TimeDisplay>>({});

  useEffect(() => {
    // Save selected time zones to localStorage
    localStorage.setItem('selectedTimeZones', JSON.stringify(selectedTimeZones));
  }, [selectedTimeZones]);

  useEffect(() => {
    // Update the time every second
    const updateAllTimes = () => {
      const times: Record<string, TimeDisplay> = {};
      selectedTimeZones.forEach(tz => {
        times[tz.id] = getCurrentTimeInZone(tz);
      });
      setCurrentTimes(times);
    };

    updateAllTimes(); // Initial update
    const interval = setInterval(updateAllTimes, 1000);

    return () => clearInterval(interval);
  }, [selectedTimeZones]);

  const addTimeZone = (timezone: TimeZone) => {
    if (!selectedTimeZones.some(tz => tz.id === timezone.id)) {
      setSelectedTimeZones(prev => [...prev, timezone]);
    }
  };

  const removeTimeZone = (id: string) => {
    setSelectedTimeZones(prev => prev.filter(tz => tz.id !== id));
  };

  const searchTimeZones = (query: string): TimeZone[] => {
    if (!query) return [];
    const lowerQuery = query.toLowerCase();
    return timeZones.filter(
      tz => 
        tz.city.toLowerCase().includes(lowerQuery) || 
        tz.country.toLowerCase().includes(lowerQuery)
    );
  };

  const getTimeDifference = (timezone1: string, timezone2: string): string => {
    const time1 = currentTimes[timezone1]?.time;
    const time2 = currentTimes[timezone2]?.time;
    
    if (!time1 || !time2) return '';
    
    return calculateTimeDifference(time1, time2);
  };

  const value: TimeZoneContextType = {
    timeZones,
    selectedTimeZones,
    currentTimes,
    addTimeZone,
    removeTimeZone,
    searchTimeZones,
    getTimeDifference
  };

  return (
    <TimeZoneContext.Provider value={value}>
      {children}
    </TimeZoneContext.Provider>
  );
};