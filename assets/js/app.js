'use strict';

function onEvent(event, selector, callback) {
    selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}

const dashboard = select('.dashboard');
const modalDefault = select('.modal-default');
const modalSettings = select('.modal-settings');
const settingsBtn = select('.settings-btn');
const acceptBtn = select('.accept-btn');
const savePreferencesBtn = select('.save-preferences-btn');
const browserBtn = select('.browser');
const operatingSystemBtn = select('.operating-system');
const screenWidthBtn = select('.screen-width');
const screenHeigthBtn = select('.screen-heigth');
const overlay = select('.overlay');
const browserData = navigator.userAgentData;
const operatingSystem = navigator.userAgentData.platform;
const screenWidth = window.innerWidth;
const screenHeight = window.innerHeight;

onEvent('DOMContentLoaded', document, () => {
    if (!hasCookies()) openModal();
});

function hasCookies() {
    const cookies = document.cookie;
    if (!cookies) {
        console.log('No cookies found.');
        return false;
    }
    console.table(cookies.split(';').map(cookie => {
        const [name, value] = cookie.trim().split('=');
        return { name, value };
    }));
    return true;
}

function openModal() {
    setTimeout(() => {
        dashboard.style.display = 'flex';
        setTimeout(() => {
            dashboard.classList.add('show');
            overlay.classList.add('show-overlay');
            checkSwitches();
        }, 10);
    }, 100);
}

function closeModal() {
    dashboard.classList.remove('show');
    overlay.classList.remove('show-overlay');
    setTimeout(() => dashboard.style.display = 'none', 1000);
}

function acceptAllCookies() {
    checkSwitches();
    getCookies();
    closeModal();
}

function getCookies() {
    const cookies = {
        Browser: browserBtn.checked ? (browserData ? browserData.brands[0].brand : "Not identified") : null,
        OperatingSystem: operatingSystemBtn.checked ? operatingSystem : null,
        ScreenWidth: screenWidthBtn.checked ? screenWidth : null,
        ScreenHeight: screenHeigthBtn.checked ? screenHeight : null
    };

    const cookieArray = [];
    Object.entries(cookies).forEach(([name, value]) => {
        if (value) {
            setCookie(name, value);
            cookieArray.push({ name, value });
        }
    });
    console.table(cookieArray);
}

function setCookie(name, value, seconds = 10) {
    const expirationDate = new Date(Date.now() + seconds * 1000).toUTCString();
    document.cookie = `${encodeURIComponent(name)}=${encodeURIComponent(value)}; expires=${expirationDate}; path=/; SameSite=Lax`;
}

function checkSwitches() {
    const allChecked = [browserBtn, operatingSystemBtn, screenWidthBtn, screenHeigthBtn].every(switchElement => switchElement.checked);
    acceptBtn.style.display = allChecked ? 'inline-block' : 'none';
}

onEvent('click', acceptBtn, acceptAllCookies);
onEvent('click', settingsBtn, () => {
    modalDefault.style.display = 'none';
    modalSettings.style.display = 'block';
});
onEvent('click', savePreferencesBtn, () => {
    getCookies();
    closeModal();
});

checkSwitches();

