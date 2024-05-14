document.getElementById('registerForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const email = document.getElementById('email').value;
    const password = document.getElementById('password').value;
    const registerMessage = document.getElementById('registerMessage');

    try {
        const response = await fetch('http://localhost:3001/auth', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, email, password })
        });
        const data = await response.json(); // Extract JSON data from the response
        
        if (response.ok) {
            // Redirect to login page after successful registration
            window.location.href = './login.html';
        } else {
            registerMessage.textContent = data.error;
        }
    } catch (error) {
        console.error('Error registering:', error.message);
        registerMessage.textContent = 'Error registering. Please try again later.';
    }
});
