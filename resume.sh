#!/usr/bin/env bash


check_nvm_installed() {
    if type 'nvm' > /dev/null; then
        curl -o- https://raw.githubusercontent.com/creationix/nvm/v0.33.0/install.sh | bash
        export NVM_DIR="$HOME/.nvm"
        [ -s "$NVM_DIR/nvm.sh" ] && . "$NVM_DIR/nvm.sh"
    fi
}


setup() {
    check_nvm_installed
    nvm install node
    nvm use node
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
