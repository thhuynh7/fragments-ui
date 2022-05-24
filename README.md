# fragments-ui
Web app to manage authentication (with User Pool) and test back-end fragments microservice.

# Project Overview
This project builds a cloud-based microservice for a fictional Canadian manufacturer.

This highly scalable service processes fragments of text and images from a sizeable amount of IoT devices, mobile apps, automated cameras on the company's assembly lines, etc.

The service connects seamlessly with the rest of the existing systems using existing authorization methods. It is deployed to AWS, which is the cloud provider used for the rest of the company's systems.

# Web App Client demo
To run a demo of this app, please follow these steps.

Clone the project to your local machine using the git command:
```
git clone https://github.com/thhuynh7/fragments-ui.git
```
In the project directory, install node packages using the command:
```
npm install
```

Next, open two terminals to run the web app client and microservice server at the same time.
> Note: You must first clone and install the microservice to your local machine using the following commands::+1::
```
git clone https://github.com/thhuynh7/fragments.git
npm install
```
In the first terminal, start the fragments server on port 8080 using:
```
npm run dev 
```
In the second terminal, start the fragments-ui web app client on port 1234 using:
```
npm start 
```
Finally, you can access the web app client at the following URL in your web browser:
```
http://localhost:1234/
```

> Note: You can observe your server responses using the following commands in the terminal::+1::
```
curl -i localhost:8080
```
which should return a 200 OK, or:
```
curl -i localhost:8080/v1/fragments
```
which returns a 401 Unauthorized