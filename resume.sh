#!/usr/bin/env bash


install_nvm() {
    curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
    export NVM_DIR="$HOME/.nvm"
    [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
}


setup() {
    echo "Installing/Updating nvm"
    install_nvm

    echo "Installing node"
    nvm install node

    echo "Using latest node version"
    nvm use node

    echo "Installing npm packages"
    npm install
}


build() {
    node populate.js
}


if [ $# -eq 0 ]; then
    echo "Error: No command supplied"
elif [ $1 == "setup" ]; then
    setup
elif [ $1 == "build" ]; then
    build
fi
