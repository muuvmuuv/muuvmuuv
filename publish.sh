#!/usr/bin/env bash

# Exit immediately if a command exits with a non-zero status
set -e

echo "Starting package publishing process..."
echo ""

# Loop through each package in the packages directory
for package_dir in packages/*; do
	# Extract package name from directory path
	package_name=$(basename "$package_dir")

	echo "Publishing package: $package_name"
	echo "---"

	# Publish the package with provenance
	pnpm --filter "$package_name" publish --provenance

	echo "Successfully published $package_name"
	echo ""
done

echo "All packages published successfully!"
