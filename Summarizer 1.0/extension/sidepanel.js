document.addEventListener('DOMContentLoaded', () => {
    chrome.storage.local.get(['summaryNotes'], function(result) {
        if (result.summaryNotes) {
            document.getElementById('notes').value = result.summaryNotes;
        }
    });
    document.getElementById('summarizeBtn').addEventListener('click', summarizeText);
    document.getElementById('SaveNotesBtn').addEventListener('click', saveNotes);
    document.getElementById('CopyTextbtn').addEventListener('click', copyText);
});

async function summarizeText() {
    try {
        const [tab] = await chrome.tabs.query({ active: true, currentWindow: true });
        const [{result}] = await chrome.scripting.executeScript({
            target: { tabId: tab.id },
            function: () => window.getSelection().toString()
        });
        if (!result){
            showResult('Please select some text to summarize.');
            return;
        }

        const response = await fetch('http://localhost:8080/api/Summarize/process' , {
            method: 'POST',
            headers: {'content-type': 'application/json'},
            body: JSON.stringify({content: result, operation: 'summarize'})
        });
        if (!response.ok) {
            throw new Error(`API Error: ${response.status}`);
        }
        const text = await response.text();
        showResult(text.replace(/\n/g, '<br>'), true);

    } catch (error) {
        showResult('Error: ' + error.message, false);
    }

}

async function saveNotes() {
    const notes = document.getElementById('notes').value;
    chrome.storage.local.set({summaryNotes: notes}, function() {
        alert('Notes saved');
    });
}

function showResult(content, isSuccessfulSummary) {
    document.getElementById('results').innerHTML = `<div class="result-item"><div class="result-content">${content}</div></div>`;
    const copyBtn = document.getElementById('CopyTextbtn');
    if(isSuccessfulSummary){
        copyBtn.style.display = 'block';
    } else {
        copyBtn.style.display = 'none';
    }
}

function copyText() {
    const resultContent = document.querySelector('.result-content');
    if (resultContent) {
        const textToCopy = resultContent.innerText;
       navigator.clipboard.writeText(textToCopy).then(() => {
           alert('Text copied to clipboard');
       }).catch(err => {
           console.error('Error copying text: ', err);
       });
    }
}
