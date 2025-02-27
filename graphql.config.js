export default {
  schema: {
    'https://YOUR_HYGRAPH_API_ENDPOINT': {
      headers: {
        Authorization: 'Bearer YOUR_API_TOKEN'
      }
    }
  },
  documents: ['app/**/*.{ts,tsx}'],
  extensions: {
    codegen: {
      generates: {
        './app/lib/gql/': {
          preset: 'client',
          plugins: []
        }
      }
    }
  }
} 