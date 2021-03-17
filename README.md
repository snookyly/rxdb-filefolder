# rxdb-filefolder

npm install

npm run server

see database.ts to reproduce issue:

when changing the databse name to file in a folder, the database cannot be shown in browser:
name: path.join(rootLocation, 'db', 'serverdb'), // http://localhost:5000/db/items not found in browser
