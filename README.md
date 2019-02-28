
![charon-graphql](./charon/assets/CharonLogo-large.png)


# Installation
Install the module from the command line using `npm`:
```bash 
npm install charon-graphql
```

or by adding `charon-graphql` to your dependencies in your `package.json` file.

# Getting Started


To get started using `Charon` to cache your GraphQL query results first import `Charon` from your node modules. Then define a configuration object containing the `uri` for your GraphQL API. Finally pass the configuration object to `Charon`. 

### Basic Setup
```js
import Charon from 'charon-graphql';

const config = {
  uri: 'http://<your server address>.com/graphql',
};

const charon = new Charon(config);
```

### The Configuration Object
```js
const config = {
  uri: 'http://<your server address>.com/graphql',      
  headers: { 
    'Content-Type': 'application/json',
    'Accept': 'application/json', 
    'Authorization': '<AUTH TOKEN>',
  }, 
  uniqueSchemaFields: {
    default: 'id',
    User: 'username',
    Book: 'isbn',                                   
  },
}
```
The configuration object defines properties that `Charon` will use when making queries or storing data in the cache. The only property that is requried to be provided is the `uri` for your GraphQL API.

| Property | Description                                         | Type   | Default Value |
| -------- | --------------------------------------------------- | ------ | ------------- |
|`uri`     | Uniform Resource Identifier for your GraphQL API    | String | `undefined`   |
|`headers` | Any header to include with POST requests to the API | Object |`"Content-Type": "application/graphql"`|
|`uniqueSchemaFields`| An object to define which field will be used as the unique identifier among a given Schema. By default `Charon` will request and require an `id` field for every object. The default may be updated by providing a new default, such as `_id` or `ID`, etc. uniqueSchemaFields also allows a different field to be used on each Schema, as long as it is provided, and it will be unique among all instances of that type, i.e. `username` for any `User`, or a `Book` stored with it's `isbn`.  | Object |`{ default: 'id' }`|


# Contributors
[Ben Woodson] | [Chang Yea Moon] | [Joel Burton]

[Ben Woodson]:https://github.com/bighatnocattle
[Chang Yea Moon]:https://github.com/changyeamoon
[Joel Burton]:https://github.com/tidb1ts

