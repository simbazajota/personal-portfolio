// THEME TOGGLE //

import { initMap, updateMapTheme } from './map.js';

const setToggleState = (theme) => {
    const toggle = document.querySelector(`.theme-switcher`);
    if (!toggle) return;
    toggle.setAttribute(`aria-pressed`, theme === `dark`);
};

const switchTheme = () => {
    // Get root element and data-theme value
    const rootElem = document.documentElement
    let dataTheme = rootElem.getAttribute('data-theme'),
        newTheme

    newTheme = (dataTheme === 'light') ? 'dark' : 'light'

    // Set the new HTML attribute
    rootElem.setAttribute('data-theme', newTheme)

    // Set the new local storage
    localStorage.setItem('theme', newTheme)
    setToggleState(newTheme);
    updateMapTheme();
}

export function initTheme() {
    // Check local storage
    let localS = localStorage.getItem('theme'),
        themeToSet = localS

    //If local storage is not set, we check the OS preference
    if (!localS) {
        themeToSet = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light'
    }

    //set the correct theme
    document.documentElement.setAttribute('data-theme', themeToSet)
    setToggleState(themeToSet);
    initMap();

    // Set event listener for the theme switcher
    document.querySelector(`.theme-switcher`).addEventListener(`click`, switchTheme)

    if (!localS) {
        window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', (event) => {
            const newTheme = event.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
            setToggleState(newTheme);
            updateMapTheme();
        });
    }
}
