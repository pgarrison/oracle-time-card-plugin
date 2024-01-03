import { v4 as uuidv4 } from 'uuid';

type Event = {
    type: string,
    message?: string
}

const ENDPOINT = 'https://www.google-analytics.com/mp/collect';
const MEASUREMENT_ID = 'G-1FJ6WGED0Z';
// Google calls this a secret but it cannot actually be kept secret from the user, since it needs to
// be sent in the request body in plaintext
const API_SECRET = 't9gjFt5pRrOCONtfbr5M2g';

export function sendEvents(events: Event[]) {
    return fetch(ENDPOINT + '?' + new URLSearchParams({
        measurement_id: MEASUREMENT_ID,
        api_secret: API_SECRET,
    }), {
        method: "POST",
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            client_id: `bwicxmdh${uuidv4()}`,
            events
        })
    }).then(response => {
        if (!response.ok) {
          throw new Error(response.statusText)
        }
        return response.json()
    });
}

export function sendError(error: Error) {
  sendEvents([{ type: "error", message: error.toString() }]);
  return error;
}