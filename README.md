# ManagmentSystem by BraveSquirrels



### Table of Contents
* [General Info](#generalinfo)
* [Technologies](#technologies)
* [Requirements](#requirements)
* [Setup](#setup)
* [Resources](#resources)


### General Info
-----------------
We are proudly announcing, that we have ofiicialy completed first part of our **_ManagmentSystem_** project. Perhaps as a developer you do know what managment systems are, as they are an integral part of programmers every day job.
Create your own team, assign roles for the team members and create different projects all in one place! 

### Technologies
-----------------
Project is created with:
* TypeScript
* Node.js
* Express.js

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
* *Make sure that you open your terminal in /server catalog !*
* *Run command **yarn install***
* *Create .env file within the server catalog, this file should contain important information which lack of will cause fatal errors.*</br></br>
**this the data that you should add into .env file:**</br></br>
MONGO_USER=\<you user name></br>
MONGO_PASSWORD=\<your user password></br>
MONGO_DB_NAME=\<your db name></br>
PORT=5000 < Leave it like that!</br>
ADDRESS=localhost < Leave it like that!</br>
JWT_PRIVATE_KEY=\<some random password></br>
EMAIL=\<your email></br>
PASSWORD=\<your email's password></br></br>
(PS your email must be an yahoo email, it's complicated, trust me... If you do not however, don't mind visiting <a href="https://nodemailer.com/about/">this</a> site )</br></br>
* *Run command **yarn start***
* *Enter the local host that was created which should be at **http://localhost:5000/***
* **_You can now send API requests to endpoints form rest.http file!_***
