import React from 'react';
import { Pagination as MuiPagination, Box } from '@mui/material';

const Pagination = ({ totalPages, currentPage, setCurrentPage }) => {
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'center', mt: 4 }}>
      <MuiPagination count={totalPages} page={currentPage} onChange={handleChange} color="primary" />
    </Box>
  );
};

export default Pagination;
