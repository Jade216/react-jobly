import React, { useEffect, useState } from "react";
import JoblyApi from "../api";

function HomePage() {
  const [jobs, setJobs] = useState([]);

  useEffect(() => {
    async function getJobs() {
      try {
        let jobs = await JoblyApi.getJobs();
        setJobs(jobs);
      } catch (err) {
        console.error("Error fetching jobs:", err);
      }
    }
    getJobs();
  }, []);

  return (
    <div>
      <h1>Welcome to Jobly</h1>
      <p>Your one-stop job search application.</p>
      <div>
        <h2>Available Jobs</h2>
        {jobs.length > 0 ? (
          <ul>
            {jobs.map(job => (
              <li key={job.id}>
                <h3>{job.title}</h3>
                <p>Company: {job.companyName}</p>
                <p>Salary: {job.salary ? `$${job.salary}` : "N/A"}</p>
                <p>Equity: {job.equity ? job.equity : "N/A"}</p>
              </li>
            ))}
          </ul>
        ) : (
          <p>Loading jobs...</p>
        )}
      </div>
    </div>
  );
}

export default HomePage;
