## Demo Video

[Watch the 2-minute demo on Loom](https://www.loom.com/share/995fecd9806b454781db4d6dd988a7a3)

# Recursive Tree File Explorer (MEVN Stack)

## Overview
This project is a full-stack file/folder explorer built with MongoDB, Express.js, Vue.js (3.x), and Node.js. It demonstrates recursion, lazy-loading, and modular Vue components.

## Features
- Sidebar displays folders and files
- Folders are expandable; clicking toggles their children
- Lazy loading: folder contents are fetched from the API only when expanded
- Responsive design (standard CSS)

## Setup Instructions

### Prerequisites
- Node.js & npm
- MongoDB Atlas (recommended)

### Backend Setup
1. Open a terminal in the `backend` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Set up your MongoDB Atlas connection in `.env`:
   ```env
   MONGO_URI=<your Atlas URI>
   PORT=5000
   ```
4. Start the backend server:
   ```sh
   node server.js
   ```
5. Seed the database:
   ```sh
   Invoke-WebRequest -Uri http://localhost:5000/api/seed -Method GET
   ```

### Frontend Setup
1. Open a terminal in the `frontend` directory.
2. Install dependencies:
   ```sh
   npm install
   ```
3. Start the Vue development server:
   ```sh
   npm run serve
   ```
4. Open [http://localhost:8080](http://localhost:8080) in your browser.

## Data Flow Explanation
- The Vue sidebar fetches root folders/files from `/api/files`.
- When a folder is expanded, it fetches children from `/api/files?parentId=...`.
- The backend uses a self-referencing MongoDB schema for files/folders.


