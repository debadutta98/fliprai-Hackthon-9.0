# Mailer
<img src="https://zohowebstatic.com/sites/default/files/ogimage/mail-logo.png" alt="drawing" width="100"/>


**How to Run This Application**

if you want to run it locally, this application needs some screate and sensitive information like googleoAuth-secreate-key,googleoAuth-secreate-ID,sendgrid api etc These are the steps you need to flow.

 - Clone this repository (open your command prompt and run this command or you can download the zip file in your system)
```console
git clone https://github.com/debadutta98/fliprai-Hackthon-9.0.git
```
 - run these command
 ```console
 npm init
 npm update
 ```
 - All the sensitive information like Api keys and secreate information
   are in .env file due to security purpose of this application i am not      
   upload it on this repository

so create a file named as .env and follow the information given below

```console
url=http://localhost:3000
SENDGRID_API_KEY=< get it from sendgrid.com >
GOOGLE_CLIENT_ID=< get it from google developer console > 
GOOGLE_CLIENT_SECRET=< get it from google developer console > 
CALLBACK_URL=< http://localhost:3000/google/callback > 
NODE_ENV=localhost
```


 - last and final step run the application
```console
 node index.js
      or
 nodemon index.js
 ```
 - This Appication is now hosted on Heroku live server please check this [link](https://flipai.herokuapp.com/) to see the application.



>- package and Technology used
> >  - nodejs
> >  - mongodb
> >  - sendgridmailApi
> >  - googleoAuth
> >  - ejs
> >  - jquery
> >  - bootstrap
> >  - moment.js
> >  - jquery Datatable
>>  -  All the package are avialable in package.json file you can see there



 If you like it please star this repo for better reach ✨
 you can also contribute to this repo and add any suggestions

Happy coding
