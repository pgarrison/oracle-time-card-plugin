import { sendError, sendEvents } from '../analytics/analytics';
import { TimeCardOptions } from '../time-card'
import { waitForElms, findOne, xpathSnapshotToArray } from './domQuery';
import getWeekdayCells from './get-weekday-cells';

function sleep(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

async function setDropdownValue(selector: string, value: string) {
    const element = await findOne(selector) as HTMLInputElement;
    // Update the input element's value (checked by Oracle ADF file inputSearch-ir4z5i.js line 2526)
    element.value = value;
    // Make a keyup event: this is what Oracle ADF listens for. The key itself is irrelevant, since
    // element.value is what ADF looks at.
    // The bubbles property is critical: ADF manages its own event queue by letting all (important)
    // events bubble up to the top level document. But we can't just dispatch the event to
    // document.documentElement because then the event target wouldn't point to the input element.
    const event = new KeyboardEvent('keyup', { key: '1', bubbles: true });
    // Use dispatchEvent to send the event the text box. This will trigger the dropdown's item list
    // to pop up
    element.dispatchEvent(event);
    // Setting the value isn't enough: now we have to click the right element in the dropdown.
    // Since we set element.value, our chosen element is at the top of the list, but we select it
    // with an xpath query to make sure we've waited long enough for the dropdown item to load
    const matches = await waitForElms(`//th[contains(div, "${value}")]`, true);
    if (matches.length > 1) {
        // Perhaps there are multiple matches, but just one exact match?
        const exactMatches = xpathSnapshotToArray(document.evaluate(`//th[div="${value}"]`, document, null, XPathResult.ORDERED_NODE_SNAPSHOT_TYPE));
        if (exactMatches.length === 1) {
            exactMatches[0].click();
        } else {
            const errorMessage = `Time card autofill warning: The option ${value} is ambiguous and matches multiple possible choices. Please edit your extension settings. (Right click on the extension icon, then choose "Options".)`;
            alert(errorMessage);
            throw new Error(errorMessage);
        }
    } else {
        matches[0].click();
    }
}

export default async function fillOutForm(request: TimeCardOptions) {
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
    const enabledWeekdays = await getWeekdayCells();
    enabledWeekdays.forEach(el => el.click());
    (await findOne('img[title="Close"]')).click();
    (await findOne('//a[span="OK"]', true)).click();
    sendEvents([{ type: "success" }])
}
