/* Variables
-------------------------------------------------- */
const chargeStatus = document.querySelector('#battery dd:nth-of-type(1)');
const chargeLevel = document.querySelector('#battery dd:nth-of-type(2) output');
const chargeMeter = document.querySelector('#battery dd:nth-of-type(2) progress');
const inputField = document.getElementById('input-word');
const generateButton = document.getElementById('generate-btn');
const imageContainer = document.getElementById('image-container');

/* Functions
-------------------------------------------------- */
function updateBatteryStatus(battery) {
    if (battery.charging === true) {
        chargeStatus.textContent = "Charging...";
    } else {
        chargeStatus.textContent = "Discharging...";
    }
    chargeLevel.textContent = (battery.level * 100) + "%";
    chargeMeter.value = battery.level * 100;

    // Update robot image based on battery level
    updateRobotImage(battery.level);
}

function updateRobotImage(batteryLevel) {
    const imageUrl = generateRobotImageUrl(batteryLevel);
    const image = new Image();
    image.src = imageUrl;
    imageContainer.innerHTML = '';
    imageContainer.appendChild(image);
}

function generateRobotImageUrl(batteryLevel) {
    // Generate robot image URL based on battery level
    const percentage = Math.round(batteryLevel * 100);
    return `https://robohash.org/${percentage}.png`;
}

navigator.getBattery().then(battery => {
    updateBatteryStatus(battery);
    battery.addEventListener("chargingchange", () => {
        updateBatteryStatus(battery);
    });
    battery.addEventListener("levelchange", () => {
        updateBatteryStatus(battery);
    });
});

generateButton.addEventListener('click', () => {
    const word = inputField.value.trim();
    if (word !== '') {
        const imageUrl = `https://robohash.org/${encodeURIComponent(word)}.png`;
        const image = new Image();
        image.src = imageUrl;
        imageContainer.innerHTML = '';
        imageContainer.appendChild(image);
    }
});
