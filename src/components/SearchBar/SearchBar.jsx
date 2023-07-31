import React, { useState } from 'react';
import './SearchBar.css';

const SearchBar = ({ onSearch }) => {
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  const handleSearchSubmit = (event) => {
    event.preventDefault();
    onSearch(searchTerm);
  };

  return (
	  <form className='tabs__search' onSubmit={handleSearchSubmit}>
         <input 
			className="tabs__text tabs__text_active" 
			type="text" 
			placeholder=""
			value={searchTerm}
         onChange={handleSearchChange}/>
         <button type='submit' className="tabs__button"></button>
     </form>
 );
};

export default SearchBar;