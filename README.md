# DHDR Node.js Viewer
This viewer was made to demonstrate how a Node.js web application can interact
with Innovation Lab's DHDR. Queries are made by submitting a health card number
to its own controller. From there, a query is built and then sent to Innovation
Lab's DHDR server. A bundle is then returned and displayed client side.

## Getting Started
These instructions will help you download and install the project on your local machine for development and testing purposes.

### Before You Begin
Make sure you have the following installed:

- Node.js (make sure npm is included in the installation)
- Git Bash

### Downloading the Program
Download the program from [Innovation Lab](https://innovation-lab.ca/) in the [Code Sharing Repository](https://innovation-lab.ca/repository).

## Running the Program
1. Open Git Bash and navigate to the root directory of the program.
2. In a code editor, open the project and navigate to ```bin/www```. From there, replace the ```<directory-name>``` portion of ```var app = require('../<directory-name>')```.
2. Enter the command:
```npm start```
3. Open the browser enter ```localhost:3000``` as the url in the address bar.

## Issues with Start-up
After entering ```npm start```, you may receive this error: ```Error: Cannot find module 'http-errors' at...```

To resolve this error, run the following command: ```npm install http-errors```

If any other issues are encountered, feel free to make a post in the Innovation Lab [forum](https://innovation-lab.ca/discussions/topic/q-a-for-fhir-in-js/).

## Author
Lee Van Buskirk - Ideaworks MEDIC
