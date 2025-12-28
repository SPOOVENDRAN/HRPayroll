import { useState } from "react";
import './Employees.css';

const Employees = () => {
  const [search, setSearch] = useState("");
  const [sortBy, setSortBy] = useState("id");
  const [sortOrder, setSortOrder] = useState("asc");

  const employees = [
    { id: 1, name: "Arun", role: "Developer", dept: "IT", status: "Active", email: "arun@company.com", joinDate: "2022-03-15" },
    { id: 2, name: "Meena", role: "Tester", dept: "QA", status: "Active", email: "meena@company.com", joinDate: "2021-11-20" },
    { id: 3, name: "Varun", role: "HR Executive", dept: "HR", status: "On Leave", email: "varun@company.com", joinDate: "2020-08-10" },
    { id: 4, name: "Priya", role: "Sales Manager", dept: "Sales", status: "Active", email: "priya@company.com", joinDate: "2023-01-05" },
    { id: 5, name: "Rahul", role: "Accountant", dept: "Finance", status: "Active", email: "rahul@company.com", joinDate: "2022-09-12" },
    { id: 6, name: "Sneha", role: "Developer", dept: "IT", status: "Remote", email: "sneha@company.com", joinDate: "2023-03-22" },
    { id: 7, name: "Karan", role: "QA Lead", dept: "QA", status: "Active", email: "karan@company.com", joinDate: "2021-05-18" },
    { id: 8, name: "Neha", role: "Recruiter", dept: "HR", status: "Active", email: "neha@company.com", joinDate: "2022-07-30" },
  ];

  const filtered = employees.filter(e =>
    e.name.toLowerCase().includes(search.toLowerCase()) ||
    e.role.toLowerCase().includes(search.toLowerCase()) ||
    e.dept.toLowerCase().includes(search.toLowerCase()) ||
    e.id.toString().includes(search)
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
    switch(status) {
      case "Active": return <span className="badge status-active">Active</span>;
      case "On Leave": return <span className="badge status-leave">On Leave</span>;
      case "Remote": return <span className="badge status-remote">Remote</span>;
      default: return <span className="badge">Unknown</span>;
    }
  };

  const formatJoinDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB'); // Format: DD/MM/YYYY
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
            <span className="stat-number">{employees.filter(e => e.status === "Active").length}</span>
            <span className="stat-label">Active</span>
          </div>
          <div className="stat-card">
            <span className="stat-number">{employees.filter(e => e.dept === "IT").length}</span>
            <span className="stat-label">IT Department</span>
          </div>
        </div>
      </div>

      <div className="employees-content">
        <div className="search-section">
          <div className="search-box">
            <svg className="search-icon" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="11" cy="11" r="8"/>
              <path d="m21 21-4.35-4.35"/>
            </svg>
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
              <option value="dept">Department</option>
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
                <th onClick={() => handleSort("dept")} className="sortable-header">
                  Department {sortBy === "dept" && (sortOrder === "asc" ? "↑" : "↓")}
                </th>
                <th>Status</th>
                <th>Email</th>
                <th>Join Date</th>
                <th>Actions</th>
              </tr>
            </thead>
            <tbody>
              {sorted.map(emp => (
                <tr key={emp.id} className="employee-row">
                  <td>
                    <div className="employee-id">
                      <span className="id-badge">{emp.id.toString()}</span>
                    </div>
                  </td>
                  <td>
                    <div className="employee-name-info">
                      <strong>{emp.name}</strong>
                    </div>
                  </td>
                  <td>{emp.role}</td>
                  <td>
                    <span className={`dept-badge dept-${emp.dept.toLowerCase()}`}>
                      {emp.dept}
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
                    <div className="action-buttons">
                      <button className="btn-view" title="View Details">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"/>
                          <circle cx="12" cy="12" r="3"/>
                        </svg>
                      </button>
                      <button className="btn-edit" title="Edit">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"/>
                          <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"/>
                        </svg>
                      </button>
                      <button className="btn-delete" title="Delete">
                        <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                          <path d="M3 6h18M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"/>
                        </svg>
                      </button>
                    </div>
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
              <button className="page-btn" disabled>Previous</button>
              <span className="page-current">Page 1</span>
              <button className="page-btn">Next</button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Employees;