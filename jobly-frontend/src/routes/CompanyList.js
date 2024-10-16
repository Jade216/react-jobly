import React from "react";
import { Link } from "react-router-dom";

function CompanyList({ companies }) {
  return (
    <div>
      <h1>Companies</h1>
      {companies.map(c => (
        <div key={c.handle}>
          <Link to={`/companies/${c.handle}`}>
            {c.name}
          </Link>
        </div>
      ))}
    </div>
  );
}

export default CompanyList;
