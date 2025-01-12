This is a [Next.js](https://nextjs.org) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

_____________________________________________________________________________________________

## Accessing the React App through Local Deployment

First, run the development server:

```bash
npm run dev
```
Open [http://localhost:3000](http://localhost:3000) with your browser to see the local app.

To close it, use: [Ctrl+C] within the terminal window that was used to run the development server. 

_____________________________________________________________________________________________

## Accessing the React App through Web Deployment

This project is deployed through Vercel. You may access it through the link below.

Open [value-glance-assignment-two.vercel.app](https://value-glance-assignment-two.vercel.app/) with your browser to view the deployed app.

_____________________________________________________________________________________________

## Project Specifications

This project uses Node Package Manager for package installations, and is built on the React framework. 

The package.json file contains all dependencies needed to install. TailwindCSS is used to style the HTML React components that are rendered to the webpage.

_____________________________________________________________________________________________

## Contents

This project is one that uses the provided API endpoint to gather data. It then has various filtering and sorting methods to view specific data entries.

Data Retrieval:
    Fetch - uses a simple fetch to the API endpoint URL, passed with my API key. Awaits for full result to complete then moves on.

Filtering:
    Date Range - A modal is provided to gather entries that fall in a specific time period, by year.
    Revenue & Net Income - A modal is provided to gather entries that fall in a specific range
    These can be reset by the "Reset Sort/Filters" button.

Sorting:
    6 different outcomes are formulated: regarding date, revenue, and net income, all of which can be sorted in ascending or descending order, which can be reset through the "Reset Sort/Filters" button.

Sort/Filter State Variables: 
    For sorting order: true -> ascending, and false -> descending
    For filtering: 0 -> Date, 1 -> Revenue, 2 -> Net Income (corresponding to index)

_____________________________________________________________________________________________

Thank you for taking the time to view my React App and read the contents of this file. I appreciate the opportunity to apply for this position, and to be able to work on this small application. I hope to hear from you soon!
