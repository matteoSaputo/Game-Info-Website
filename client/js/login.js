document.getElementById('loginForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    const password = document.getElementById('password').value;
    const username = document.getElementById('username').value;
    const loginMessage = document.getElementById('loginMessage');

    try {
        const response = await fetch('http://localhost:3001/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ password, username })
        });
        const data = await response.json(); // Extract JSON data from the response
        
        if (data.error == null) {
            // Redirect to dashboard
            window.location.href = './index.html';
        } else {
            loginMessage.textContent = data.error;
        }
    } catch (error) {
        console.error('Error logging in:', error.message);
        loginMessage.textContent = 'Error logging in. Please try again later.';
    }
});
