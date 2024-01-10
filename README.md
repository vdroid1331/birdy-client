### BIRDY

Birdy is a Twitter like app, and this repository (Birdy Client) contains the frontend code for birdy.
Birdy Client is built on:
- NextJS and React for UI
- Tailwind CSS and some custom styles for styling
- Codegen for typesafe GraphQL queries and mutations
- Graphql-Request as API client for client-server communication to consume GraphQL APIs
- React-Query for client-side data caching and query caching
- Typescript to maintain code quality and write type-safe code
- axios to consume REST API for image upload to cloudinary


## Getting Started

- First, clone this repository
- make sure Node.js and NPM is installed.
- install yarn using the command `npm install --global yarn`
- install dependencies using `yarn install`
- add a .env.local file and add the environment variables for Google oauth client id and the backend url for APIs (Check .env.sample for reference).
- run the sever using yarn dev.
- Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.


You can start editing the page by modifying `pages/index.tsx`. The page auto-updates as you edit the file.

[API routes](https://nextjs.org/docs/api-routes/introduction) can be accessed on [http://localhost:3000/api/hello](http://localhost:3000/api/hello). This endpoint can be edited in `pages/api/hello.ts`.

The `pages/api` directory is mapped to `/api/*`. Files in this directory are treated as [API routes](https://nextjs.org/docs/api-routes/introduction) instead of React pages.

This project uses [`next/font`](https://nextjs.org/docs/basic-features/font-optimization) to automatically optimize and load Inter, a custom Google Font.

## Learn More

To learn more about Next.js, take a look at the following resources:

- [Next.js Documentation](https://nextjs.org/docs) - learn about Next.js features and API.
- [Learn Next.js](https://nextjs.org/learn) - an interactive Next.js tutorial.

You can check out [the Next.js GitHub repository](https://github.com/vercel/next.js/) - your feedback and contributions are welcome!

## Deploy on Vercel

The easiest way to deploy your Next.js app is to use the [Vercel Platform](https://vercel.com/new?utm_medium=default-template&filter=next.js&utm_source=create-next-app&utm_campaign=create-next-app-readme) from the creators of Next.js.

Check out our [Next.js deployment documentation](https://nextjs.org/docs/deployment) for more details.
