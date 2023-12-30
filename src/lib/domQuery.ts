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
export function waitForElms(selector: string, xpath?: boolean): Promise<HTMLElement[]> {
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


export async function findOne(selector: string, xpath?: boolean) {
    const results = await waitForElms(selector, xpath);
    if (results.length > 1) {
        console.warn('Time sheet autofiller found multiple items matching query! May work incorrectly. Please report this.')
    }
    console.log(results);
    return results[0];
}