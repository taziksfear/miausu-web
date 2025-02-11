# Miausu future site

miausu-web is a frontend web application developed using SvelteKit for the [bancho.py backend by Akatsuki](https://github.com/osuAkatsuki/bancho.py).


## Features

- [x] **Multi Language:** Allows users to choose their preferred language.
- [x] **User Pages:** Allows users to view their profiles and statistics.
- [x] **Login:** Provides a secure authentication system for users to log in to their accounts.
- [x] **Beatmap Pages:** Enables users to browse and view details of available beatmaps on this bancho.py instance.
- [x] **Leaderboards:** Displays rankings of players based on various metrics.
- [x] **Register:** Implementation of user registration functionality.
- [x] **User Settings:** Allow users to customize their account settings and preferences.
- [x] **Beatmap Requests:** Ability for users to request new beatmaps to be ranked/loved/approved.
- [ ] **Admin Panel:** A secure area for administrators to manage users, beatmaps, and system settings. (never)

## Requirements

- a working bancho.py instance
- Npm
- Redis
- MySQL

## Getting Started

To get started with miausu-web, follow these steps:

1. **Clone the Repository:** Clone the bpy-web repository to your local machine using Git:

   ```
   git clone https://github.com/taziksfear/miausu-web
   ```

2. **Install npm:** Before we start with installing the dependencies you might not have npm installed yet:

   ```
   curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
   source ~/.bashrc
   nvm install node
   ```

3. **Install Dependencies:** Navigate into the project directory and install the necessary dependencies using npm:

   ```
   cd miausu-web
   npm i
   ```

4. **Configure .env:** Copy the sample .env file to .env and configure it with the appropriate API endpoints and other settings:

   ```
   cp example.env .env
   ```

5. **Compile and run:** Compile and start the frontend:

   ```
   npm run build
   npm run dev
   ```

6. **Open in Browser:** Once the development server is running, open your web browser and navigate to `http://localhost:5173` to view the application.

