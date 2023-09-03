// Constants
const apiKey = "WBnFUhKpezOtMtha9g19cPSmUfzhzh0aJKSs5AYa";
const searchForm = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const currentImageContainer = document.getElementById("current-image-container");
const searchHistoryList = document.getElementById("search-history");

// Function to fetch and display the current image of the day
function getCurrentImageOfTheDay() {
    const currentDate = new Date().toISOString().split("T")[0];
    getImageOfTheDay(currentDate);
}

// Function to fetch and display an image for a given date
function getImageOfTheDay(date) {
    const apiUrl = `https://api.nasa.gov/planetary/apod?api_key=${apiKey}&date=${date}`;
    
    fetch(apiUrl)
        .then(response => response.json())
        .then(data => {
            // Display the image and title
            currentImageContainer.innerHTML = `
                <img src="${data.url}" alt="${data.title}" width="100%">
                <h3>${data.title}</h3>
            `;
            
            // Save the date to local storage and add it to the search history
            saveSearch(date);
            addSearchToHistory();
        })
        .catch(error => {
            console.error("Error fetching data:", error);
        });
}

// Function to save a search date to local storage
function saveSearch(date) {
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.push(date);
    localStorage.setItem("searches", JSON.stringify(searches));
}

// Function to display search history from local storage
function addSearchToHistory() {
    searchHistoryList.innerHTML = "";
    const searches = JSON.parse(localStorage.getItem("searches")) || [];
    searches.forEach(date => {
        const listItem = document.createElement("li");
        listItem.textContent = date;
        listItem.addEventListener("click", () => getImageOfTheDay(date));
        searchHistoryList.appendChild(listItem);
    });
}

// Event listener for form submission
searchForm.addEventListener("submit", function(event) {
    event.preventDefault();
    const selectedDate = searchInput.value;
    getImageOfTheDay(selectedDate);
});

// Initialize the page with the current image of the day and search history
getCurrentImageOfTheDay();
addSearchToHistory();
