#!/bin/bash
# This script runs during the build phase on Render

echo "Starting build process..."

# Install frontend dependencies explicitly
echo "Installing frontend dependencies..."
cd frontend
npm ci || npm install
# Double-check that the vital package is installed
if [ ! -d "node_modules/@vitejs" ]; then
  echo "@vitejs/plugin-react not found, installing explicitly..."
  npm install --save-dev @vitejs/plugin-react
fi
# Build the frontend
echo "Building frontend..."
npm run build

# Install backend dependencies
echo "Installing backend dependencies..."
cd ../backend
npm ci || npm install
# Double-check that the vital package is installed
if [ ! -d "node_modules/path-to-regexp" ]; then
  echo "path-to-regexp not found, installing explicitly..."
  npm install --save path-to-regexp
fi

# Return to root directory
cd ..
echo "Build process completed."