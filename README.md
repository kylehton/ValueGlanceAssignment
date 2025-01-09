This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

## Getting Started

First, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

You can start editing the page by modifying `app/page.js`. The page auto-updates as you edit the file.

## Project Specifications

This project uses Node Package Manager for package installations, and is built on the React framework. 

The package.json file contains all dependencies needed to install. TailwindCSS is used to style the HTML React components that are rendered to the webpage.

It is hosted and deployed through Vercel.

## Contents

This project is one that uses the provided API endpoint to gather data. It then has various filtering and sorting methods to view specific data entries.

Filtering:
    Date Range - A modal is provided to gather entries that fall in a specific time period, by year.
    Revenue & Net Income - A modal is provided to gather entries that fall in a specific range

Sorting:
    7 different outcomes are formulated: regarding date, revenue, and net income, all of which can be sorted in ascending or descending order, as well as the initial display of entries, which is the order in which it was gathered

For order: 0 -> ascending, and 1 -> descending (0 == true, 1 == false)
For sorting: 0 -> Date, 1 -> Revenue, 2 -> Net Income (corresponding to index)

## Deployed Link Below