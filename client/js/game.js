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
