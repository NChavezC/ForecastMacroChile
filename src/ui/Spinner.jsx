function Spinner() {
  const spinnerStyle = {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    height: "100vh",
  };

  const svgStyle = {
    width: "64px",
    height: "64px",
    animation: "spin 1s linear infinite",
    color: "#60a5fa",
  };

  return (
    <div style={spinnerStyle}>
      <svg
        style={svgStyle}
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
      >
        <circle
          cx="12"
          cy="12"
          r="10"
          stroke="currentColor"
          strokeWidth="4"
          style={{ opacity: 0.25 }}
        ></circle>
        <path
          fill="currentColor"
          d="M4 12a8 8 0 018-8v2a6 6 0 00-6 6H4z"
          style={{ opacity: 0.75 }}
        ></path>
      </svg>
    </div>
  );
}

export default Spinner;
