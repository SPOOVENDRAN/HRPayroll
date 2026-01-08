import { useState } from "react";
import { useNavigate } from "react-router-dom";

import './Employees.css';

const Employees = ({
  employees = [],
  page = 0,
  totalPages = 1,
  onPrev,
  onNext
}) => 
{
  const navigate = useNavigate();

  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

 
  const filtered = employees.filter(e =>
    e.name?.toLowerCase().includes(search.toLowerCase()) ||
    e.role?.toLowerCase().includes(search.toLowerCase()) ||
    e.department?.toLowerCase().includes(search.toLowerCase()) ||
    e.id?.toString().includes(search)
  );

  const sorted = [...filtered].sort((a, b) => {
    const aValue = a[sortBy];
    const bValue = b[sortBy];
    
    if (sortOrder === "asc") {
      return aValue > bValue ? 1 : -1;
    } else {
      return aValue < bValue ? 1 : -1;
    }
  });

  const handleSort = (column) => {
    if (sortBy === column) {
      setSortOrder(sortOrder === "asc" ? "desc" : "asc");
    } else {
      setSortBy(column);
      setSortOrder("asc");
    }
  };

  const getStatusBadge = (status) => {
  switch ((status || "").toUpperCase()) {
    case "ACTIVE":
      return <span className="badge status-active">Active</span>;
    case "ON_LEAVE":
      return <span className="badge status-leave">On Leave</span>;
    case "REMOTE":
      return <span className="badge status-remote">Remote</span>;
    default:
      return <span className="badge">Unknown</span>;
  }
};


 const formatJoinDate = (dateString) => {
  if (!dateString) return "-";

  // expects DD/MM/YYYY
  const [day, month, year] = dateString.split("/");
  const date = new Date(`${year}-${month}-${day}`);

  return isNaN(date)
    ? "-"
    : date.toLocaleDateString("en-GB");
};

  return (
    <div className="employees-container">
      <div className="employees-header">
        <h2>Employee Management</h2>
        <div className="header-stats">
          <div className="stat-card">
            <span className="stat-number">{employees.length}</span>
            <span className="stat-label">Total Employees</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{(employees.filter(e => e.status == "ACTIVE").length)}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{employees.filter(e => e.role === "Software Engineer").length}</span>
            <span className="stat-label">IT Department</span>
          </div>
        </div>
      </div>

      <div className="employees-content">
        <div className="search-section">
          <div className="search-box">
            
            <input
              className="search-input"
              placeholder="Search employees by name, role, department, or ID..."
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
            {search && (
              <button className="clear-search" onClick={() => setSearch("")}>
                Clear
              </button>
            )}
          </div>
          
          <div className="sort-options">
            <span className="sort-label">Sort by:</span>
            <select 
              className="sort-select"
              value={sortBy}
              onChange={(e) => setSortBy(e.target.value)}
            >
              <option value="id">ID</option>
              <option value="name">Name</option>
              <option value="department">Department</option>
              <option value="role">Role</option>
              <option value="joinDate">Join Date</option>
            </select>
            <button 
              className="sort-order-btn"
              onClick={() => setSortOrder(sortOrder === "asc" ? "desc" : "asc")}
            >
              {sortOrder === "asc" ? "↑ Asc" : "↓ Desc"}
            </button>
          </div>
        </div>

        <div className="table-container">
          <table className="employees-table">
            <thead>
              <tr>
                <th onClick={() => handleSort("id")} className="sortable-header">
                  ID {sortBy === "id" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("name")} className="sortable-header">
                  Name {sortBy === "name" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("role")} className="sortable-header">
                  Role {sortBy === "role" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th onClick={() => handleSort("department")} className="sortable-header">
                  Department {sortBy === "department" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Status</th>
                <th>Email</th>
                <th>Join Date</th>
                
              </tr>
            </thead>
            <tbody>
              {sorted.map(emp => (
                <tr key={emp.id} className="employee-row">
                  <td>
                    <div className="employee-id">
                      <span className="id-badge">{emp.empid}</span>
                    </div>
                  </td>
                  <td>
                    <div className="employee-name-info">
                      <strong>{emp.name}</strong>
                    </div>
                  </td>
                  <td>{emp.role}</td>
                  <td>
                    <span className={`department-badge department-${emp.department.toLowerCase()}`}>
                      {emp.department}
                    </span>
                  </td>
                  <td>{getStatusBadge(emp.status)}</td>
                  <td>
                    <a href={`mailto:${emp.email}`} className="email-link">
                      {emp.email}
                    </a>
                  </td>
                  <td>
                    <div className="join-date">
                      {formatJoinDate(emp.joinDate)}
                    </div>
                  </td>
                  <td>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          {sorted.length === 0 && (
            <div className="no-results">
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1">
                <circle cx="12" cy="12" r="10"/>
                <path d="M8 12h8M12 8v8"/>
              </svg>
              <p>No employees found matching "{search}"</p>
              <button className="btn-clear-search" onClick={() => setSearch("")}>
                Clear search
              </button>
            </div>
          )}

          <div className="table-footer">
            <div className="results-count">
              Showing {sorted.length} of {employees.length} employees
            </div>
            <div className="pagination">
        <button
          className="page-btn"
          onClick={onPrev}
          disabled={page === 0}
        >
          Previous
        </button>

        <span className="page-current">
          Page {page + 1} of {totalPages}
        </span>

        <button
          className="page-btn"
          onClick={onNext}
          disabled={page + 1 >= totalPages}
        >
          Next
        </button>
      </div>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;