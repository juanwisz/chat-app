var userInputField = document.getElementById('userInputField');
var chatBox = document.getElementById('chatBox');
var userInputForm = document.getElementById('userInputForm');

// Add an event listener for the form submission
userInputForm.addEventListener('submit', function(event) {
    event.preventDefault();

    var userMessage = userInputField.value;
    userInputField.value = '';

    chatBox.innerHTML += '<div class="user-message">' + userMessage + '</div>';

    fetch('/bot', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userMessage: userMessage }),
        mode: 'cors',
    })
    .then(response => response.json())
    .then(data => {
        chatBox.innerHTML += '<div class="bot-reply">' + data.botReply + '</div>';
    })
    .catch(error => {
        console.error("Error: ", error);
    });
});
