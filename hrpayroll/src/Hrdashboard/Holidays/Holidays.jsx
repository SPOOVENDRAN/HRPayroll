import React from "react";
import "./Holidays.css";

const Holidays = () => {
  return (
    <div className="holidays-page">
      <h1 className="page-title">HR Payroll</h1>

      <div className="holidays-container">
        {/* CALENDAR */}
        <div className="calendar-card">
          <h2>Holidays Calendar (India)</h2>

          <iframe
            title="India Holidays Calendar"
            src="https://calendar.google.com/calendar/embed?src=en.indian%23holiday@group.v.calendar.google.com&ctz=Asia/Kolkata"
            style={{
              border: 0,
              width: "100%",
              height: "600px",
            }}
            frameBorder="0"
            scrolling="yes"
          />
        </div>

        {/* SIDEBAR */}
        
      </div>
    </div>
  );
};

export default Holidays;
