# Revision

This repository contains all source code and dependencies for Revision.

A collaborative resume critiquing platform which allows users to upload &amp; share their resume for feedback as well as provide suggestions for others. Simply either log in or register, upload your resume in PDF format, and share your link with others.

[![Revision Demonstration](https://i.imgur.com/G5d90RD.png)](https://www.youtube.com/watch?v=dQMEcFemVak)

## What it Features ##

#### User Authentication ####
When first navigating to the page, it will inform the user to either log in or register as a new user. After creating an account and successfully logs in, a JWT token will be generated for the user's session which will allow the user to access the application and it's features.

#### Uploading Documents ####
Users are able to upload a PDF document, giving a document name and description of their choice. After it is uploaded, it will show up in their list of documents.
 
#### Viewing Documents ####
From the home page, users can navigate to the list of documents that belong to them to view the document and associated comments.
 
#### Sharing Documents ####
After uploading their document, users can send their document link to peers. This allows others to view the document and comment their suggestions and feedback.
 
## How I Built it ##
 
The frontend of the project is built using **React.js** and **Redux**, consisting of while the backend consists of **Node.js**, **Express.js**, **MongoDB**, and **AWS S3**. It is currently deployed on **Heroku**.
 
## Inspiration ##
 
This project was inspired by an issue I continously ran into when I was helping others edit their resume or having others edit mine. With Google Drive not really optimized for leaving comments on uploaded PDF documents, I often found myself having to send screenshots of my resume through Messenger to others. I wanted to make an application where people are easily able to upload &amp; share different versions of their resume and be able to see all their comments in one place. It was a cool project that allowed me to solve an issue that I was having personally while learning more about the technologies I was curious about learning more in!
 
## Local Development Instructions ##
 
#### Server ####
After downloading the dependencies, start the server by: 
`npm run start`
 
#### Client ####
Navigate to the client directory and install the dependencies. Then, run the command:
`npm run start`

 
