import { useTheme } from "../context/ThemeContext";

function DarkModeToggle() {
  const { dark, toggle }     = useTheme();
  return (
    <div
      onClick={toggle}
      title={dark ? "Light mode" : "Dark mode"}
      style={{
        width: "50px",
        height: "28px",
        borderRadius: "30px",
        background: dark ? "var(--accent)" : "var(--card)",
        border: "1.5px solid var(--border)",
        display: "flex",
        alignItems: "center",
        padding: "3px",
        cursor: "pointer",
        transition: "all 0.3s",
      }}
      onMouseEnter={(e) => (e.currentTarget.style.borderColor = "var(--accent)")}
      onMouseLeave={(e) => (e.currentTarget.style.borderColor = "var(--border)")}
    >
      <div
        style={{
          width: "22px",
          height: "22px",
          borderRadius: "50%",
          background: dark ? "orange" : "#333",
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          transform: dark ? "translateX(22px)" : "translateX(0)",
          transition: "all 0.3s",
          color: "white",
        }}
      >
        {dark ? <i className="fa-solid fa-sun"></i> : <i className="fa-solid fa-moon"></i>}
      </div>
    </div>
  );
}

export default DarkModeToggle;