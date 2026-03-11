# Neura Coin - Setup & Deployment Guide

This guide covers setting up the MongoDB Atlas database and deploying the Neura Coin Telegram Mini App.

## 1. MongoDB Atlas Setup (Required)

Follow these steps to set up your free cloud database:

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas/register) and sign up for a free account.
2. Create a new cluster (the free `M0` tier is perfect for this). Choose AWS, GCP, or Azure (doesn't matter which).
3. Once the cluster is created, go to **Database Access** on the left menu.
4. Click **Add New Database User**.
   - Username: `neura_admin`
   - Password: Click "Autogenerate Secure Password" (Copy this somewhere safe!).
   - Role: Read and write to any database.
   - Click **Add User**.
5. Go to **Network Access** on the left menu.
   - Click **Add IP Address**.
   - Select **Allow Access From Anywhere** (`0.0.0.0/0`) so Vercel and render can connect.
   - Click **Confirm**.
6. Go back to **Database** and click the **Connect** button on your cluster.
7. Select **Drivers**.
8. Copy the connection string. It will look like this:
   `mongodb+srv://neura_admin:<password>@cluster0.xxxxx.mongodb.net/?retryWrites=true&w=majority`
9. **Crucial Step:** Replace `<password>` in the string with the password you copied in Step 4. Also, add the database name (`neura_coin`) before the `?` like this:
   `mongodb+srv://neura_admin:YOUR_PASSWORD@cluster0.xxxxx.mongodb.net/neura_coin?retryWrites=true&w=majority`

### Applying the Database to the Backend
1. Open `C:\Users\aditya\OneDrive\Desktop\tep\backend\.env`
2. Replace `MONGODB_URI` with the full connection string you just modified.

---

## 2. Running Locally

**Terminal 1 (Backend):**
```bash
cd backend
npm install
npm run dev
```

**Terminal 2 (Frontend):**
```bash
cd frontend
npm install
npm run dev
```

---

## 3. Telegram Bot Setup

1. Open Telegram and search for `@BotFather`.
2. Send `/newbot` and follow the prompts to name it.
3. Once created, copy the **HTTP API Token** and paste it into your backend `.env` file as `BOT_TOKEN`.
4. In `@BotFather`, send `/newapp` to create a Web App for your bot.
5. Provide a short name, description, and photo.
6. When asked for the **Web App URL**, provide your Vercel (or Ngrok) URL once deployed.

---

## 4. Production Deployment

### Frontend (Vercel)
1. Push your code to GitHub.
2. Go to Vercel and create a new project.
3. Import the repository and set the **Root Directory** to `frontend`.
4. Add environment variables:
   - `VITE_API_URL`: `https://your-backend-url.onrender.com/api`
5. Deploy.

### Backend (Render / Railway)
1. Go to Render.com and create a new **Web Service**.
2. Connect your GitHub repository and set the **Root Directory** to `backend`.
3. Build Command: `npm install`
4. Start Command: `npm start`
5. Add your `.env` variables (MONGODB_URI, JWT_SECRET, BOT_TOKEN).
6. Deploy.
