#!/bin/bash
# This script runs during the build phase on Render

# Install frontend dependencies
cd frontend
npm install --save-dev @vitejs/plugin-react
npm install
npm run build

# Install backend dependencies
cd ../backend
npm install path-to-regexp
npm install

# Return to root directory
cd ..