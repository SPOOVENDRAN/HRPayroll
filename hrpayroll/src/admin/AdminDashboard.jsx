import { useState } from "react";
import "./AdminDashboard.css";

const AdminDashboard = ({
  overview,
  employees = [],
  hrUsers = [],
  admins = [],
  onAddUser,
  onUpdateEmployee,
  onToggleStatus,
  onDeleteEmployee,
  onToggleHrStatus,
  onUpdateUser   
}) => {

  /* ---------------- TAB + SEARCH ---------------- */
  const [activeTab, setActiveTab] = useState("overview");
  const [searchQuery, setSearchQuery] = useState("");

  /* ---------------- MODAL + FORM ---------------- */
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  const [newUser, setNewUser] = useState({
    type: "employee",
    name: "",
    email: "",
    password: "",
    department: "",
    role: "",
    permissions: []
  });

  /* ---------------- FORM HANDLERS ---------------- */
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser(prev => ({ ...prev, [name]: value }));
  };

  const handlePermissionToggle = (permission) => {
    setNewUser(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  const handleAddUser = (e) => {
    e.preventDefault();
    onAddUser(newUser);
    setShowUserForm(false);
    setEditingUser(null);
  };

  const handleEditUser = (user, type) => {
    setEditingUser({ ...user, type });
    setNewUser({
      type,
      name: user.name,
      email: user.email,
      password: "",
      department: user.department || "",
      role: user.role,
      permissions: user.permissions ? user.permissions.split(", ") : []
    });
    setShowUserForm(true);
  };

  const handleUpdateUser = (e) => {
  e.preventDefault();

  if (editingUser.type === "hr" || editingUser.type === "admin") {
    onUpdateUser(editingUser.id, {
      email: newUser.email,
      active: newUser.active
    });
  } else {
    onUpdateEmployee(editingUser.id, newUser);
  }

  setShowUserForm(false);
  setEditingUser(null);
};


 const handleToggleStatus = (id, currentStatus) => {
  const next = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
  onToggleStatus(id, next);
};


  const handleDelete = (id) => {
    if (!window.confirm("Are you sure you want to delete this employee?")) return;
    onDeleteEmployee(id);
  };

  

  /* ---------------- FILTERS ---------------- */
  const q = searchQuery.toLowerCase();

  const filteredEmployees = employees.filter(e =>
    (e.name || "").toLowerCase().includes(q) ||
    (e.email || "").toLowerCase().includes(q) ||
    (e.department || "").toLowerCase().includes(q)
  );

  const filteredHrUsers = hrUsers.filter(u =>
    (u.email || "").toLowerCase().includes(q)
  );

  const filteredAdmins = admins.filter(u =>
    (u.email || "").toLowerCase().includes(q)
  );
  return (
    <div className="admin-dashboard">
      {/* Header */}
      <div className="admin-header">
        <h1>Admin Dashboard</h1>
        <p>Manage HR credentials, employees, and system administration</p>
      </div>

      {/* Overview Stats */}
      <div className="overview-stats">
        <div className="stat-card">
          <div className="stat-icon total-users">👥</div>
          <div className="stat-content">
            <div className="stat-value">{overview.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active-users">✅</div>
          <div className="stat-content">
            <div className="stat-value">{overview.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon employees">👨‍💼</div>
          <div className="stat-content">
            <div className="stat-value">{overview.totalEmployees}</div>
            <div className="stat-label">Employees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon requests">📋</div>
          <div className="stat-content">
            <div className="stat-value">{overview.pendingRequests}</div>
            <div className="stat-label">Pending Requests</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon health">🟢</div>
          <div className="stat-content">
            <div className="stat-value">{overview.systemHealth}</div>
            <div className="stat-label">System Health</div>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="admin-content">
        {/* Navigation Tabs */}
        <div className="admin-tabs">
          <button 
            className={`tab ${activeTab === "overview" ? "active" : ""}`}
            onClick={() => setActiveTab("overview")}
          >
            📊 Overview
          </button>
          <button 
            className={`tab ${activeTab === "hr" ? "active" : ""}`}
            onClick={() => setActiveTab("hr")}
          >
            👥 HR Users
          </button>
          <button 
            className={`tab ${activeTab === "employees" ? "active" : ""}`}
            onClick={() => setActiveTab("employees")}
          >
            👨‍💼 Employees
          </button>
          <button 
            className={`tab ${activeTab === "admins" ? "active" : ""}`}
            onClick={() => setActiveTab("admins")}
          >
            🔐 Admins
          </button>
          <button 
            className={`tab ${activeTab === "settings" ? "active" : ""}`}
            onClick={() => setActiveTab("settings")}
          >
            ⚙️ Settings
          </button>
        </div>

        {/* Search and Add Button */}
        <div className="content-header">
          <div className="search-box">
            <input
              type="text"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="search-input"
            />
            <span className="search-icon">🔍</span>
          </div>
          <button 
            className="add-user-btn"
            onClick={() => {
              setEditingUser(null);
              setShowUserForm(true);
            }}
          >
            + Add New User
          </button>
        </div>

        {/* Content Area */}
        <div className="content-area">
          {/* Add/Edit User Form Modal */}
          {showUserForm && (
            <div className="modal-overlay">
              <div className="modal-content">
                <div className="modal-header">
                  <h3>{editingUser ? "Edit User" : "Add New User"}</h3>
                  <button 
                    className="close-modal"
                    onClick={() => {
                      setShowUserForm(false);
                      setEditingUser(null);
                    }}
                  >
                    ✕
                  </button>
                </div>
                
                <form onSubmit={editingUser ? handleUpdateUser : handleAddUser} className="user-form">
                  <div className="form-group">
                    <label>User Type *</label>
                    <select 
                      name="type" 
                      value={newUser.type}
                      onChange={handleInputChange}
                      disabled={!!editingUser}
                      required
                    >
                      <option value="employee">Employee</option>
                      <option value="hr">HR User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>



                    <div className="form-group">
                      <label>Full Name*</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={newUser.name}
                        onChange={handleInputChange}
                        placeholder="Raja"
                        required
                      />
                    </div>
                  
                  <div className="form-group">
                      <label>Employee Id*</label>
                      <input 
                        type="text" 
                        name="empid" 
                        value={newUser.empid}
                        onChange={handleInputChange}
                        placeholder="EMP***"
                        required
                      />
                    </div>
                  
                  
                  <div className="form-row">
                    
                    <div className="form-group">
                      <label>Current projects </label>
                      <input 
                        type="number" 
                        name="current_projects" 
                        value={newUser.currProjects}
                        onChange={handleInputChange}
                        placeholder="Current projects"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Employment Type</label>
                      <input 
                        type="text" 
                        name="EmploymentType" 
                        value={newUser.employmentType}
                        onChange={handleInputChange}
                        placeholder="Full-Time"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label>Experience </label>
                      <input 
                        type="number" 
                        name="name" 
                        value={newUser.experience }
                        onChange={handleInputChange}
                        placeholder="3"
                        required
                      />
                    </div>

                    <div className="form-group">
                      <label> Joining Date </label>
                      <input 
                        type="date"
                        name="Joining Date" 
                        value={newUser.joiningDate}
                        onChange={handleInputChange}
                        placeholder="2000-01-01"
                        required
                      />
                    </div>
                    
                    <div className="form-group">
                      <label>Email Address *</label>
                      <input 
                        type="email" 
                        name="email" 
                        value={newUser.email}
                        onChange={handleInputChange}
                        placeholder="john@company.com"
                        required
                      />
                    </div>
                  </div>
                  
                  {!editingUser && (
                    <div className="form-group">
                      <label>Password *</label>
                      <input 
                        type="password" 
                        name="password" 
                        value={newUser.password}
                        onChange={handleInputChange}
                        placeholder="Enter password"
                        required={!editingUser}
                      />
                      <small className="password-hint">Minimum 8 characters with letters and numbers</small>
                    </div>
                  )}
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Role/Position *</label>
                      <input 
                        type="text" 
                        name="role" 
                        value={newUser.designation}
                        onChange={handleInputChange}
                        placeholder={newUser.type === "employee" ? "Software Engineer" : "HR Manager"}
                        required
                      />
                    </div>
                    
                    {newUser.type === "employee" && (
                      <div className="form-group">
                        <label>Department *</label>
                        <select 
                          name="department" 
                          value={newUser.department}
                          onChange={handleInputChange}
                          required={newUser.type === "employee"}
                        >
                          <option value="">Select Department</option>
                          <option value="Engineering">Engineering</option>
                          <option value="Marketing">Marketing</option>
                          <option value="Sales">Sales</option>
                          <option value="HR">Human Resources</option>
                          <option value="Finance">Finance</option>
                          <option value="Operations">Operations</option>
                        </select>
                      </div>
                    )}
                  </div>
                  
                  {newUser.type === "admin" && (
                    <div className="form-group">
                      <label>Permissions</label>
                      <div className="permissions-grid">
                        {["User Management", "HR Management", "Payroll Access", "Reports", "Settings"].map(permission => (
                          <label key={permission} className="permission-checkbox">
                            <input
                              type="checkbox"
                              checked={newUser.permissions.includes(permission)}
                              onChange={() => handlePermissionToggle(permission)}
                            />
                            <span className="checkmark"></span>
                            {permission}
                          </label>
                        ))}
                      </div>
                    </div>
                  )}
                  
                  <div className="form-actions">
                    <button 
                      type="button" 
                      className="cancel-btn"
                      onClick={() => {
                        setShowUserForm(false);
                        setEditingUser(null);
                      }}
                    >
                      Cancel
                    </button>
                    <button type="submit" className="submit-btn">
                      {editingUser ? "Update User" : "Create User"}
                    </button>
                  </div>
                </form>
              </div>
            </div>
          )}

          {/* Overview Tab */}
          {activeTab === "overview" && (
            <div className="overview-content">
             
              <div className="quick-stats-overview">
                <h3>Quick Stats</h3>
                <div className="stats-grid">
                  <div className="stat-item">
                    <span className="stat-title">HR Users</span>
                    <span className="stat-count">{hrUsers.length}</span>
                    <span className="stat-sub">{hrUsers.filter(u => u.status === "Active").length} active</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-title">Employees</span>
                    <span className="stat-count">{employees.length}</span>
                    <span className="stat-sub">{employees.filter(u => u.status === "Active").length} active</span>
                  </div>
                  <div className="stat-item">
                    <span className="stat-title">Admins</span>
                    <span className="stat-count">{admins.length}</span>
                    <span className="stat-sub">{admins.filter(u => u.status === "Active").length} active</span>
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* HR Users Tab */}
          {activeTab === "hr" && (
            <div className="table-container">
              <h3>HR Users Management ({filteredHrUsers.length})</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Name</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Status</th>
                    <th>Last Login</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredHrUsers.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{ (user.name || user.empId || "?").charAt(0)}</div>
                          <div className="user-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-id">HR-{user.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className="role-badge">{user.role}</span></td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>{user.lastLogin}</td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEditUser(user, "hr")}
                          >
                            ✏️ Edit
                          </button>
                          <button
  className={`action-btn ${user.status === "ACTIVE" ? "deactivate" : "activate"}`}
  onClick={() =>
    onToggleHrStatus(
      user.id,
      user.status !== "ACTIVE"
    )
  }
>
  {user.status === "ACTIVE" ? "❌ Deactivate" : "✅ Activate"}
</button>

                          <button
                            className="action-btn delete"
                            onClick={() => handleDelete(user.id)}
                            >
                            🗑️ Delete
                            </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Employees Tab */}
          {activeTab === "employees" && (
            <div className="table-container">
              <h3>Employees Management ({filteredEmployees.length})</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Employee</th>
                    <th>Email</th>
                    <th>Department</th>
                    
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredEmployees.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">{user.name.charAt(0)}</div>
                          <div className="user-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-id">EMP-{user.id.toString().padStart(4, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className="dept-badge">{user.department}</span></td>
                      
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEditUser(user, "employee")}
                          >
                            ✏️ Edit
                          </button>
                          <button 
                            className={`action-btn ${user.status === "Active" ? "deactivate" : "activate"}`}
                            onClick={() => handleToggleStatus(user.id, user.status)}
                          >
                            {user.status === "Active" ? "❌ Deactivate" : "✅ Activate"}
                          </button>
                         <button
                                className="action-btn delete"
                                onClick={() => handleDelete(user.id)}
                                >
                                🗑️ Delete
                                </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Admins Tab */}
          {activeTab === "admins" && (
            <div className="table-container">
              <h3>Admin Users Management ({filteredAdmins.length})</h3>
              <table className="admin-table">
                <thead>
                  <tr>
                    <th>Admin</th>
                    <th>Email</th>
                    <th>Role</th>
                    <th>Permissions</th>
                    <th>Status</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {filteredAdmins.map(user => (
                    <tr key={user.id}>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar admin-avatar">{(user.name || user.empId || "?").charAt(0)}</div>
                          <div className="user-info">
                            <div className="user-name">{user.name}</div>
                            <div className="user-id">ADM-{user.id.toString().padStart(3, '0')}</div>
                          </div>
                        </div>
                      </td>
                      <td>{user.email}</td>
                      <td><span className="role-badge admin-role">{user.role}</span></td>
                      <td>
                        <div className="permissions-tags">
                          {user.permissions && user.permissions.split(", ").map((perm, idx) => (
                            <span key={idx} className="permission-tag">{perm}</span>
                          ))}
                        </div>
                      </td>
                      <td>
                        <span className={`status-badge ${user.status.toLowerCase()}`}>
                          {user.status}
                        </span>
                      </td>
                      <td>
                        <div className="action-buttons">
                          <button 
                            className="action-btn edit"
                            onClick={() => handleEditUser(user, "admin")}
                          >
                            ✏️ Edit
                          </button>
                          <button
                            className={`action-btn ${user.status === "ACTIVE" ? "deactivate" : "activate"}`}
                            onClick={() => handleToggleStatus(user.id, user.status)}
                            >
                            {user.status === "ACTIVE" ? "❌ Deactivate" : "✅ Activate"}
                            </button>

                        </div>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}

          {/* Settings Tab */}
          {activeTab === "settings" && (
            <div className="settings-content">
              <div className="settings-card">
                <h3>⚙️ System Settings</h3>
                <div className="settings-group">
                  <h4>Password Policy</h4>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Minimum 8 characters required
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Require numbers and letters
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" />
                      Password expires every 90 days
                    </label>
                  </div>
                </div>
                
                <div className="settings-group">
                  <h4>Security Settings</h4>
                  <div className="setting-item">
                    <label>Failed Login Attempts before lockout</label>
                    <select defaultValue="5">
                      <option>3</option>
                      <option>5</option>
                      <option>10</option>
                    </select>
                  </div>
                  <div className="setting-item">
                    <label>Session Timeout (minutes)</label>
                    <select defaultValue="30">
                      <option>15</option>
                      <option>30</option>
                      <option>60</option>
                    </select>
                  </div>
                </div>
                
                <div className="settings-group">
                  <h4>Notification Settings</h4>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Email notifications for new user registration
                    </label>
                  </div>
                  <div className="setting-item">
                    <label>
                      <input type="checkbox" defaultChecked />
                      Alert on multiple failed login attempts
                    </label>
                  </div>
                </div>
                
                <button className="save-settings-btn">💾 Save Settings</button>
              </div>
              
              <div className="danger-zone">
                <h3>⚠️ Danger Zone</h3>
                <div className="danger-actions">
                  <button className="danger-btn export">📤 Export All User Data</button>
                  <button className="danger-btn audit">📊 View Audit Logs</button>
                  <button className="danger-btn reset">🔄 Reset System</button>
                </div>
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;