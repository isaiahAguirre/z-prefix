# Z-Prefix App

This is my app for the Z-prefix assessment. It's a full stack app that allows inventory managers and other users to interact with a database of items, covering all CRUD operations. 




## Installation

Client: 

From the z-prefix main folder, cd into the client directory and run npm install as follows

```bash
  cd client
  npm install 

```

Then, the front end should be ready to go. Enter npm run start and the front end should work.

```bash
  npm run start

```

Server:

From the z-prefix main folder, cd into the server directory and run npm install as follows

```bash
  cd client
  npm install 

```

You'll need to enter your connection information in the knex file before proceeding. I've also left the details I used in there just in case you'd rather make the database to reflect what's in the code over changing anything. 

Then, we'll need to run the migrations and seeds to populate the database.

```bash
  npx knex migrate:latest
  npx knex seed:run

```

Following this, it just needs to be started up.

```bash
  npm run start-server

```

With both going the client should now show the initial seed data and everything should be functional.
## Notes

So, some notes about the app and what to expect. Some of the features are demo-able immediately, like the login and subsequently the add item, edit, and delete functions. Some things will require making another user however, like the edit and delete buttons only being available to the user who created the item and so on. For this purpose, the seeded account username is gApp, short for golgi apparatus, and the password is 123.

On that note, when you make a new user and then log in with them you are redirected to only see your items as expected. Since there aren't any yet though, the page will be blank aside from the menu buttons. Clicking on the 'All items' button will take you back to the main page of items, and essentially works as the home / back button. 

I got to the end of this and realized I should have used routes and forgot, so I don't think the page likes it when you press back as everything just re-renders on the same page. Also relating to the buttons, you'll know which one you have active as it will highlight in green - the relevant buttons being 'All Items' and 'My Items'. There might not be any noticeable difference if this is tested immediately, so it's recommended to check it out after a new user is made as otherwise both lists of items will be the same. 

For the user stories, each one should be fulfilled apporpriately aside from the edit function. Edit is combined with the add new item window, both making use of the same window. So, while the edit functionality is present, it is accessed by a button next to each item belonging to the signed in user rather than a toggle on toggle off for the whole page. 

As a final note, I've realized rather late that there is not any input validation on the account creation fields or the item add / edit fields. In regard to this, I ask that only things that should go in there are entered - please no full essays in the quantity box - and for the account creation please do not create an account with the same username and password twice. I suspect this will result in the same login for 2 accounts that have different user id's and make things weird with what the user can edit / delete. 

That's everything. I hope this doesn't suddenly stop working once it leaves the nest (my computer).
## Author

- [Isaiah Aguirre](https://github.com/isaiahAguirre)
