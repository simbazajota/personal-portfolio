// FILTER //

function filterProduct(value) {
    //Button class code
    let filters = document.querySelectorAll(".filter");
    filters.forEach((filter) => {
        //check if value equals innerText
        if (value.toUpperCase() == filter.innerText.toUpperCase()) {
            filter.classList.add("active");
            filter.setAttribute("aria-pressed", "true");
        } else {
            filter.classList.remove("active");
            filter.setAttribute("aria-pressed", "false");
        }
    });
    //select all cards
    let cards = document.querySelectorAll(".card");
    //loop through all cards
    cards.forEach((card) => {
        //display all cards on 'all' button click
        if (value == "all") {
            card.classList.remove("inactive");
        } else {
            //Check if element contains category class
            if (card.classList.contains(value)) {
                //display element based on category
                card.classList.remove("inactive");
            } else {
                //inactive other cards
                card.classList.add("inactive");
            }
        }
    });
}

function applyFilterLayout(filterValue) {
    document.querySelector(`.card-intro`).setAttribute(`id`, `card-intro-${filterValue}`);
    document.querySelector(`.card-map`).setAttribute(`id`, `card-map-${filterValue}`);
    document.querySelector(`.card-contact`).setAttribute(`id`, `card-contact-${filterValue}`);
    document.querySelector(`.card-skills`).setAttribute(`id`, `card-skills-${filterValue}`);
    document.querySelector(`.card-spotify`).setAttribute(`id`, `card-spotify-${filterValue}`);
    document.querySelector(`.card-github`).setAttribute(`id`, `card-github-${filterValue}`);
    document.querySelector(`.card-linkedin`).setAttribute(`id`, `card-linkedin-${filterValue}`);
    document.querySelector(`.card-weather`).setAttribute(`id`, `card-weather-${filterValue}`);
    document.querySelector(`.card-vanlife`).setAttribute(`id`, `card-vanlife-${filterValue}`);
    document.querySelector(`.card-quizzical`).setAttribute(`id`, `card-quizzical-${filterValue}`);
    document.querySelector(`.card-evogym`).setAttribute(`id`, `card-evogym-${filterValue}`);
}

let grid = null;

function transitionToFilter(filterValue, { animate = true } = {}) {
    if (!grid) return;
    if (!animate) {
        filterProduct(filterValue);
        applyFilterLayout(filterValue);
        return;
    }

    const cards = Array.from(document.querySelectorAll(`.card`));
    if (!cards.length) {
        filterProduct(filterValue);
        applyFilterLayout(filterValue);
        return;
    }

    const firstRects = cards.map(card => card.getBoundingClientRect());

    filterProduct(filterValue);
    applyFilterLayout(filterValue);

    const lastRects = cards.map(card => card.getBoundingClientRect());

    cards.forEach((card, index) => {
        const first = firstRects[index];
        const last = lastRects[index];
        const deltaX = first.left - last.left;
        const deltaY = first.top - last.top;
        if (deltaX || deltaY) {
            card.style.transition = `none`;
            card.style.transform = `translate(${deltaX}px, ${deltaY}px)`;
        }
    });

    grid.offsetHeight;

    requestAnimationFrame(() => {
        cards.forEach((card) => {
            card.style.transition = ``;
            card.style.transform = ``;
        });
    });
}

export function initFilters() {
    const filter = document.querySelectorAll(`.filter`);
    const filterContainer = document.querySelector(`.filters-container`);
    const projectFilter = document.querySelector(`[data-filter="projects"]`);
    grid = document.querySelector(`.grid`);

    filterContainer.addEventListener(`click`, function (event) {
        const clicked = event.target.closest(`.filter`);
        if (!clicked) return;
        filter.forEach(filter => filter.classList.remove(`active`));
        clicked.classList.add(`active`);
        transitionToFilter(clicked.dataset.filter);
    })

    document.querySelector('.intro-btn').addEventListener(`click`, function () {
        projectFilter.click();
    });

    //Initially display all products
    window.onload = () => {
        transitionToFilter("all", { animate: false });
    };
}
