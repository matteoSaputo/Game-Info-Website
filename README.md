# Game Info Website

## Table of Contents
- [Introduction](#introduction)
- [Features](#features)
- [Technologies Used](#technologies-used)
- [Installation](#installation)
- [Usage](#usage)
- [API Endpoints](#api-endpoints)
- [Database Schema](#database-schema)
- [Future Enhancements](#future-enhancements)
- [Contributors](#contributors)

## Introduction
The Game Info Website is a comprehensive platform that allows users to browse, search, and review video games. It features a dynamic dashboard with a scrolling display of game images, user authentication for posting reviews, and a search functionality to find games based on various criteria.

## Features
- **Dynamic Game Dashboard**: A scrolling display of game images fetched from the backend.
- **User Authentication**: Secure login and registration system.
- **Game Reviews**: Users can submit reviews for games after logging in.
- **Search Functionality**: Search for games by name, genre, company, or system.
- **Responsive Design**: Optimized for various devices and screen sizes.

## Technologies Used
- **Frontend**: HTML, CSS, JavaScript
- **Backend**: Node.js, Express.js
- **Database**: MySQL, Sequelize
- **Authentication**: bcrypt for password hashing
- **API Integration**: RAWG Video Games Database API

## Installation
1. **Clone the repository:**
   ```bash
   git clone https://github.com/yourusername/game-info-website.git
   cd game-info-website
2. **Install Dependencies:**
   ```bash
   npm install
3. **Set up the database:**
   Ensure you have SQLite installed. Run the migrations and seed the database if necessary.
   ```bash
   npx sequelize-cli db:migrate
   npx sequelize-cli db:seed:all
4. **Start the server:**
   ```bash
   npm start

## Usage
1. **Access the Website:**
   Open your browser and navigate to the HTML files located in the `client` folder.

2. **Navigate the Site:**
   - Use the navigation bar to switch between the Dashboard, Search, Profile, Login, and Register pages.
   - Click on game images on the Dashboard to view detailed information.
   - Use the search functionality to find specific games.

3. **User Authentication:**
   - Register a new account or log in with existing credentials to access features like posting reviews.

4. **Post Reviews:**
   - After logging in, navigate to the game details page and submit a review for the game.

5. **Explore Game Details:**
   - Click on a game image on the Dashboard to view detailed information about the game, including its title, genre, company, system, release date, and description.

## API Endpoints
- **POST /games/:gameId/reviews**: Submit a review for a specific game.
- **GET /games/search**: Search for games based on specified criteria.
- **GET /games/:id**: Retrieve details of a specific game by its ID.
- **GET /games**: Retrieve a list of all games.
- **POST /games/populate**: Populate the game table with data from an external API.
- **POST /games**: Create a new game entry.
- **POST /users/signup**: Create a new user account.
- **POST /users/login**: Authenticate a user.

## Database Schema
The database schema includes tables for Users, Games, and Reviews:
- **User Table**: Stores user information such as username, email, and password hash.
- **Game Table**: Contains information about each game, including title, genre, company, system, release date, and description.
- **Review Table**: Holds reviews submitted by users for specific games, including the rating and comment.

## Future Enhancements
- Implement sessions or tokens for user authentication.
- Enhance frontend with more interactive features and animations.
- Add pagination to handle large datasets more efficiently.
- Improve error handling and validation in backend endpoints.

## Contributors
- [Matteo Saputo](https://github.com/matteoSaputo)

   
