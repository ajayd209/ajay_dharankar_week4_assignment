// import React from 'react';
// import { TextField } from '@mui/material';

// const SearchBar = ({ searchTerm, setSearchTerm }) => {
//   const handleSearchChange = (event) => {
//     setSearchTerm(event.target.value);
//     console.log(event.target.value); // Log search term here
//   };

//   return (
//     <TextField
//       label="Search Jobs"
//       variant="outlined"
//       value={searchTerm}
//       onChange={handleSearchChange}
//       fullWidth
//     />
//   );
// };

// export default SearchBar;

import React, { useState } from 'react';
import { TextField, Button } from '@mui/material';

const SearchBar = ({ setSearchTerm }) => {
  const [searchInput, setSearchInput] = useState('');

  const handleSearch = () => {
    console.log("Search Term:", searchInput); // Check if the search term is being updated
    setSearchTerm(searchInput); // This should update the state in App.js
  };
  

  return (
    <div style={{ display: 'flex', gap: '10px' }}>
      <TextField
        label="Search Jobs"
        variant="outlined"
        value={searchInput}
        onChange={(e) => setSearchInput(e.target.value)}
        fullWidth
      />
      <Button variant="contained" color="primary" onClick={handleSearch}>
        Search
      </Button>
    </div>
  );
};

export default SearchBar;
