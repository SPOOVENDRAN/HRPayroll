// Holidays.jsx
import React from 'react';
import './Holidays.css';

const Holidays = () => {
  // Calendar data
  const month = "January 2025";
  const daysOfWeek = ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"];
  
  // Days with events
  const holidays = {
    26: { name: "Republic Day", type: "national" }
  };

  // Generate calendar days
  const calendarDays = Array.from({ length: 31 }, (_, i) => {
    const dayNumber = i + 1;
    const dayName = daysOfWeek[(i + 3) % 7]; // Jan 1, 2025 is Wednesday
    const holiday = holidays[dayNumber];
    
    return {
      day: dayNumber,
      dayName: dayName,
      isHoliday: !!holiday,
      holidayName: holiday?.name,
      holidayType: holiday?.type,
      isWeekend: dayName === "Sat" || dayName === "Sun"
    };
  });

  return (
    <div className="holidays-page">
      {/* Header */}
      <div className="holidays-header">
        <h1 className="page-title">HR Payroll</h1>
      </div>

      {/* Main Content */}
      <div className="holidays-container">
        {/* Calendar Section */}
        <div className="calendar-section">
          <div className="calendar-card">
            <div className="calendar-header">
              <h2>Holidays Calendar</h2>
              <div className="month-year">{month}</div>
            </div>

            <div className="calendar-grid">
              {/* Day headers */}
              {daysOfWeek.map(day => (
                <div key={day} className="calendar-day-header">
                  {day}
                </div>
              ))}

              {/* Calendar days */}
              {calendarDays.map(day => (
                <div
                  key={day.day}
                  className={`calendar-day ${
                    day.isHoliday ? 'holiday' : ''
                  } ${day.isWeekend ? 'weekend' : ''}`}
                >
                  <div className="day-number">{day.day}</div>
                  {day.isHoliday && (
                    <div className="holiday-label">
                      <span className="holiday-indicator"></span>
                      {day.holidayName}
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Sidebar */}
        <div className="holidays-sidebar">
          {/* Dashboard Navigation */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Dashboard</h3>
            <div className="sidebar-links">
              <a href="#" className="sidebar-link active">Employees</a>
              <a href="#" className="sidebar-link">Attendance And Leaves</a>
            </div>
          </div>

          {/* Payroll Navigation */}
          <div className="sidebar-section">
            <h3 className="sidebar-title">Payroll</h3>
            <div className="sidebar-links">
              <a href="#" className="sidebar-link active">Holidays</a>
            </div>
          </div>

          {/* Insights */}
          <div className="insights-section">
            <h3 className="insights-title">Holiday Insight</h3>
            <div className="insights-content">
              <div className="insight-icon">📅</div>
              <p className="insight-text">
                2 major national holidays fall on weekdays this quarter, 
                which may affect attendance trends.
              </p>
            </div>
            <div className="insight-stats">
              <div className="stat-item">
                <span className="stat-label">Weekday Holidays</span>
                <span className="stat-value">2</span>
              </div>
              <div className="stat-item">
                <span className="stat-label">Quarter Total</span>
                <span className="stat-value">8</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Holidays;