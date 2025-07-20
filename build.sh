#!/bin/bash

# Breast Insight Predict - Build and Deploy Script
# This script handles building and deploying the application

set -e  # Exit on any error

echo "🩺 Breast Insight Predict - Build & Deploy Script"
echo "=================================================="

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Functions
log_info() {
    echo -e "${BLUE}ℹ️  $1${NC}"
}

log_success() {
    echo -e "${GREEN}✅ $1${NC}"
}

log_warning() {
    echo -e "${YELLOW}⚠️  $1${NC}"
}

log_error() {
    echo -e "${RED}❌ $1${NC}"
}

# Check if Node.js is installed
check_node() {
    if ! command -v node &> /dev/null; then
        log_error "Node.js is not installed. Please install Node.js 18 or higher."
        exit 1
    fi
    
    NODE_VERSION=$(node --version | cut -d'v' -f2)
    log_info "Node.js version: $NODE_VERSION"
}

# Check if npm is installed
check_npm() {
    if ! command -v npm &> /dev/null; then
        log_error "npm is not installed. Please install npm."
        exit 1
    fi
    
    NPM_VERSION=$(npm --version)
    log_info "npm version: $NPM_VERSION"
}

# Install dependencies
install_deps() {
    log_info "Installing dependencies..."
    npm ci
    log_success "Dependencies installed successfully"
}

# Run linting
run_lint() {
    log_info "Running ESLint..."
    npm run lint
    log_success "Code linting passed"
}

# Build the application
build_app() {
    log_info "Building application for production..."
    npm run build
    log_success "Application built successfully"
}

# Preview the build
preview_build() {
    log_info "Starting preview server..."
    log_warning "Press Ctrl+C to stop the preview server"
    npm run preview
}

# Docker build
build_docker() {
    log_info "Building Docker image..."
    docker build -t breast-insight-predict:latest .
    log_success "Docker image built successfully"
}

# Docker run
run_docker() {
    log_info "Running Docker container..."
    docker run -d -p 3000:80 --name breast-insight-predict breast-insight-predict:latest
    log_success "Docker container started on http://localhost:3000"
}

# Main deployment function
deploy() {
    log_info "Starting deployment process..."
    
    check_node
    check_npm
    install_deps
    run_lint
    build_app
    
    log_success "🚀 Application ready for deployment!"
    log_info "Built files are in the 'dist' directory"
    log_info "You can preview the build by running: npm run preview"
}

# Docker deployment
deploy_docker() {
    log_info "Starting Docker deployment..."
    
    build_docker
    run_docker
    
    log_success "🐳 Docker deployment completed!"
    log_info "Application is running at http://localhost:3000"
}

# Help function
show_help() {
    echo "Usage: ./build.sh [OPTION]"
    echo ""
    echo "Options:"
    echo "  deploy        Build and prepare for deployment"
    echo "  docker        Build and run with Docker"
    echo "  preview       Build and preview locally"
    echo "  lint          Run linting only"
    echo "  build         Build only"
    echo "  help          Show this help message"
    echo ""
    echo "Examples:"
    echo "  ./build.sh deploy     # Full deployment build"
    echo "  ./build.sh docker     # Docker deployment"
    echo "  ./build.sh preview    # Build and preview"
}

# Parse command line arguments
case "${1:-deploy}" in
    "deploy")
        deploy
        ;;
    "docker")
        deploy_docker
        ;;
    "preview")
        deploy
        preview_build
        ;;
    "lint")
        check_node
        check_npm
        install_deps
        run_lint
        ;;
    "build")
        check_node
        check_npm
        install_deps
        build_app
        ;;
    "help"|"-h"|"--help")
        show_help
        ;;
    *)
        log_error "Unknown option: $1"
        show_help
        exit 1
        ;;
esac
