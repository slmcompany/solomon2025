#!/bin/bash

# Create directories if they don't exist
mkdir -p public/images/metal-casting
mkdir -p public/images/metal-fabrication

# Download Metal Casting images
curl -o public/images/metal-casting/header.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/die-casting-header.jpg
curl -o public/images/metal-casting/process-1.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/die-casting-process-1.jpg
curl -o public/images/metal-casting/process-2.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/die-casting-process-2.jpg
curl -o public/images/metal-casting/process-3.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/die-casting-process-3.jpg
curl -o public/images/metal-casting/process-4.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/die-casting-quality.jpg

# Download Metal Fabrication images
curl -o public/images/metal-fabrication/header.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/cnc-machining-header.jpg
curl -o public/images/metal-fabrication/cnc-1.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/cnc-machining-1.jpg
curl -o public/images/metal-fabrication/sheet-1.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/sheet-metal-1.jpg
curl -o public/images/metal-fabrication/welding-1.jpg https://redstonemanufacturing.com/wp-content/uploads/2023/03/welding-1.jpg

# Download icons
curl -o public/images/die-casting-icon.svg https://redstonemanufacturing.com/wp-content/uploads/2023/03/die-casting-icon.svg
curl -o public/images/investment-casting-icon.svg https://redstonemanufacturing.com/wp-content/uploads/2023/03/investment-casting-icon.svg
curl -o public/images/sand-casting-icon.svg https://redstonemanufacturing.com/wp-content/uploads/2023/03/sand-casting-icon.svg
curl -o public/images/cnc-machining-icon.svg https://redstonemanufacturing.com/wp-content/uploads/2023/03/cnc-icon.svg
curl -o public/images/sheet-metal-icon.svg https://redstonemanufacturing.com/wp-content/uploads/2023/03/sheet-metal-icon.svg
curl -o public/images/welding-icon.svg https://redstonemanufacturing.com/wp-content/uploads/2023/03/welding-icon.svg 