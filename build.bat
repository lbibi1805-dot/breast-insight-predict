@echo off
REM Breast Insight Predict - Windows Build Script

setlocal enabledelayedexpansion

echo 🩺 Breast Insight Predict - Build ^& Deploy Script
echo ==================================================

REM Check if Node.js is installed
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js is not installed. Please install Node.js 18 or higher.
    exit /b 1
)

echo ℹ️  Node.js version:
node --version

REM Check if npm is installed
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm is not installed. Please install npm.
    exit /b 1
)

echo ℹ️  npm version:
npm --version

echo.
echo ℹ️  Installing dependencies...
call npm ci
if errorlevel 1 (
    echo ❌ Failed to install dependencies
    exit /b 1
)
echo ✅ Dependencies installed successfully

echo.
echo ℹ️  Running ESLint...
call npm run lint
if errorlevel 1 (
    echo ❌ Linting failed
    exit /b 1
)
echo ✅ Code linting passed

echo.
echo ℹ️  Building application for production...
call npm run build
if errorlevel 1 (
    echo ❌ Build failed
    exit /b 1
)
echo ✅ Application built successfully

echo.
echo 🚀 Application ready for deployment!
echo ℹ️  Built files are in the 'dist' directory
echo ℹ️  You can preview the build by running: npm run preview

pause
