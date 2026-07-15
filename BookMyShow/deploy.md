# Deploying a MERN App on Render

Use Render to deploy the application:

[Render Dashboard](https://dashboard.render.com/)

## Step 1: Prepare Your MERN App

Make sure your MERN app works correctly on your local machine. The app should be divided into:

- `client` for the React frontend
- `server` for the Node.js and Express backend

Create a production build from the React client directory:

```bash
npm run build
```

This creates a production build of the React app in the `build` folder.

## Step 2: Set Up a Git Repository

If you have not already initialized Git in the root directory of the project, run:

```bash
git init
```

Add your files and create an initial commit:

```bash
git add .
git commit -m "Initial commit"
```

Create a repository on GitHub, then push your code:

```bash
git remote add origin {your-github-repo-url}
git push -u origin main
```

## Step 3: Set Up Render

1. Go to Render and sign up or log in.
2. Click **New**.
3. Select **Web Service**.

## Step 4: Connect Your GitHub Repository

1. Connect Render to your GitHub account if you have not already done so.
2. Select the repository that contains your MERN app.

## Step 5: Configure the Service

Configure the basic settings for your Render web service:

- **Name:** Choose a name for your service.
- **Region:** Select a region close to your users.
- **Build Command:** Add the command to install dependencies and build the client.
- **Start Command:** Add the command to start your backend server.

Example build command:

```bash
cd client && npm install && npm run build && cd ../server && npm install
```

Example start command:

```bash
cd server && node server.js
```

## Step 6: Add Environment Variables

Click **Add Environment Variable** and add any required variables, such as:

- `MONGODB_URI`
- `JWT_SECRET`
- Other backend configuration values

## Step 7: Deploy

Click **Create Web Service**.

Render will pull the code from GitHub, install dependencies, build the app, and start the server.

## Step 8: Serve the React Build From Express

Update `server.js` so Express can serve the production React build:

```js
const path = require("path");
const app = express();

const clientBuildPath = path.join(__dirname, "../client/build");

console.log(clientBuildPath);

app.use(express.static(clientBuildPath));

app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});
```

### What This Does

`app.use(express.static(clientBuildPath))` tells Express to serve static files from the `clientBuildPath` directory.

This means requests for static assets like JavaScript files, CSS files, images, and other frontend assets will be served from the `client/build` directory.

The catch-all route serves `index.html` for any request that does not match a static file or API route:

```js
app.get("*", (req, res) => {
  res.sendFile(path.join(clientBuildPath, "index.html"));
});
```

This is important for single-page applications like React apps, where routing is handled on the client side. Serving `index.html` allows the React app to take over routing.

## Step 9: Update Client Proxy and CORS

Remove the `proxy` field from `client/package.json`.

Then update CORS in `server.js`:

```js
const cors = require("cors");
const app = express();

app.use(
  cors({
    origin: "*",
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);
```

You can also configure CORS for specific local and production frontend URLs:

```js
app.use(
  cors({
    origin: ["http://localhost:3000", "https://your-production-url.com"],
    methods: ["GET", "POST", "PUT", "DELETE"],
    allowedHeaders: ["Content-Type", "Authorization"],
    credentials: true,
  })
);
```

If there are still issues, check the `baseURL` in your Axios instance. It may still point to `localhost:3000`, so update it to your production backend URL if needed.

Example:

```js
import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: "https://test3-99k4.onrender.com/",
  headers: {
    "Content-Type": "application/json",
    authorization: `Bearer ${localStorage.getItem("token")}`,
  },
});
```

## Fixing CSP Blocked Errors

If you get a `csp:blocked` error, you may need to update the Helmet content security policy.

Example:

```js
app.use(
  helmet({
    contentSecurityPolicy: {
      directives: {
        defaultSrc: ["'self'"],
        scriptSrc: [
          "'self'",
          "'unsafe-inline'",
          "'unsafe-eval'",
          "https://your-production-url.com",
        ],
        styleSrc: ["'self'", "'unsafe-inline'", "https://fonts.googleapis.com"],
        imgSrc: ["'self'", "data:", "https://your-production-url.com"],
        connectSrc: ["'self'", "https://your-production-url.com"],
        fontSrc: ["'self'", "https://fonts.gstatic.com"],
        objectSrc: ["'none'"],
        upgradeInsecureRequests: [],
      },
    },
  })
);
```

Replace `https://your-production-url.com` with your actual production URL.

## Reference

Previous deployment link:

[https://test4-ax1e.onrender.com/](https://test4-ax1e.onrender.com/)
