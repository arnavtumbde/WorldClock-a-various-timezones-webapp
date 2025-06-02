import React from 'react';
import Header from './components/Header';
import TimeZoneList from './components/TimeZoneList';
import SearchBar from './components/SearchBar';
import TimeDifferenceCalculator from './components/TimeDifferenceCalculator';
import { TimeZoneProvider } from './context/TimeZoneContext';

function App() {
  return (
    <TimeZoneProvider>
      <div className="min-h-screen bg-gray-100 flex flex-col">
        <Header />
        
        <main className="flex-1">
          <div className="max-w-7xl mx-auto py-6 px-4">
            <div className="mb-6">
              <SearchBar />
            </div>
            
            <TimeZoneList />
            
            <TimeDifferenceCalculator />
          </div>
        </main>
        
        <footer className="bg-white p-4 shadow-inner mt-auto">
          <div className="max-w-7xl mx-auto text-center text-sm text-gray-500">
            <p>WorldClock - Track time zones around the world</p>
          </div>
        </footer>
      </div>
    </TimeZoneProvider>
  );
}

export default App;