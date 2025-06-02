export interface TimeZone {
  id: string;
  city: string;
  country: string;
  timezone: string;
  offset: number;
  latitude: number;
  longitude: number;
}

export interface TimeDisplay {
  id: string;
  time: Date;
  isDay: boolean;
}

export type TimeZoneContextType = {
  timeZones: TimeZone[];
  selectedTimeZones: TimeZone[];
  currentTimes: Record<string, TimeDisplay>;
  addTimeZone: (timezone: TimeZone) => void;
  removeTimeZone: (id: string) => void;
  searchTimeZones: (query: string) => TimeZone[];
  getTimeDifference: (timezone1: string, timezone2: string) => string;
};