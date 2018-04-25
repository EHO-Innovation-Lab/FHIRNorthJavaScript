# DHDR Node.js Viewer
This viewer was made to demonstrate how a Node.js web application can interact with Innovation Lab's DHDR. Queries are made by submitting a health card number to its own controller. From there, a query is built and then sent to Innovation Lab's DHDR server. A bundle is then returned and displayed client side.

## Getting Started
These instructions will help you download and install the project on your local machine for development and testing purposes.

### Before You Begin
Make sure you have the following installed:

- Node.js (make sure npm is included in the installation)
- Git Bash

### Downloading the Program
Download the program from the [Innovation Lab](https://innovation-lab.ca/) in the [Code Sharing Repository](https://innovation-lab.ca/repository).

## Running the Program
1. Open Git Bash and navigate to the root directory of the program. 
2. Replace the ```<directory-name>``` portion of ```var app = require('../<directory-name>');``` in ```bin/www```
3. Enter the command:
```npm start```
4. Open the browser enter ```localhost:3000``` as the url in the address bar.


## Issues with Start-up
On run of the ```npm start``` command, you may receive this error:
```Error: Cannot find module 'http-errors'```
    ```at Function.Module._resolveFilename (module.js:547:15)```
    ```at Function.Module._load (module.js:474:25)```
    ```at Module.require (module.js:596:17)```
    ```at require (internal/module.js:11:18)```
    ```at Object.<anonymous> (<directory>\app.js:1:81)```
    ```at Module._compile (module.js:652:30)```
    ```at Object.Module._extensions..js (module.js:663:10)```
    ```at Module.load (module.js:565:32)```
    ```at tryModuleLoad (module.js:505:12)```
    ```at Function.Module._load (module.js:497:3)```

To resolve this error, run the following command:
```npm install http-errors```

## Author
Lee Van Buskirk - Mohawk College MEDIC
