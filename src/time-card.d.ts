// Send to content script when plugin is clicked
export type TimeCardOptionsMessage = {
    messageType: 'click';
    projectCode: string;
    task: string;
    expenditureType: string;
}
export type TimeCardOptions = {
    projectCode: string;
    task: string;
    expenditureType: string;
}
// SupportQuery asks if the page is supported
export type SupportQuery = {
    messageType: 'support';
}
// Support message from client
export type Supported = {
    supported: boolean
}