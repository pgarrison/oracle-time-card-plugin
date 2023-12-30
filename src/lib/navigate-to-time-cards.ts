import { findOne } from "./domQuery";

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

export function isAddTimeCard() {
    return Boolean(document.querySelector('[title="Add Time Card"]'));
}

export async function navigateToAddTimeCard() {
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