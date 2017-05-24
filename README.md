[![Scrutinizer Code Quality](https://scrutinizer-ci.com/g/andela-cofor/postit/badges/quality-score.png?b=Development)](https://scrutinizer-ci.com/g/andela-cofor/postit/?branch=Development)

# PostIt

PostIt is a simple application that allows friends and colleagues create groups for notifications. This way one person can post notifications to everyone by sending a message once. It is built with NodeJS, Express and Firebase as it's database.
Source code employs ES6 and ES7 syntax traspiled down to ES5 using Babel.

#### Key Application Features
A created user can perform the following:
    - Create an account
    - Login with Google account
    - Manage profile
    - Edit profile information
    - Set profile picture
    - Users should be able to create groups of friends with each person confirming their participation in the group
    - Users should be able to send messages to all their friends or to different groups they belong to (anyone can send a message to     the group)
    - Users should be able to add friends within the applicatio.
    - Logout.


- In addition to the general user functions:
    - Send messages to memebers in groups.
    - Send text messages to memebers in groups.

**Authentication**:
Users are authenticated and validated using Firebase Authentication service.

## Development
This application was developed using [NodeJs](https://nodejs.org) with express for routing. [firebase](https://https://firebase.google.com/) was used for persisting data.

The frontend was built with the [react](https://facebook.github.io/react/) and [flux](https://facebook.github.io/flux/) framework.

### Installation
---

- Clone the project repository.
- Run git clone https://github.com/andela-cofor/postit.git.
- Change directory into the Document-Management-System directory.
- Run npm install to install the dependencies in the package.json file.

## Usage
- Login, Sign Up and start creating groups

### Technologies Used
---
- JavaScript (ES6)
- Node.js
- Express
- React/Flux
- Sequelize ORM.
- ReactJS with the Flux
- Material Design CSS Framework
- SASS/SCSS.
- Firebase

#### Contributing
---

1. Fork this repositry to your account.
2. Clone your repositry: git clone https://github.com/andela-cofor/postit.git.
3. Create your feature branch: git checkout -b new-feature
4. Commit your changes: git commit -m "did something"
5. Push to the remote branch: git push origin new-feature
6. Open a pull request.

#### Licence
ISC

Copyright (c) 2017 Chinedu Ofor