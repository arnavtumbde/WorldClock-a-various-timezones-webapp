import { TimeZone, TimeDisplay } from '../types';

export const getCurrentTimeInZone = (timezone: TimeZone): TimeDisplay => {
  const now = new Date();
  const utcTime = now.getTime() + now.getTimezoneOffset() * 60000;
  const localTime = new Date(utcTime + timezone.offset * 3600000);
  
  // Determine if it's day or night based on hour
  const hour = localTime.getHours();
  const isDay = hour >= 6 && hour < 18;
  
  return {
    id: timezone.id,
    time: localTime,
    isDay
  };
};

export const getTimeZoneTime = (timezone: TimeZone): string => {
  const timeDisplay = getCurrentTimeInZone(timezone);
  return formatTime(timeDisplay.time);
};

export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString([], { 
    hour: '2-digit', 
    minute: '2-digit', 
    second: '2-digit',
    hour12: true 
  });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString([], { 
    weekday: 'short', 
    month: 'short', 
    day: 'numeric' 
  });
};

export const calculateTimeDifference = (time1: Date, time2: Date): string => {
  const diffMs = time1.getTime() - time2.getTime();
  const diffHrs = Math.floor(diffMs / (1000 * 60 * 60));
  const diffMins = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
  
  if (diffHrs === 0) {
    return `${diffMins} min${Math.abs(diffMins) !== 1 ? 's' : ''}`;
  }
  
  if (diffMins === 0) {
    return `${diffHrs} hour${Math.abs(diffHrs) !== 1 ? 's' : ''}`;
  }
  
  return `${diffHrs} hour${Math.abs(diffHrs) !== 1 ? 's' : ''} ${Math.abs(diffMins)} min${Math.abs(diffMins) !== 1 ? 's' : ''}`;
};

export const getDaytimeGradient = (hour: number): string => {
  // Early morning (5-8)
  if (hour >= 5 && hour < 8) {
    return 'bg-gradient-to-br from-blue-300 to-orange-200';
  }
  // Day (8-16)
  else if (hour >= 8 && hour < 16) {
    return 'bg-gradient-to-br from-blue-400 to-blue-200';
  }
  // Evening (16-20)
  else if (hour >= 16 && hour < 20) {
    return 'bg-gradient-to-br from-orange-400 to-purple-300';
  }
  // Night (20-5)
  else {
    return 'bg-gradient-to-br from-blue-900 to-indigo-800';
  }
};

export const getTextColorForTime = (hour: number): string => {
  // Use white text for dark backgrounds (night)
  if ((hour >= 20 && hour <= 23) || (hour >= 0 && hour < 5)) {
    return 'text-white';
  }
  // Use dark text for light backgrounds (day)
  return 'text-gray-800';
};