function calculateAge() {
    const birthdateInput = document.getElementById('birthdate');
    const resultSection = document.getElementById('resultSection');
    
    if (!birthdateInput.value) {
        alert('कृपया अपनी जन्म तिथि चुनें!');
        return;
    }
    
    const birthDate = new Date(birthdateInput.value);
    const today = new Date();
    
    // Check if birth date is in future
    if (birthDate > today) {
        alert('जन्म तिथि भविष्य में नहीं हो सकती!');
        return;
    }
    
    // Calculate age
    const ageData = calculateDetailedAge(birthDate, today);
    
    // Display results
    displayResults(ageData);
    
    // Show result section with animation
    resultSection.classList.add('show');
    
    // Scroll to results
    resultSection.scrollIntoView({ behavior: 'smooth' });
    
    // Add birthday effect if it's user's birthday
    if (ageData.nextBirthday === "आज आपका जन्मदिन है! 🎉") {
        setTimeout(() => {
            addBirthdayEffect();
        }, 1000);
    }
}

function calculateDetailedAge(birthDate, currentDate) {
    let years = currentDate.getFullYear() - birthDate.getFullYear();
    let months = currentDate.getMonth() - birthDate.getMonth();
    let days = currentDate.getDate() - birthDate.getDate();
    
    // Adjust for negative days
    if (days < 0) {
        months--;
        const lastMonth = new Date(currentDate.getFullYear(), currentDate.getMonth(), 0);
        days += lastMonth.getDate();
    }
    
    // Adjust for negative months
    if (months < 0) {
        years--;
        months += 12;
    }
    
    // Calculate total days lived
    const totalDays = Math.floor((currentDate - birthDate) / (1000 * 60 * 60 * 24));
    const totalHours = totalDays * 24;
    const totalMinutes = totalHours * 60;
    const totalSeconds = totalMinutes * 60;
    
    // Calculate next birthday
    const nextBirthday = calculateNextBirthday(birthDate, currentDate);
    
    // Get zodiac sign
    const zodiacSign = getZodiacSign(birthDate);
    
    // Get day of week when born
    const dayOfWeek = getDayOfWeek(birthDate);
    
    return {
        years,
        months,
        days,
        totalDays,
        totalHours,
        totalMinutes,
        totalSeconds,
        nextBirthday,
        zodiacSign,
        dayOfWeek
    };
}

function displayResults(ageData) {
    // Update age display
    document.getElementById('years').textContent = ageData.years;
    document.getElementById('months').textContent = ageData.months;
    document.getElementById('days').textContent = ageData.days;
    
    // Update detailed info
    document.getElementById('totalDays').textContent = ageData.totalDays.toLocaleString('hi-IN');
    document.getElementById('totalHours').textContent = ageData.totalHours.toLocaleString('hi-IN');
    document.getElementById('totalMinutes').textContent = ageData.totalMinutes.toLocaleString('hi-IN');
    document.getElementById('nextBirthday').textContent = ageData.nextBirthday;
    
    // Update fun facts
    document.getElementById('zodiacSign').innerHTML = `<i class="fas fa-star-of-life"></i> आपकी राशि: ${ageData.zodiacSign}`;
    document.getElementById('dayOfWeek').innerHTML = `<i class="fas fa-calendar-day"></i> आप ${ageData.dayOfWeek} को पैदा हुए थे`;
    document.getElementById('ageInSeconds').innerHTML = `<i class="fas fa-clock"></i> आपकी उम्र सेकंड में: ${ageData.totalSeconds.toLocaleString('hi-IN')}`;
    
    // Add number counting animation
    animateNumbers();
}

function calculateNextBirthday(birthDate, currentDate) {
    const nextBirthday = new Date(currentDate.getFullYear(), birthDate.getMonth(), birthDate.getDate());
    
    if (nextBirthday < currentDate) {
        nextBirthday.setFullYear(currentDate.getFullYear() + 1);
    }
    
    const daysUntilBirthday = Math.ceil((nextBirthday - currentDate) / (1000 * 60 * 60 * 24));
    
    if (daysUntilBirthday === 0) {
        return "आज आपका जन्मदिन है! 🎉";
    } else if (daysUntilBirthday === 1) {
        return "कल आपका जन्मदिन है! 🎂";
    } else {
        return `${daysUntilBirthday} दिन बाद`;
    }
}

function getZodiacSign(birthDate) {
    const month = birthDate.getMonth() + 1;
    const day = birthDate.getDate();
    
    const zodiacSigns = {
        'मेष': { start: [3, 21], end: [4, 19] },
        'वृषभ': { start: [4, 20], end: [5, 20] },
        'मिथुन': { start: [5, 21], end: [6, 20] },
        'कर्क': { start: [6, 21], end: [7, 22] },
        'सिंह': { start: [7, 23], end: [8, 22] },
        'कन्या': { start: [8, 23], end: [9, 22] },
        'तुला': { start: [9, 23], end: [10, 22] },
        'वृश्चिक': { start: [10, 23], end: [11, 21] },
        'धनु': { start: [11, 22], end: [12, 21] },
        'मकर': { start: [12, 22], end: [1, 19] },
        'कुंभ': { start: [1, 20], end: [2, 18] },
        'मीन': { start: [2, 19], end: [3, 20] }
    };
    
    for (const [sign, dates] of Object.entries(zodiacSigns)) {
        const [startMonth, startDay] = dates.start;
        const [endMonth, endDay] = dates.end;
        
        if ((month === startMonth && day >= startDay) || (month === endMonth && day <= endDay)) {
            return sign;
        }
    }
    
    return 'मकर'; // Default for edge cases
}

function getDayOfWeek(date) {
    const days = ['रविवार', 'सोमवार', 'मंगलवार', 'बुधवार', 'गुरुवार', 'शुक्रवार', 'शनिवार'];
    return days[date.getDay()];
}

function animateNumbers() {
    const numbers = document.querySelectorAll('.age-number');
    
    numbers.forEach(number => {
        const target = parseInt(number.textContent);
        let current = 0;
        const increment = target / 50;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            number.textContent = Math.floor(current);
        }, 30);
    });
}

// Set max date to today
document.addEventListener('DOMContentLoaded', function() {
    const dateInput = document.getElementById('birthdate');
    const today = new Date().toISOString().split('T')[0];
    dateInput.setAttribute('max', today);
    
    // Add some sample dates for testing
    const currentYear = new Date().getFullYear();
    dateInput.setAttribute('min', (currentYear - 120) + '-01-01');
});

// Add Enter key support
document.addEventListener('DOMContentLoaded', function() {
    const birthdateInput = document.getElementById('birthdate');
    if (birthdateInput) {
        birthdateInput.addEventListener('keypress', function(e) {
            if (e.key === 'Enter') {
                calculateAge();
            }
        });
    }
});

// Add some interactive effects
document.addEventListener('DOMContentLoaded', function() {
    const calculateBtn = document.querySelector('.calculate-btn');
    if (calculateBtn) {
        calculateBtn.addEventListener('click', function() {
            this.style.transform = 'scale(0.95)';
            setTimeout(() => {
                this.style.transform = '';
            }, 150);
        });
    }
});

// Add birthday celebration effect
function addBirthdayEffect() {
    const colors = ['#ff6b6b', '#4ecdc4', '#45b7d1', '#96ceb4', '#ffeaa7'];
    
    for (let i = 0; i < 50; i++) {
        setTimeout(() => {
            createConfetti(colors[Math.floor(Math.random() * colors.length)]);
        }, i * 100);
    }
}

function createConfetti(color) {
    const confetti = document.createElement('div');
    confetti.style.position = 'fixed';
    confetti.style.left = Math.random() * 100 + 'vw';
    confetti.style.top = '-10px';
    confetti.style.width = '10px';
    confetti.style.height = '10px';
    confetti.style.backgroundColor = color;
    confetti.style.borderRadius = '50%';
    confetti.style.pointerEvents = 'none';
    confetti.style.zIndex = '1000';
    confetti.style.animation = 'fall 3s linear forwards';
    
    document.body.appendChild(confetti);
    
    setTimeout(() => {
        confetti.remove();
    }, 3000);
}

// Add CSS for confetti animation
const style = document.createElement('style');
style.textContent = `
    @keyframes fall {
        0% {
            transform: translateY(-100vh) rotate(0deg);
            opacity: 1;
        }
        100% {
            transform: translateY(100vh) rotate(360deg);
            opacity: 0;
        }
    }
`;
document.head.appendChild(style);
