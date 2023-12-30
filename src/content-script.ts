(async () => {
    function xpathSnapshotToArray(snapshot: XPathResult) {
        // An XPathResult object lacks normal array properties and methods like length and forEach
        const arr = [];
        for (let i = 0; i < snapshot.snapshotLength; i++) {
            arr[i] = snapshot.snapshotItem(i) as HTMLElement;
        }
        return arr;
    }

    // The waitForElm function is adapted from StackOverflow, used under CC BY-SA 4.0
    // https://stackoverflow.com/a/61511955
    function waitForElms(selector: string, xpath?: boolean): Promise<HTMLElement[]> {
        function get() {
            if (xpath) {
                const elms = document.evaluate(selector, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE);
                return xpathSnapshotToArray(elms);
            } else {
                return Array.from(document.querySelectorAll(selector)) as HTMLElement[];
            }
        }
        return new Promise((resolve, reject) => {
            const elms = get();
            if (elms.length > 0) {
                return resolve(elms);
            }
    
            const observer = new MutationObserver(() => {
                const elms = get();
                if (elms.length > 0) {
                    observer.disconnect();
                    resolve(elms);
                }
            });
    
            observer.observe(document.body, {
                childList: true,
                subtree: true
            });

            setTimeout(() => {
                observer.disconnect();
                reject(`Timeout: could not find element for ${selector}. Please report this.`)
            }, 5000);
        });
    }

    async function findOne(selector: string, xpath?: boolean) {
        const results = await waitForElms(selector, xpath);
        if (results.length > 1) {
            console.warn('Time sheet autofiller found multiple items matching query! May work incorrectly. Please report this.')
        }
        console.log(results);
        return results[0];
    }

    function sleep(ms: number) {
        return new Promise(resolve => setTimeout(resolve, ms));
    } 

    async function setDropdownValue(selector: string, value: string) {
        const element = await findOne(selector) as HTMLInputElement;
        element.value = value;
        // Setting the value isn't enough: now we have to click to open the dropdown, and click the
        // right element in the dropdown.
        element.click();
        // Since we set element.value, our chosen element is at the top of the list
        (await findOne("tr[aria-selected='true']")).click()
    }

    function pollFor(condition: (() => boolean)): Promise<void> {
        return new Promise((resolve, reject) => {
            if (condition()) {
                return resolve();
            }
            const timerID = setInterval(() => {
                if (condition()) {
                    clearInterval(timerID);
                    resolve();
                }
            })
            setTimeout(() => {
                clearInterval(timerID);
                reject(`Timeout: condition not satisfied. Please report this.`)
            }, 5000);
        });
    }

    function isTimeAndAbscences() {
        return Boolean(document.querySelector('div[title="Time and Absences"]'));
    }

    function isExistingTimeCards() {
        return Boolean(document.querySelector('div[title="Existing Time Cards"]'));
    }
    
    function isAddTimeCard() {
        return Boolean(document.querySelector('[title="Add Time Card"]'));
    }

    async function navigateToAddTimeCard() {
        if (document.querySelector('div[title="Time and Absences"]')) {
            // TODO I think there's a race condition triggered if we start from this page?
            // Symptom is that the days don't get picked correctly from the calendar?
            // Maybe best to require the user to manually click this button
            const timeAndAbences = document.querySelector('div[title="Time and Absences"]') as HTMLElement;
            timeAndAbences.click();
            await pollFor(isTimeAndAbscences)
        }
        if (isTimeAndAbscences()) {
            (await findOne('//div[span="Existing Time Cards"]', true)).click()
            await pollFor(isExistingTimeCards)
        }
        if (isExistingTimeCards) {
            (await findOne('[title="Add"]')).click();
            await pollFor(isAddTimeCard);
        }
    }

    type Request = {
        projectCode: string;
        task: string;
        expenditureType: string;
    }

    async function fillOutForm(request: Request) {
        const addButton = await findOne('[title="Add"]');
        if (addButton) {
            // Add button may not be present if user already clicked it
            addButton.click();
        }
        await setDropdownValue('[aria-label="Project"] input[type="text"]', request.projectCode);
        // Ugly, but entering the Project value does something to the other form elements, and if we
        // fill them out too soon there's a race condition. Tested on my machine with 1000ms timeout
        await sleep(2000);
        await setDropdownValue('[aria-label="Task"] input[type="text"]', request.task);
        await setDropdownValue('[aria-label="Expenditure Type"] input[type="text"]', request.expenditureType);
        // Quantity input has no helpful attributes to select by, but it is the last text input on the page
        const textInputs = (await waitForElms('input[type="text"]')) as HTMLInputElement[];
        textInputs[textInputs.length - 1].value = '8';
        // Enter dates last since it's the most finicky, and the date selector creates new text
        // inputs that break the heuristic used above that Quantity is the last text input
        // There are two "Select dates" buttons. Either is fine to click
        (await waitForElms('[title="Select dates"]'))[0].click()
        const enabledWeekdays = await waitForElms('[role="gridcell"][data-afr-adfday="nm"]:not([aria-disabled])') as HTMLInputElement[];
        enabledWeekdays.forEach(el => el.click());
        (await findOne('img[title="Close"]')).click();
        (await findOne('//a[span="OK"]', true)).click();
    }

    chrome.runtime.onMessage.addListener(
        async function(request: Request) {
            console.log('Extension activated');
            await navigateToAddTimeCard();
            if (!isAddTimeCard()) {
                console.log('Time sheet autofiller activated on unsupported page.');
                return;
            }
            fillOutForm(request);
        }
    );
})();