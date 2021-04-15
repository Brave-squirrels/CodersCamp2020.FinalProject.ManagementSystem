# ManagmentSystem by BraveSquirrels



### Table of Contents
* [General Info](#generalinfo)
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Setup](#setup)
* [Resources](#resources)
* [Documentation](#documentation)


### General Info
-----------------
We are proudly announcing, that we have ofiicialy completed our **_ManagmentSystem_** project. Perhaps as a developer you do know what managment systems are, as they are an integral part of programmers every day job.<br></br>
Create your own team, assign roles for the team members and create different projects all in one place! 

**Check it out on youtube!**<br></br>
[![ManagmentSystem by BraveSquirrels](http://img.youtube.com/vi/sxfl5vBYFOk/0.jpg)](http://www.youtube.com/watch?v=sxfl5vBYFOk)

**If you don't want to run our project locally, you do not have to read anything more, be our guest, and visit our <a href="https://managementsystem2021.netlify.app/">site!</a>**

### Technologies
-----------------
Project is created with:
* TypeScript
* Node.js
* Express.js
* Jest
* React
* Redux
* Redux-Thunk
* MongoDB
* Cypress

### Requirements
-----------------
To be able to run our project locally, you need to have installed **yarn package manager**
If you do not know if you have it installed on your computer and you still want to run our project follow these steps:

#### Windows command prompt/Linux bash

##### Run *npm -v*
* *If you received a number like 'x.x.x' you already have installed* **npm package manager** *on your computer and you can follow the next part, which is installing **yarn**
* *Otherwise, you will have to install it, the best way to do it is installing it globaly by running the command **npm install npm@latest -g***
* *After that you can run again the command from the first line just to confirm that you have succesfully installed required* **package manager**
##### Install yarn
* *To install yarn* **package manager (faster vesrion of npm)** *run the commnad **npm install --global yarn***
* *confirm yarn install by tpying command **yarn --version***

### Setup
-----------------
#### DataBase
* *To run the project locally you will have to create your own MongoDB Atlas account, and have your own cluster/db created* <a href="https://www.mongodb.com/cloud/atlas/register">*here*</a>
#### To run the project locally follow these steps:
* *Clone this repository*
* *Open repository in your code editor*
* *Run command **yarn dev:i***
* *Create .env file within the server catalog, this file should contain important information which lack of will cause fatal errors.*</br></br>
**this is the data that you should add into .env file:**</br></br>
MONGO_USER=\<you user name></br>
MONGO_PASSWORD=\<your user password></br>
MONGO_DB_NAME=\<your db name></br>
PORT=5000 < Leave it like that!</br>
ADDRESS=localhost < Leave it like that!</br>
JWT_PRIVATE_KEY=\<some random password></br>
EMAIL=\<your email></br>
PASSWORD=\<your email's password></br></br>
(PS your email must be an yahoo email, it's complicated, trust me... If you do not however, don't mind visiting <a href="https://nodemailer.com/about/">this</a> site )</br></br>
If you would like to run tests, you will need to add additional line to your .env file, which should contain:</br></br>
NODE_ENV=test</br></br>
Keep in mind that the app will not work when this line is added, it only allows you to run tests.</br></br>
* *Run command **yarn start***
* *For backend tests, move into /Server catalog and run either **yarn test** or **yarn test:c** for tests with coverage!*
* *If you would like to test frontend, in main directory run command **_yarn test:o_***</br></br>
* *Enter the local host that was created which should be at **http://localhost:3000/***
* **_You can now use our fully functional application!_***

### Documentation
(You can see every single endpoint in rest.http file, here are some most important examples)
#### REGISTRATION
* POST http://localhost:5000/users/create HTTP/1.1</br>
Content-Type: application/json</br>
{</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name": "sampleName",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "email": "sampleName@sample.com",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "password": "samplePass",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "confirmPassword": "samplePass"</br>
}</br>
#### LOGIN (getting token in request!)
* POST http://localhost:5000/login HTTP/1.1</br>
Content-Type: application/json</br>
{</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "email": "sampleName@sample.com",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "password": "samplePass"</br>
}</br>
#### GET USER INFO
* GET http://localhost:5000/users/me HTTP/1.1</br>
x-auth-token: <your token></br>
#### CREATE TEAM
* POST http://localhost:5000/teams HTTP/1.1</br>
x-auth-token: \<your token></br>
content-type: application/json</br>
{</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "teamName": "sample team"</br>
}</br>
#### GET TEAM INFO
* GET http://localhost:5000/teams/teamId HTTP/1.1</br>
x-auth-token: \<your token></br>
#### CREATE PROJECT
* POST http://localhost:5000/teams/teamId/projects HTTP/1.1</br>
x-auth-token: \<your token></br>
content-type: application/json</br>
{</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "projectName": "sample project",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "deadline" : "2021-03-24T17:06:34.928+00:00"</br>
}</br>
#### GET PROJECT INFO
* GET http://localhost:5000/teams/teamId/projects/projectId HTTP/1.1 </br>
x-auth-token: \<your token></br>
#### CREATE TASK
* POST http://localhost:5000/teams/teamId/projects/projectId/tasks HTTP/1.1</br>
x-auth-token: \<your token></br>
content-type: application/json</br>
{</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "name": "Task prezentacja",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "content": "Tresc taska",</br>
   &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; "deadlineDate": "03/24/2021"</br>
}</br>
#### CREATE NOTE
* POST http://localhost:5000/teams/teamId/projects/projectId/notes HTTP/1.1</br>
x-auth-token: \<your token></br>
content-type: application/json</br>
{   </br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content": "Note description",</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"name": "Test Note",</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"author": {"name": "Maciek", "id": "604f7b21c633a147b03b1f5d"}</br>
}</br>
#### CREATE COMMENTS
* POST http://localhost:5000/teams/teamId/projects/projectId/tasks/taskId/comments HTTP/1.1</br>
x-auth-token: \<your token></br>
content-type: application/json</br>
{</br>
    &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;"content": "New comment"</br>
}</br>
