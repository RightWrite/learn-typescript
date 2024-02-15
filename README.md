# learn-typescript

# Step1: Create Github Repository

# Step 2: Initialize environment and IDE 
mkdir chapter2
cd chapter2

node -v
npm init  -> this will create package.json


npm install -global typescript 
tsc -v


tsc --init --sourceMap --rootDir src --outDir dist    --> creates tsconfig.json

mkdir src
cd src
touch index.ts


npm install --save-dev typescript tslint @types/node   -> for enabling auto debug 

Refer this video for setting up debgiing and auto change loaidng https://www.youtube.com/watch?v=4zdBk6wisxc