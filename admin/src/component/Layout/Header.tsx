import React from 'react';
import NavLinks from '../NavLinks';

const Header: React.FC = () => {

  return (
    <header className="bg-gray-800 text-white px-4 py-2">
      <NavLinks />
    </header>
  );
};

export default Header;

