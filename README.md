# Allen Institute Oracle Time Card Plugin
Chrome extension for autofilling Allen Institute time cards.
With a single click, you can fill out a time card with a single time code for 8 hours M-F.

## Installation
Currently only Chrome is supported.

1. Download the `time-card-extension.zip` or `time-card-extension.tar.gz` [latest release](https://github.com/pgarrison/oracle-time-card-plugin/releases/).
2. Move the archive to a place where it won't be deleted (perhaps not in your Downloads folder), and extract the contents of the archive (on Windows: right click -> Extract All). The zip/tar archive can be deleted, but the extension will stop working if the `time-card-extension` folder is deleted.
3. In Chrome, navigate to `chrome://extensions`. In the upper-right corner, enable "Developer Mode."
4. Click "Load Unpacked" and select the `time-card-extension` folder.
5. Pin the time card extension to the Chrome toolbar by clicking the extension puzzle piece icon (top right of Chrome) and clicking the pin icon for this extension.

## Configuration
To select which time code (and task and expenditure type) are autofilled, right click on the extension icon, then select Options.

Enter your desired options and click Save. The entries should match those in Oracle as closely as possible, or the autofill may fail.

## Usage
The extension can be used from the following Allen Institute Oracle pages:
* Add Time Card
* Existing Time Cards
* Time and Absences

On these pages, the extension icon will light up.

Click the extension icon to automatically create a new time card and fill in your details for 8 hours each day M-F.
The extension should create a time card for the next week that does not yet have a time card.

NOTE: If you are late submitting your time card, the extension by default will create a time card for the upcoming week. To autofill a time card for the past/current week, navigate to the Add Time Card page and change the Date field as usual. Then click the extension icon.

NOTE: The extension will not save the time card, in case you want to edit/add any days. Don't forget to save the time card.
