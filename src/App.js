import React, { useState, useEffect } from 'react';
import { Container, Typography, CircularProgress } from '@mui/material';
import Header from './components/Header';
import Footer from './components/Footer';
import SearchBar from './components/SearchBar';
import Filters from './components/Filters';
import JobList from './components/JobList';
import Pagination from './components/Pagination';
import axios from 'axios';
import './App.css';

const App = () => {
  const [jobs, setJobs] = useState([]);
  const [filteredJobs, setFilteredJobs] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState({
    location: '',
    jobType: '',
    company: '',
  });
  const [currentPage, setCurrentPage] = useState(1);
  const jobsPerPage = 5;
  const [loading, setLoading] = useState(true);

  // Local API URL
  const API_URL = 'http://localhost:5000/jobs'; // Update to local server URL

  useEffect(() => {
    // Fetch jobs from API
    axios
      .get(API_URL)
      .then((response) => {
        setJobs(response.data);
        setFilteredJobs(response.data);
        setLoading(false);
        console.log(response.data); // Log fetched jobs here
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);
  
  
  useEffect(() => {
    console.log("Current Search Term:", searchTerm);

    let tempJobs = jobs;
  
    // Search Filter
    if (searchTerm) {
      tempJobs = tempJobs.filter(
        (job) =>
          job.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
          job.company.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }
  
    // Location Filter
    if (filters.location) {
      tempJobs = tempJobs.filter((job) => job.location === filters.location);
    }
  
    // Job Type Filter
    if (filters.jobType) {
      tempJobs = tempJobs.filter((job) => job.type === filters.jobType);
    }
  
    // Company Filter
    if (filters.company) {
      tempJobs = tempJobs.filter((job) => job.company === filters.company);
    }
  
    setFilteredJobs(tempJobs);      // Update filtered jobs
    setCurrentPage(1);              // Reset to the first page on filter/search change
  }, [searchTerm, filters, jobs]);   // Dependencies: run whenever searchTerm, filters, or jobs change
  
  // Pagination Logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);
  const totalPages = Math.ceil(filteredJobs.length / jobsPerPage);

  // Extract filter options
  const locations = [...new Set(jobs.map((job) => job.location))];
  const jobTypes = [...new Set(jobs.map((job) => job.type))];
  const companies = [...new Set(jobs.map((job) => job.company))];

  return (
    <>
      <Header />
      <main>
      <Container sx={{ mt: 4, mb: 4 }}>
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <Filters
          filters={filters}
          setFilters={setFilters}
          locations={locations}
          jobTypes={jobTypes}
          companies={companies}
        />
        {loading ? (
          <CircularProgress />
        ) : filteredJobs.length > 0 ? (
          <>
            <JobList jobs={currentJobs} />
            {totalPages > 1 && (
              <Pagination totalPages={totalPages} currentPage={currentPage} setCurrentPage={setCurrentPage} />
            )}
          </>
        ) : (
          <Typography variant="h6">No jobs found.</Typography>
        )}
      </Container>
      </main>
      <Footer />
    </>
  );
};

export default App;
