import React from 'react';
import { Clock } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between p-4 bg-white shadow-sm">
      <div className="flex items-center gap-2">
        <Clock className="h-6 w-6 text-indigo-600" />
        <h1 className="text-2xl font-semibold text-gray-800">WorldClock</h1>
      </div>
      <div className="text-sm text-gray-500">
        Local time: {new Date().toLocaleTimeString()}
      </div>
    </header>
  );
};

export default Header;