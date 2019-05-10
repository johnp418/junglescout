# [JungleScout](https://john-junglescout.herokuapp.com/)

To run this application, start the frontend dev server or build it

```sh

# To start dev server, in frontend dir
yarn
yarn start
# Or build it once and let backend serve it
yarn build
mv build ..
```

Then start the backend

```sh
#in root dir
yarn
yarn start
```

This application uses MongoDB so you will need to pass `DB_URL` as environment variable.

Visit localhost:5000 to access the app.
