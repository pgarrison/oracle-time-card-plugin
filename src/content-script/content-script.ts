import { SupportQuery, Supported, TimeCardOptions } from '../time-card.d'
import fillOutForm from './lib/fill-form'
import { navigateToAddTimeCard, isSupportedPage } from './lib/navigate-to-time-cards'

chrome.runtime.onMessage.addListener(
    async function(request: TimeCardOptions | SupportQuery, _, sendResponse) {
        if (request.messageType === 'support') {
            sendResponse(isSupportedPage());
        } else {
            if (!isSupportedPage()) {
                console.log('Time sheet autofiller activated on unsupported page.');
                return;
            }
            await navigateToAddTimeCard();
            fillOutForm(request);
        }
    }
);

// This updates the icon color whenever a new page is loaded. While the user navigates within
// Oracle, only some pages are supported.
const message: Supported = { supported: isSupportedPage() };
chrome.runtime.sendMessage(message);
