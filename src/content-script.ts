import TimeCardOptions from './time-card'
import fillOutForm from './lib/fill-form'
import { navigateToAddTimeCard, isAddTimeCard } from './lib/navigate-to-time-cards'

chrome.runtime.onMessage.addListener(
    async function(request: TimeCardOptions) {
        console.log('Extension activated');
        await navigateToAddTimeCard();
        if (!isAddTimeCard()) {
            console.log('Time sheet autofiller activated on unsupported page.');
            return;
        }
        fillOutForm(request);
    }
);
