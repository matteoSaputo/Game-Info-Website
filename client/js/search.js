// Function to handle form submission and perform search
document.getElementById('searchForm').addEventListener('submit', async function(event) {
    event.preventDefault(); // Prevent form submission
    const searchQuery = document.getElementById('searchQuery').value;
    const searchCriteria = document.getElementById('searchCriteria').value;
    const searchResultsDiv = document.getElementById('searchResults');
    
    try {
        const response = await fetch(`http://localhost:3001/game/search?criteria=${searchCriteria}&query=${searchQuery}`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json'
            }
        });
        const data = await response.json(); // Extract JSON data from the response

        // Display search results
        renderSearchResults(data);
    } catch (error) {
        console.error('Error fetching search results:', error.message);
        searchResultsDiv.innerHTML = '<p>Error fetching search results. Please try again later.</p>';
    }
});

// Function to render search results
function renderSearchResults(results) {
    const searchResultsDiv = document.getElementById('searchResults');
    searchResultsDiv.innerHTML = ''; // Clear previous search results
    console.log(results);
    if (results.length === 0) {
        searchResultsDiv.innerHTML = '<p>No results found.</p>';
    } else {
        results.forEach(result => {
            // Create HTML elements to display search results
            const resultElement = document.createElement('div');
            resultElement.classList.add('search-result');

            const title = document.createElement('h3');
            title.textContent = result.title;
            resultElement.appendChild(title);

            const thumbnail = document.createElement('img');
            thumbnail.src = result.thumbnail;
            resultElement.appendChild(thumbnail);

            const description = document.createElement('p');
            description.textContent = result.description;
            resultElement.appendChild(description);

            // Add resultElement to searchResultsDiv
            searchResultsDiv.appendChild(resultElement);
        });
    }
}
