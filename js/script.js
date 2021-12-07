const checkboxChallenge = {
    data: {
        challengeWrapper: null,
        title: 'Listen to all the compressed.fm episodes',
        imageSrc: './assets/images/podcast-cover.png',
        checkboxes: {
            content: [
                { text: 'Trailer' },
                { text: 'James Q Quick Origin Story' },
                { text: 'Amy Dutton’s Origin Story' },
                { text: 'Tech Behind the Podcast' },
                { text: 'Tech Behind SelfTeach.me' },
                { text: 'Freelancing (Part 1)' }
            ],
            elements: [],
            lastChecked: null,
            inBetween: false
        }
    },

    init() {
        const container = document.querySelector('.container');
        this.data.challengeWrapper = container.appendChild(document.createElement('div'));

        this.data.challengeWrapper.classList.add('challenge-wrapper');
        this.renderContainers();
        this.checkHandler();
    },
    renderContainers() {
        this.renderCoverContainer();
        this.renderContentContainer();
    },
    renderCoverContainer() {
        const coverContainer = this.data.challengeWrapper.appendChild(document.createElement('div'));
        coverContainer.classList.add('cover-wrapper');

        const cover = coverContainer.appendChild(document.createElement('img'));
        cover.classList.add('cover');
        cover.src = this.data.imageSrc;
    },
    renderContentContainer() {
        const contentContainer = this.data.challengeWrapper.appendChild(document.createElement('div'));
        contentContainer.classList.add('content-wrapper');

        const content = contentContainer.appendChild(document.createElement('div'));
        content.classList.add('content');

        const title = content.appendChild(document.createElement('h1'));
        title.classList.add('title');
        title.textContent = this.data.title.toUpperCase();

        const checkboxesWrapper = content.appendChild(document.createElement('div'));
        checkboxesWrapper.classList.add('checkboxes-wrapper');

        this.renderCheckboxes();
    },
    renderCheckboxes() {
        const boxesWrapper = document.querySelector('.checkboxes-wrapper');
        const list = boxesWrapper.appendChild(document.createElement('ul'));

        this.data.checkboxes.content.forEach((checkbox, index) => {
            const boxWrapper = list.appendChild(document.createElement('li'));
            boxWrapper.classList.add('box-wrapper');

            const label = boxWrapper.appendChild(document.createElement('label'));
            label.classList.add('label');

            const box = label.appendChild(document.createElement('input'));
            box.setAttribute('type', 'checkbox');
            box.classList.add('checkbox', `checkbox${index}`);
            this.data.checkboxes.elements.push(box);

            const checkmark = label.appendChild(document.createElement('span'));
            checkmark.classList.add('checkmark');

            const text = label.appendChild(document.createElement('span'));
            text.classList.add('podcast-title');

            text.textContent = `${index + 1} || ${checkbox.text}`;
        });
    },
    checkHandler() {
        let inBetween = this.data.checkboxes.inBetween;
        let lastChecked = this.data.checkboxes.lastChecked;

        this.data.checkboxes.elements.forEach(checkbox => {
            checkbox.addEventListener('click', e => {
                if (e.shiftKey && checkbox.checked) {
                    this.data.checkboxes.elements.forEach(checkbox => {
                        // change to true when checking first item then to false when checking last item
                        if (checkbox === e.target || checkbox === lastChecked) {
                            inBetween = !inBetween;
                        }

                        // if inBetween is true check all the boxes in between
                        if (inBetween) {
                            checkbox.checked = true;
                        }
                    });
                }
                lastChecked = e.target;
            });
        });
    }
}

window.onload = function () {
    checkboxChallenge.init();
}