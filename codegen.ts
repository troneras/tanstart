import type { CodegenConfig } from "@graphql-codegen/cli"

const config: CodegenConfig = {
    schema: process.env.HYGRAPH_CONTENT_API_URL ?? '',
    documents: ["./app/**/*.ts"],
    ignoreNoDocuments: true, // for better experience with the watcher
    generates: {
        "./app/data-access/gql/": {
            preset: "client",
            plugins: [],
        },
    },
}

console.log('API URL:', process.env.HYGRAPH_CONTENT_API_URL);

export default config