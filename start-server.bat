@echo off
title HTML to Image Converter - Local Server
echo.
echo ========================================
echo  HTML to Image Converter - Local Server
echo ========================================
echo.
echo Starting server...
echo.

REM Try uv first (fastest), then fall back to standard Python
uv run server.py
if errorlevel 1 (
    echo uv not found or failed, trying python...
    python server.py
    if errorlevel 1 (
        echo python not found, trying python3...
        python3 server.py
        if errorlevel 1 (
            echo.
            echo ERROR: No Python runtime found!
            echo Please install Python from https://python.org
            echo Or install uv from https://docs.astral.sh/uv/
            echo.
            pause
            exit /b 1
        )
    )
)

pause
