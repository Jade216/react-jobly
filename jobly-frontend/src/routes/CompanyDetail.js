import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import JoblyApi from "../api";
import JobCard from "../Components/JobCard"; // If you are reusing JobCard from JobList

function CompanyDetail() {
  const { handle } = useParams();  // Get company handle from the route
  const [company, setCompany] = useState(null);

  useEffect(() => {
    async function fetchCompany() {
      const fetchedCompany = await JoblyApi.getCompany(handle);
      setCompany(fetchedCompany);
    }
    fetchCompany();
  }, [handle]);

  if (!company) return <p>Loading...</p>;

  return (
    <div>
      <h1>{company.name}</h1>
      <p>{company.description}</p>
      {company.jobs.map(job => (
        <JobCard key={job.id} job={job} hasApplied={false} applyToJob={() => {}} />  // Adjust accordingly
      ))}
    </div>
  );
}

export default CompanyDetail;
