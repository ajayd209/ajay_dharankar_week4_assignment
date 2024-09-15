import React, { useState, useEffect } from 'react';
import axios from 'axios';

const JobList = () => {
  const [jobs, setJobs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [locationFilter, setLocationFilter] = useState('');
  const [jobTypeFilter, setJobTypeFilter] = useState('');
  const [companyFilter, setCompanyFilter] = useState('');
  const [selectedJob, setSelectedJob] = useState(null); // To track which job the user selects
  const [applied, setApplied] = useState(false); // To show confirmation after applying
  const [currentPage, setCurrentPage] = useState(1); // For pagination
  const jobsPerPage = 5; // Number of jobs per page

  useEffect(() => {
    axios.get('http://localhost:5000/jobs')
      .then((response) => {
        setJobs(response.data);
        setLoading(false);
      })
      .catch((error) => {
        console.error('Error fetching jobs:', error);
        setLoading(false);
      });
  }, []);

  // Function to handle form submission
  const handleApply = (event) => {
    event.preventDefault();
    setApplied(true); // Set applied to true when form is submitted
  };

  // Filter jobs based on the filters set by the user
  const filteredJobs = jobs.filter((job) => {
    return (
      (locationFilter ? job.location === locationFilter : true) &&
      (jobTypeFilter ? job.jobType === jobTypeFilter : true) &&
      (companyFilter ? job.company === companyFilter : true)
    );
  });

  // Pagination logic
  const indexOfLastJob = currentPage * jobsPerPage;
  const indexOfFirstJob = indexOfLastJob - jobsPerPage;
  const currentJobs = filteredJobs.slice(indexOfFirstJob, indexOfLastJob);

  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  if (loading) {
    return <div>Loading jobs...</div>;
  }

  if (applied) {
    return <div>Application submitted successfully!</div>;
  }

  return (
    <div>
      <h1>Job Listings</h1>

      {/* Filters */}
      <div className="filters">
        <label>
          Location:
          <input
            type="text"
            value={locationFilter}
            onChange={(e) => setLocationFilter(e.target.value)}
            placeholder="Filter by location"
          />
        </label>
        <label>
          Job Type:
          <input
            type="text"
            value={jobTypeFilter}
            onChange={(e) => setJobTypeFilter(e.target.value)}
            placeholder="Filter by job type"
          />
        </label>
        <label>
          Company:
          <input
            type="text"
            value={companyFilter}
            onChange={(e) => setCompanyFilter(e.target.value)}
            placeholder="Filter by company"
          />
        </label>
      </div>

      {/* Job Listings */}
      {selectedJob ? (
        <div>
          <h2>Apply for {selectedJob.title}</h2>
          <form onSubmit={handleApply}>
            <label>
              Name:
              <input type="text" required />
            </label>
            <label>
              Email:
              <input type="email" required />
            </label>
            <button type="submit">Submit Application</button>
          </form>
        </div>
      ) : (
        <ul>
          {currentJobs.map((job) => (
            <li key={job.id}>
              <h2>{job.title}</h2>
              <p>{job.company} - {job.location}</p>
              <p>{job.description}</p>
              <button onClick={() => setSelectedJob(job)}>Apply Now</button>
            </li>
          ))}
        </ul>
      )}

      {/* Pagination */}
      <div className="pagination">
        {Array.from({ length: Math.ceil(filteredJobs.length / jobsPerPage) }).map((_, idx) => (
          <button key={idx} onClick={() => paginate(idx + 1)}>
            {idx + 1}
          </button>
        ))}
      </div>
    </div>
  );
};

export default JobList;
