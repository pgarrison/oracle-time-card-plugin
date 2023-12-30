// Saves options to chrome.storage
const saveOptions = () => {
    const projectCode = document.getElementById('project-code').value;
    const task = document.getElementById('task').value;
    const expenditureType = document.getElementById('expenditure-type').value;

    chrome.storage.sync.set(
        { projectCode, task, expenditureType },
        () => {
            // Update status to let user know options were saved.
            const status = document.getElementById('status');
            status.textContent = 'Saved.';
            setTimeout(() => {
                status.textContent = '';
            }, 750);
        });
};
    
// Restores select box and checkbox state using the preferences
// stored in chrome.storage.
const restoreOptions = () => {
    chrome.storage.sync.get(
        {
            projectCode: '103-01-001-10 : Allen Cell Science Activities',
            task: 'Default : Default',
            expenditureType: 'Regular - Straight Time',
        },
        (items) => {
            document.getElementById('project-code').value = items.projectCode;
            document.getElementById('task').value = items.task;
            document.getElementById('expenditure-type').value = items.expenditureType;
        });
};

document.addEventListener('DOMContentLoaded', restoreOptions);
document.getElementById('save').addEventListener('click', saveOptions);
