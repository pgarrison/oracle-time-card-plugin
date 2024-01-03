import { waitForElms } from './domQuery';

export default async function getWeekdayCells() {
    const enabledDays = await waitForElms('[role="gridcell"]:not([aria-disabled])') as HTMLInputElement[];
    // Get the last five enabled days. Cannot assume that there are seven enabled days shown: if the
    // Saturday is in the previous month, it is hidden.
    return enabledDays.slice(-5);
}