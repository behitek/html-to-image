#!/bin/bash

echo "========================================"
echo " HTML to Image Converter - Local Server"
echo "========================================"
echo ""
echo "Starting server..."
echo ""

# Check if uv is available (fastest), then fall back to standard Python
if command -v uv &> /dev/null; then
    echo "Using uv (fast Python runner)..."
    uv run server.py
elif command -v python3 &> /dev/null; then
    echo "Using python3..."
    python3 server.py
elif command -v python &> /dev/null; then
    echo "Using python..."
    python server.py
else
    echo "ERROR: No Python runtime found!"
    echo "Please install Python from https://python.org"
    echo "Or install uv from https://docs.astral.sh/uv/"
    exit 1
fi
