import React from 'react';
import { FormControl, InputLabel, Select, MenuItem, Box } from '@mui/material';

const Filters = ({ filters, setFilters, locations, jobTypes, companies }) => {
  return (
    <Box sx={{ display: 'flex', gap: 2, mb: 2 }}>
      <FormControl fullWidth>
        <InputLabel>Location</InputLabel>
        <Select
          value={filters.location}
          label="Location"
          onChange={(e) => setFilters({ ...filters, location: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {locations.map((loc) => (
            <MenuItem key={loc} value={loc}>
              {loc}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Job Type</InputLabel>
        <Select
          value={filters.jobType}
          label="Job Type"
          onChange={(e) => setFilters({ ...filters, jobType: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {jobTypes.map((type) => (
            <MenuItem key={type} value={type}>
              {type}
            </MenuItem>
          ))}
        </Select>
      </FormControl>

      <FormControl fullWidth>
        <InputLabel>Company</InputLabel>
        <Select
          value={filters.company}
          label="Company"
          onChange={(e) => setFilters({ ...filters, company: e.target.value })}
        >
          <MenuItem value="">All</MenuItem>
          {companies.map((comp) => (
            <MenuItem key={comp} value={comp}>
              {comp}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default Filters;
