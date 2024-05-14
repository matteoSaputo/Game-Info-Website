// Function to get games from node backend
async function getGames() {
    try {
        const response = await fetch('http://localhost:3001/game', {
            method: 'GET'
        });
        // Check if response is successful
        if (!response.ok) {
            throw new Error('Failed to fetch games');
        }
        const data = await response.json(); // Extract JSON data from the response
        return data; // Return the extracted data
    } catch (error) {
        console.error('Error fetching games:', error.message);
        return []; // Return an empty array in case of an error
    }
}

// Function to render games as a scroll of pictures
async function renderGameScroll() {
    const games = await getGames();
    const gameScroll = document.getElementById('gameScroll');
    gameScroll.innerHTML = '';

    games.forEach(game => {
        // Create a container div for the clickable area
        const gameContainer = document.createElement('div');
        gameContainer.classList.add('game-container');

        // Create an anchor tag for the image
        const gameLink = document.createElement('a');
        gameLink.href = `game.html?id=${game.id}`; // Link to game page
        gameLink.classList.add('game-link');

        // Create a paragraph tag for the game title
        const gameTitle = document.createElement('p');
        gameTitle.textContent = game.title; // Set the text content to the game title

        // Create an image tag for the game thumbnail
        const gameImg = document.createElement('img');
        gameImg.src = game.thumbnail;

        // Append the image to the anchor tag
        gameLink.appendChild(gameImg);

        // Append the title and the anchor tag to the container div
        gameContainer.appendChild(gameTitle);
        gameContainer.appendChild(gameLink);

        // Append the container div to the game scroll container
        gameScroll.appendChild(gameContainer);
    });

    // Use setTimeout to repeat the scroll after a certain interval
    setTimeout(renderGameScroll, 5000); // Repeat every 5 seconds (adjust as needed)
}



// Call the renderGameScroll function when the page loads
window.onload = renderGameScroll;
