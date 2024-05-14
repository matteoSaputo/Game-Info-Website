// Sample data for user profile (replace with your actual data)
const userProfile = {
    username: "User123",
    email: "user123@example.com",
    favoriteGames: ["Game 1", "Game 2"]
};

// Function to render user profile information
function renderUserProfile() {
    const userInfo = document.getElementById('userInfo');
    userInfo.innerHTML = `<p>Username: ${userProfile.username}</p><p>Email: ${userProfile.email}</p>`;
}

// Function to render favorite games
function renderFavoriteGames() {
    const favoriteGames = document.getElementById('favoriteGames');
    favoriteGames.innerHTML = '<h2>Favorite Games</h2>';

    userProfile.favoriteGames.forEach(game => {
        const gameItem = document.createElement('p');
        gameItem.textContent = game;
        favoriteGames.appendChild(gameItem);
    });
}

// Call the renderUserProfile and renderFavoriteGames functions when the page loads
window.onload = function () {
    renderUserProfile();
    renderFavoriteGames();
};
