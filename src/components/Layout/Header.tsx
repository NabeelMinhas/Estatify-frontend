import React from 'react';

interface HeaderProps {
  title?: string;
}

const Header: React.FC<HeaderProps> = ({ title = 'Real Estate Dashboard' }) => {
  return (
    <header className="bg-white shadow border-b border-gray-200">
      <div className="container">
        <div className="flex-between p-4">
          <h1 className="text-2xl font-bold text-gray-900">{title}</h1>
          <nav>
            {/* Navigation items will be added later */}
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;
