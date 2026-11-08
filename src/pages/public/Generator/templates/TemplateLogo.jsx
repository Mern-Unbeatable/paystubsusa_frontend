const TemplateLogo = ({ width = 40, color = "#1E8BE6" }) => (
  <svg
    width={width}
    height={width * 0.72}
    viewBox="0 0 50 36"
    fill="none"
    aria-hidden="true"
  >
    <path
      d="M10 2h22c8 0 14 6 14 14s-6 14-14 14H20l-3 4H7l3-4"
      stroke={color}
      strokeWidth="4"
      strokeLinejoin="round"
      strokeLinecap="round"
    />
    <path d="M6 11h24M3 18h27M8 25h14" stroke={color} strokeWidth="4" strokeLinecap="round" />
  </svg>
);

export default TemplateLogo;
