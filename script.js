// Enhanced Age Calculator JavaScript
let currentAgeData = null;

// Loading screen management
window.addEventListener("load", function() {
    setTimeout(() => {
        const loadingScreen = document.getElementById("loadingScreen");
        if (loadingScreen) {
            loadingScreen.classList.add("hidden");
        }
    }, 1500);
});

// Main age calculation function
function calculateAge() {
    const birthdateInput = document.getElementById("birthdate");
    const resultSection = document.getElementById("resultSection");
    
    if (!birthdateInput.value) {
        showToast("कृपया अपनी जन्म तिथि चुनें!", "error");
        birthdateInput.focus();
        return;
    }
    
    const birthDate = new Date(birthdateInput.value);
    const today = new Date();
    
    // Validate birth date
    if (birthDate > today) {
        showToast("जन्म तिथि भविष्य में नहीं हो सकती!", "error");
        return;
    }
    
    // Check if birth date is too old (more than 150 years)
    const maxAge = new Date();
    maxAge.setFullYear(maxAge.getFullYear() - 150);
    if (birthDate < maxAge) {
        showToast("कृपया एक वैध जन्म तिथि डालें!", "error");
        return;
    }
    
    // Calculate age
    currentAgeData = calculateDetailedAge(birthDate, today);
    
    // Display results with animation
    displayResults(currentAgeData);
    
    // Show result section
    resultSection.classList.add("show");
    
    // Smooth scroll to results
    setTimeout(() => {
        resultSection.scrollIntoView({ 
            behavior: "smooth",
            block: "nearest"
        });
    }, 300);
    
    // Add birthday effect if its users birthday
    if (currentAgeData.nextBirthday === "आज आपका जन्मदिन है! 🎉") {
        setTimeout(() => {
            addBirthdayEffect();
            showToast("🎉 आपको जन्मदिन की हार्दिक शुभकामनाएं! 🎂", "success");
        }, 1000);
    } else {
        showToast("उम्र सफलतापूर्वक कैलकुलेट की गई!", "success");
    }
}
