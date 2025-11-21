  const toggle = document.querySelector(".theme-toggle");
  toggle.addEventListener("click", () => {
    document.documentElement.classList.toggle("light");
    toggle.textContent = 
      document.documentElement.classList.contains("light")
      ? "🌙"
      : "☀️";
  });
