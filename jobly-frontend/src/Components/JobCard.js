import React from 'react';

function JobCard({ job, hasApplied, applyToJob }) {
  return (
    <div className="job-card">
      <h3>{job.title}</h3>
      <p>Salary: {job.salary || "N/A"}</p>
      <p>Equity: {job.equity || "N/A"}</p>
      <button 
        onClick={() => applyToJob(job.id)} 
        disabled={hasApplied}
      >
        {hasApplied ? "Applied" : "Apply"}
      </button>
    </div>
  );
}

export default JobCard;
