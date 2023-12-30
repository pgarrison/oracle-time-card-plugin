import { TimeCardOptions } from '../../time-card.d'
import { waitForElms, findOne } from './domQuery';

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
    const enabledWeekdays = await waitForElms('[role="gridcell"][data-afr-adfday="nm"]:not([aria-disabled])') as HTMLInputElement[];
    enabledWeekdays.forEach(el => el.click());
    (await findOne('img[title="Close"]')).click();
    (await findOne('//a[span="OK"]', true)).click();
}