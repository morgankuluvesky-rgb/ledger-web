# Ledger Web App

A secure Web3 wallet management platform.

## Tech Stack

- **Frontend**: React + Vite
- **Backend**: Express.js + Prisma
- **Database**: MySQL

## Local Development

### Frontend
```bash
npm install
npm run dev
```

### Backend
```bash
cd server
npm install
cp .env.example .env  # Then fill in your values
npx prisma generate
npx prisma db push
npm run dev
```

## Deployment on Railway

### 1. Create a New Project
- Go to [railway.app](https://railway.app)
- Connect your GitHub account
- Select this repository

### 2. Add MySQL Database
- Click "New" → "Database" → "MySQL"
- Railway will automatically set `DATABASE_URL`

### 3. Configure Environment Variables
In Railway dashboard, add these variables:

| Variable | Description |
|----------|-------------|
| `DATABASE_URL` | Auto-set by Railway MySQL |
| `JWT_SECRET` | Random secure string (use a generator) |
| `RESEND_API_KEY` | Get from resend.com |
| `FROM_EMAIL` | Your sender email |
| `TELEGRAM_BOT_TOKEN` | Your Telegram bot token |
| `TELEGRAM_CHAT_ID` | Your Telegram chat ID |

### 4. Deploy Services

**Backend (server folder)**:
- Root Directory: `/server`
- Build Command: `npm install && npx prisma generate`
- Start Command: `npm start`

**Frontend**:
- Root Directory: `/`
- Build Command: `npm install && npm run build`
- Start Command: `npm run preview`

### 5. Update Frontend API URL
After deploying, update `src/config/api.js` with your Railway backend URL.

## Security Notes

- Never commit `.env` files
- Use strong JWT secrets in production
- All sensitive credentials should be in Railway environment variables
