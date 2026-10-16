(function () {
    const STORAGE_KEY = "hindu-lib-theme";
    const body = document.body;

    // Применяем сохранённую тему как можно раньше
    const saved = localStorage.getItem(STORAGE_KEY);
    if (saved === "night") {
        body.classList.add("night-mode");
    }

    document.addEventListener("DOMContentLoaded", () => {
        const toggle = document.getElementById("themeToggle");
        if (!toggle) return;

        updateToggleText(toggle);

        toggle.addEventListener("click", () => {
            body.classList.toggle("night-mode");
            const isNight = body.classList.contains("night-mode");
            localStorage.setItem(STORAGE_KEY, isNight ? "night" : "day");
            updateToggleText(toggle);
        });
    });

    function updateToggleText(toggle) {
        const isNight = body.classList.contains("night-mode");
        const icon = toggle.querySelector(".theme-icon");
        const text = toggle.querySelector(".theme-text");
        if (icon) icon.textContent = isNight ? "☀️" : "🌙";
        if (text) text.textContent = isNight ? "Дневной режим" : "Ночной режим";
    }
})();