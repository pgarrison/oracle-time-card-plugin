import { SupportQuery, Supported, TimeCardOptionsMessage } from './time-card'
import fillOutForm from './content-script/fill-form'
import { navigateToAddTimeCard, isSupportedPage } from './content-script/navigate-to-time-cards'
import { sendError } from './analytics/analytics';

async function navigateAndFill(request: TimeCardOptionsMessage) {
    await navigateToAddTimeCard();
    return fillOutForm(request);
}

chrome.runtime.onMessage.addListener(
    async function(request: TimeCardOptionsMessage | SupportQuery, _, sendResponse) {
        if (request.messageType === 'support') {
            sendResponse(isSupportedPage());
        } else {
            if (!isSupportedPage()) {
                console.log('Time sheet autofiller activated on unsupported page.');
                return;
            }
            navigateAndFill(request).catch(sendError);
        }
    }
);

// This updates the icon color whenever a new page is loaded. While the user navigates within
// Oracle, only some pages are supported.
const message: Supported = { supported: isSupportedPage() };
chrome.runtime.sendMessage(message);
