import React, { useState, useRef, useEffect } from 'react';
import { Search, PlusCircle } from 'lucide-react';
import { useTimeZones } from '../context/TimeZoneContext';
import { TimeZone } from '../types';

const SearchBar: React.FC = () => {
  const { searchTimeZones, addTimeZone, selectedTimeZones } = useTimeZones();
  const [query, setQuery] = useState('');
  const [results, setResults] = useState<TimeZone[]>([]);
  const [isOpen, setIsOpen] = useState(false);
  const searchRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (query.length >= 2) {
      const searchResults = searchTimeZones(query);
      setResults(searchResults);
      setIsOpen(true);
    } else {
      setResults([]);
      setIsOpen(false);
    }
  }, [query, searchTimeZones]);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchRef.current && !searchRef.current.contains(event.target as Node)) {
        setIsOpen(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleAddTimeZone = (timezone: TimeZone) => {
    addTimeZone(timezone);
    setQuery('');
    setIsOpen(false);
  };

  const isAlreadyAdded = (id: string) => {
    return selectedTimeZones.some(tz => tz.id === id);
  };

  return (
    <div className="relative w-full max-w-md mx-auto" ref={searchRef}>
      <div className="relative">
        <input
          type="text"
          placeholder="Search for a city or country..."
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onFocus={() => query.length >= 2 && setIsOpen(true)}
          className="w-full px-4 py-2 pl-10 pr-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-indigo-500"
        />
        <Search className="absolute left-3 top-2.5 h-5 w-5 text-gray-400" />
      </div>
      
      {isOpen && results.length > 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg max-h-60 overflow-y-auto">
          {results.map(timezone => (
            <div 
              key={timezone.id}
              className="flex items-center justify-between px-4 py-2 hover:bg-gray-100 cursor-pointer"
            >
              <div>
                <div className="font-medium">{timezone.city}</div>
                <div className="text-sm text-gray-500">{timezone.country} (GMT{timezone.offset >= 0 ? '+' : ''}{timezone.offset})</div>
              </div>
              <button
                onClick={() => handleAddTimeZone(timezone)}
                disabled={isAlreadyAdded(timezone.id)}
                className={`p-1 rounded-full ${
                  isAlreadyAdded(timezone.id) 
                    ? 'text-gray-400 cursor-not-allowed' 
                    : 'text-indigo-600 hover:bg-indigo-100'
                }`}
              >
                <PlusCircle size={20} />
              </button>
            </div>
          ))}
        </div>
      )}
      
      {isOpen && query.length >= 2 && results.length === 0 && (
        <div className="absolute z-10 w-full mt-1 bg-white border border-gray-300 rounded-lg shadow-lg p-4 text-center text-gray-500">
          No locations found matching "{query}"
        </div>
      )}
    </div>
  );
};

export default SearchBar;