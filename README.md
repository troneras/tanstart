Using Bun, Tanstack Start (Router, Tanstack Query, Tanstack Table, Tanstack Form and Vite).

# tanstart
To install dependencies:

```bash
bun install
```

To run:

```bash
bun dev
```

### codegen
Codegen generates the types for the graphql queries and mutations, checking for usages of the GraphQl client and the schema from the remote hygraph endpoint.

Run the following command to generate the types:

```bash
bun dev:codegen
```

### Whys

1. Why use graphql-request instead of Apollo, Relay, etc?
  - graphql-request is the most minimal and simplest to use GraphQL client. 
  - Compared to GraphQL clients like Apollo or Relay, graphql-request doesn't have a built-in cache and has no integrations for frontend frameworks
  - Since we are using tanstack query, we are already using a cache system 
2. Why wrap the queries in a gql function?
  - For convenience, to get the tooling support like automatic formatting and syntax highlighting. Recommended extension: https://marketplace.visualstudio.com/items?itemName=GraphQL.vscode-graphql

### App organization

- Data access is handled in the `app/data-access` folder.
- Components are handled in the `app/components` folder.
- Usecases are handled in the `app/use-cases` folder. These are the main logic of the app.


## Hygraph
Create a new license by adding a license to the enum licenses
- then create a new license config as a singleton giving it the name of "{license}-config"

## Training 
- Workflow to create new queries:
1. Go to the graphiql interface and create the query with the desired fields
2. Run the query to get desired result
3. Copy the query into the `app/data-access/queries` folder in an appropriate file and export it
4. Create a new function in the `app/data-access/queries` file that uses the query and returns the data
5. Create a new hook in the `app/hooks` folder that uses the new query function and returns the data
6. Create a new component in the `app/components` folder that uses the new hook and displays the data
7. Create a new route in the `app/routes` folder that uses the new component