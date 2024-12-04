'use strict';

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

function onEvent(event, selector, callback) {
    return selector.addEventListener(event, callback);
}

function select(selector, parent = document) {
    return parent.querySelector(selector);
}

function getElement(selector, parent = document) {
    return parent.getElementById(selector);
}


