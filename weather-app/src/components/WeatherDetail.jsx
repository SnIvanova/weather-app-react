import React from "react";

const WeatherDetail = ({ icon, label, value }) => {
  return (
    <div className="d-flex flex-column mx-3">
      {icon}
      <p className="text-muted mb-1">{label}</p>
      <span className="fw-bold">{value}</span>
    </div>
  );
};

export default WeatherDetail;