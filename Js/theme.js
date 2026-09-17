const themeBody = document.body;
const themeToggle = document.getElementById("theme-toggle");
const footerThemeToggle = document.getElementById("footer-theme-toggle");
const mobileThemeToggle = document.getElementById("mobile-theme-toggle");
const themeHomeImage = document.querySelector(".home-image");

function setTheme(theme) {
    const isLight = theme === "light";
    themeBody.classList.toggle("theme-light", isLight);
    if (themeHomeImage) {
        themeHomeImage.src = isLight ?
            themeHomeImage.dataset.day :
            themeHomeImage.dataset.night;
    }
    const themeIcon = `<i class="fas fa-${isLight ? "sun" : "moon"}"></i>`;
    if (themeToggle) {
        themeToggle.innerHTML = themeIcon;
        themeToggle.setAttribute(
            "aria-label",
            isLight ? "تفعيل الوضع الليلي" : "تفعيل الوضع النهاري"
        );
        themeToggle.title = themeToggle.getAttribute("aria-label");
    }
    if (footerThemeToggle) {
        footerThemeToggle.innerHTML = themeIcon;
        footerThemeToggle.setAttribute("aria-label", themeToggle?.getAttribute("aria-label") || "تبديل الوضع");
    }
    if (mobileThemeToggle) {
        mobileThemeToggle.querySelector("i").className =
            `fas fa-${isLight ? "sun" : "moon"}`;
        mobileThemeToggle.querySelector("span").textContent = isLight ?
            "الوضع النهاري" :
            "الوضع الليلي";
    }
    localStorage.setItem("sufra-theme", theme);
}

function toggleTheme() {
    setTheme(themeBody.classList.contains("theme-light") ? "dark" : "light");
}

themeToggle?.addEventListener("click", toggleTheme);
footerThemeToggle?.addEventListener("click", toggleTheme);
mobileThemeToggle?.addEventListener("click", toggleTheme);
