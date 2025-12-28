import { useState, useEffect } from "react";
import "./AdminDashboard.css";

const AdminDashboard = () => {
  // State for active tab
  const [activeTab, setActiveTab] = useState("overview");
  
  // State for HR Users
  const [hrUsers, setHrUsers] = useState([
    { id: 1, name: "Sarah Johnson", email: "sarah.hr@company.com", role: "HR Manager", status: "Active", lastLogin: "2024-01-25 14:30" },
    { id: 2, name: "Mike Wilson", email: "mike.hr@company.com", role: "HR Executive", status: "Active", lastLogin: "2024-01-24 10:15" },
    { id: 3, name: "Lisa Brown", email: "lisa.hr@company.com", role: "Payroll Admin", status: "Inactive", lastLogin: "2024-01-20 09:45" },
    { id: 4, name: "David Lee", email: "david.hr@company.com", role: "Recruitment HR", status: "Active", lastLogin: "2024-01-25 16:20" }
  ]);

  // State for Employees
  const [employees, setEmployees] = useState([
    { id: 101, name: "John Doe", email: "john@company.com", department: "Engineering", role: "Software Engineer", status: "Active" },
    { id: 102, name: "Jane Smith", email: "jane@company.com", department: "Marketing", role: "Marketing Manager", status: "Active" },
    { id: 103, name: "Robert Chen", email: "robert@company.com", department: "Sales", role: "Sales Executive", status: "Active" },
    { id: 104, name: "Maria Garcia", email: "maria@company.com", department: "HR", role: "HR Assistant", status: "Inactive" },
    { id: 105, name: "Alex Johnson", email: "alex@company.com", department: "Finance", role: "Financial Analyst", status: "Active" }
  ]);

  // State for Admins
  const [admins, setAdmins] = useState([
    { id: 1, name: "Admin User", email: "admin@company.com", role: "Super Admin", status: "Active", permissions: "Full Access" },
    { id: 2, name: "System Admin", email: "system@company.com", role: "System Admin", status: "Active", permissions: "Technical Access" }
  ]);

  // State for new user form
  const [newUser, setNewUser] = useState({
    type: "employee",
    name: "",
    email: "",
    password: "",
    department: "",
    role: "",
    permissions: []
  });

  // State for system overview
  const [systemOverview, setSystemOverview] = useState({
    totalUsers: 0,
    activeUsers: 0,
    totalEmployees: 0,
    pendingRequests: 3,
    systemHealth: "Good"
  });

  // State for search
  const [searchQuery, setSearchQuery] = useState("");
  const [showUserForm, setShowUserForm] = useState(false);
  const [editingUser, setEditingUser] = useState(null);

  // Calculate overview stats
  useEffect(() => {
    const totalUsers = hrUsers.length + employees.length + admins.length;
    const activeUsers = [...hrUsers, ...employees, ...admins].filter(user => user.status === "Active").length;
    
    setSystemOverview({
      totalUsers,
      activeUsers,
      totalEmployees: employees.length,
      pendingRequests: 3,
      systemHealth: "Good"
    });
  }, [hrUsers, employees, admins]);

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setNewUser({
      ...newUser,
      [name]: value
    });
  };

  // Handle permission toggle
  const handlePermissionToggle = (permission) => {
    setNewUser(prev => ({
      ...prev,
      permissions: prev.permissions.includes(permission)
        ? prev.permissions.filter(p => p !== permission)
        : [...prev.permissions, permission]
    }));
  };

  // Handle add new user
  const handleAddUser = (e) => {
    e.preventDefault();
    
    // Validate form
    if (!newUser.name || !newUser.email || !newUser.role) {
      alert("Please fill in all required fields");
      return;
    }

    const newId = Math.max(...[...hrUsers, ...employees, ...admins].map(u => u.id)) + 1;
    const userData = {
      id: newId,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      status: "Active",
      lastLogin: new Date().toLocaleString(),
      ...(newUser.type === "employee" && { department: newUser.department }),
      ...(newUser.type === "admin" && { permissions: newUser.permissions.join(", ") })
    };

    // Add to appropriate list
    if (newUser.type === "hr") {
      setHrUsers([...hrUsers, userData]);
    } else if (newUser.type === "employee") {
      setEmployees([...employees, userData]);
    } else if (newUser.type === "admin") {
      setAdmins([...admins, userData]);
    }

    // Reset form
    setNewUser({
      type: "employee",
      name: "",
      email: "",
      password: "",
      department: "",
      role: "",
      permissions: []
    });
    
    setShowUserForm(false);
    alert(`${newUser.type.toUpperCase()} user added successfully!`);
  };

  // Handle edit user
  const handleEditUser = (user, type) => {
    setEditingUser({ ...user, type });
    setNewUser({
      type: type,
      name: user.name,
      email: user.email,
      password: "",
      department: user.department || "",
      role: user.role,
      permissions: user.permissions ? user.permissions.split(", ") : []
    });
    setShowUserForm(true);
  };

  // Handle update user
  const handleUpdateUser = (e) => {
    e.preventDefault();
    
    const updatedUser = {
      ...editingUser,
      name: newUser.name,
      email: newUser.email,
      role: newUser.role,
      ...(newUser.type === "employee" && { department: newUser.department }),
      ...(newUser.type === "admin" && { permissions: newUser.permissions.join(", ") })
    };

    // Update appropriate list
    if (editingUser.type === "hr") {
      setHrUsers(hrUsers.map(user => user.id === editingUser.id ? updatedUser : user));
    } else if (editingUser.type === "employee") {
      setEmployees(employees.map(user => user.id === editingUser.id ? updatedUser : user));
    } else if (editingUser.type === "admin") {
      setAdmins(admins.map(user => user.id === editingUser.id ? updatedUser : user));
    }

    setShowUserForm(false);
    setEditingUser(null);
    alert("User updated successfully!");
  };

  // Handle delete user
  const handleDeleteUser = (id, type) => {
    if (!window.confirm("Are you sure you want to delete this user?")) return;

    if (type === "hr") {
      setHrUsers(hrUsers.filter(user => user.id !== id));
    } else if (type === "employee") {
      setEmployees(employees.filter(user => user.id !== id));
    } else if (type === "admin") {
      setAdmins(admins.filter(user => user.id !== id));
    }

    alert("User deleted successfully!");
  };

  // Handle status toggle
  const handleToggleStatus = (id, type) => {
    const toggleFunc = (list) => list.map(user => 
      user.id === id 
        ? { ...user, status: user.status === "Active" ? "Inactive" : "Active" }
        : user
    );

    if (type === "hr") {
      setHrUsers(toggleFunc(hrUsers));
    } else if (type === "employee") {
      setEmployees(toggleFunc(employees));
    } else if (type === "admin") {
      setAdmins(toggleFunc(admins));
    }
  };

  // Filter users based on search
  const filteredHrUsers = hrUsers.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredEmployees = employees.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.department.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const filteredAdmins = admins.filter(user =>
    user.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.email.toLowerCase().includes(searchQuery.toLowerCase()) ||
    user.role.toLowerCase().includes(searchQuery.toLowerCase())
  );

  // Get user type label
  const getUserTypeLabel = (type) => {
    switch(type) {
      case "hr": return "HR User";
      case "employee": return "Employee";
      case "admin": return "Admin";
      default: return "User";
    }
  };

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
            <div className="stat-value">{systemOverview.totalUsers}</div>
            <div className="stat-label">Total Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon active-users">✅</div>
          <div className="stat-content">
            <div className="stat-value">{systemOverview.activeUsers}</div>
            <div className="stat-label">Active Users</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon employees">👨‍💼</div>
          <div className="stat-content">
            <div className="stat-value">{systemOverview.totalEmployees}</div>
            <div className="stat-label">Employees</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon requests">📋</div>
          <div className="stat-content">
            <div className="stat-value">{systemOverview.pendingRequests}</div>
            <div className="stat-label">Pending Requests</div>
          </div>
        </div>
        <div className="stat-card">
          <div className="stat-icon health">🟢</div>
          <div className="stat-content">
            <div className="stat-value">{systemOverview.systemHealth}</div>
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
                  
                  <div className="form-row">
                    <div className="form-group">
                      <label>Full Name *</label>
                      <input 
                        type="text" 
                        name="name" 
                        value={newUser.name}
                        onChange={handleInputChange}
                        placeholder="John Doe"
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
                        value={newUser.role}
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
              <div className="recent-activity">
                <h3>Recent Activity</h3>
                <div className="activity-list">
                  <div className="activity-item">
                    <div className="activity-icon login">👤</div>
                    <div className="activity-content">
                      <p>HR User <strong>Sarah Johnson</strong> logged in</p>
                      <span className="activity-time">2 minutes ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon add">➕</div>
                    <div className="activity-content">
                      <p>New employee <strong>Alex Turner</strong> added</p>
                      <span className="activity-time">1 hour ago</span>
                    </div>
                  </div>
                  <div className="activity-item">
                    <div className="activity-icon update">✏️</div>
                    <div className="activity-content">
                      <p>User permissions updated for <strong>Mike Wilson</strong></p>
                      <span className="activity-time">3 hours ago</span>
                    </div>
                  </div>
                </div>
              </div>
              
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
                          <div className="user-avatar">{user.name.charAt(0)}</div>
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
                            className={`action-btn ${user.status === "Active" ? "deactivate" : "activate"}`}
                            onClick={() => handleToggleStatus(user.id, "hr")}
                          >
                            {user.status === "Active" ? "❌ Deactivate" : "✅ Activate"}
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeleteUser(user.id, "hr")}
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
                    <th>Role</th>
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
                      <td>{user.role}</td>
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
                            onClick={() => handleToggleStatus(user.id, "employee")}
                          >
                            {user.status === "Active" ? "❌ Deactivate" : "✅ Activate"}
                          </button>
                          <button 
                            className="action-btn delete"
                            onClick={() => handleDeleteUser(user.id, "employee")}
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
                          <div className="user-avatar admin-avatar">{user.name.charAt(0)}</div>
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
                            className={`action-btn ${user.status === "Active" ? "deactivate" : "activate"}`}
                            onClick={() => handleToggleStatus(user.id, "admin")}
                          >
                            {user.status === "Active" ? "❌ Deactivate" : "✅ Activate"}
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