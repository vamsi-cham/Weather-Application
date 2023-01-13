# Weather-Application
This application is used to track the weather.

## Project:
Developed a Rest API using two external APIs using node framework in typescript. 

### Application Description:
- Developed this application using express js and jest for the unit testing. 
- Created a complete node application to get the weather report for a particular location. 
- Used one external API for getting latitude and longitude values via a Pincode or state & city. 
- Used another API to get weather reports from latitude and longitude values. 
- Added some extra features to this application where a logged-in user can add locations to track the weather that the user wanted to.
And also he can delete the location, updates his primary location.
- Swagger documentation is also added to this application. 
- Written unit test cases too using jest framework.

#### Skills/Domain:
ExpressJS, TypeScript, Jest

## How to run and use this application ?
- Open the terminal at the root folder and run "npm install" to install all dependencies.
- Now run the server using "npm run dev" in the terminal.
- After server started running successfully, you can open the swagger doc and check all the apis.
- To see the test cases report, run "npm test" in the terminal
- To open swagger doc, open "http://localhost:4001/api-docs/" in the browser.
- You can also access all the api methods for the frontend application. (Given CORS access)

## Future scope
- These rest apis are created in the view of a complete mini weather application.
- So I am trying to create a frontend application using react and use these rest apis. 
- Use a database in the backend server, as of now I am storing in the memory arrays.
- Develop a Authentication and Authorization for the user, as of now this node app using external api for a list of logged users.
