// Function to get the game ID from the URL query parameters
function getGameIdFromUrl() {
    const queryString = window.location.search;
    const urlParams = new URLSearchParams(queryString);
    return urlParams.get('id');
}

async function getGameDetails() {
    try {
        const response = await fetch(`http://localhost:3001/game/${getGameIdFromUrl()}`, {
            method: 'GET'
        });
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch game');
        }
        const data = await response.json(); // Extract JSON data from the response
        return data; // Return the extracted data
    } catch (error) {
        console.error('Error fetching games:', error.message);
        return {}; // Return an empty array in case of an error
    }
}

document.getElementById('reviewForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;
    const reviewText = document.getElementById('reviewText').value;
    const rating = document.getElementById('rating').value;
    const gameId = getGameIdFromUrl(); // Replace with actual game ID
    
    try {
        const response = await fetch(`http://localhost:3001/game/${gameId}/reviews`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({ username, password, reviewText, rating })
        });

        const data = await response.json();

        if (data.error == null) {
            alert('Review submitted successfully!');
        } else {
            const data = await response.json();
            alert('Error submitting review: ' + data.error);
        }
    } catch (error) {
        console.error('Error submitting review:', error.message);
        alert('Error submitting review. Please try again later.');
    }
});

// Function to render game details
async function renderGameDetails() {
    const gameDetails = await getGameDetails();

    const gameDetailsDiv = document.getElementById('gameDetails');
    gameDetailsDiv.innerHTML = `
        <img src="${gameDetails.thumbnail}" alt="${gameDetails.title}">
        <p><strong>Title:</strong> ${gameDetails.title}</p>
        <p><strong>Genre:</strong> ${gameDetails.genre}</p>
        <p><strong>Company:</strong> ${gameDetails.company}</p>
        <p><strong>System:</strong> ${gameDetails.system}</p>
        <p><strong>Release Date:</strong> ${gameDetails.releaseDate}</p>
        <p><strong>Description:</strong> ${gameDetails.description}</p>
    `;
}

// Call the renderGameDetails function when the page loads
window.onload = renderGameDetails;
