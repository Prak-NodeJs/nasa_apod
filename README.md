# APOD Data Server

**Project Summary:** This is a NodeJS server built with ExpressJS and TypeScript. It fetches Astronomy Picture of the Day (APOD) data from NASA's and stores the fetched data in a PostgreSQL database and serves it back to the user.

### Quick Start

**Step 1.**
Clone nasa_apod repo

```bash
git clone https://github.com/Prak-NodeJs/nasa_apod.git
```

**Step 2.**
Navigate into the project directory

```bash
cd nasa_apod
```
**Step 3.**
Install dependencies

```bash
npm install
```

**Step 4.**
Create .env file and set the environment variables

```bash
cp example.env .env
# open .env and modify the environment variables (if needed)
```

## Usage
To run the server, use the following command:

```bash
npm run dev
```
This will start the server at http://localhost:port.

### Endpoints

**GET /apod:**
   - Fetches the Astronomy Picture of the Day (APOD) data from NASA's API.
      Accepts the following query parameters:
      - count: The number of APOD entries to fetch 
      - date: The specific date for which to fetch the APOD data.
      - start_date: The start date for a range of APOD data to fetch.
      - end_date: The end date for a range of APOD data to fetch.

### Example usage:
Fetch a single APOD entry:

```bash
GET /v1/apod
```
Fetch a 2 APOD entry:

```bash
GET /v1/apod?count=2
```