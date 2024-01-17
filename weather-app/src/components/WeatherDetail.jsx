
const WeatherDetail = ({ icon, label, value }) => (
<div className="d-flex">
  {icon}
  <p className="d-flex flex-column ms-3">
    {label}
    <span className="fw-bold">{value}</span>
  </p>
</div>
); export default WeatherDetail;
