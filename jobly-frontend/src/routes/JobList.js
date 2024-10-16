import React, { useState, useEffect } from 'react';
import JoblyApi from '../api';
import JobCard from '../Components/JobCard';

function JobList() {
  const [jobs, setJobs] = useState([]);
  const [applications, setApplications] = useState(new Set());

  // Fetch the jobs when the component mounts
  useEffect(() => {
    async function fetchJobs() {
      const jobs = await JoblyApi.getJobs();
      setJobs(jobs);
    }
    fetchJobs();
  }, []);

  // Handle job application
  async function applyToJob(id) {
    await JoblyApi.applyToJob(id);
    setApplications(apps => new Set(apps.add(id)));
  }

  return (
    <div>
      <h1>Job Listings</h1>
      {jobs.map(job => (
        <JobCard 
          key={job.id} 
          job={job} 
          hasApplied={applications.has(job.id)} 
          applyToJob={applyToJob} 
        />
      ))}
    </div>
  );
}

export default JobList;
