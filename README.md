# One8 Dine - Frontend Setup Guide

Complete setup guide for running One8 Dine frontend locally and deploying to Vercel.

---

## Table of Contents
1. [Installation Requirements](#installation-requirements)
2. [Local Setup](#local-setup)
3. [Environment Configuration](#environment-configuration)
4. [Running Frontend Locally](#running-frontend-locally)
5. [Deploy to Vercel](#deploy-to-vercel)
6. [Project Structure](#project-structure)
7. [Key Features](#key-features)
8. [Troubleshooting](#troubleshooting)

---

## Installation Requirements

Ensure you have completed these steps:
1. ✅ Node.js installed (v18 or higher)
2. ✅ Backend running locally or on Render
3. ✅ Git installed (optional, for Vercel deployment)

---

## Local Setup

### 1. Install Dependencies

Navigate to frontend folder and install packages:

```bash
cd one8-dine-frontend
npm install
```

This installs:
- **React** - UI library
- **Vite** - Build tool (fast!)
- **Tailwind CSS** - Styling
- **Lucide React** - Icons
- **Axios** - API calls
- **React Router** - Navigation
- **React Hot Toast** - Notifications

### 2. Install Node Modules

Wait for installation to complete. You should see:
```
added XXX packages in XX seconds
```

---

## Environment Configuration

### Create `.env` File

1. Open `one8-dine-frontend` folder in VS Code
2. Right-click → **New File**
3. Name it `.env` (exactly!)

### Add API URL

For **Local Development** (backend running on your PC):
```dotenv
VITE_API_URL=http://localhost:5000
```

For **Production** (backend deployed on Render):
```dotenv
VITE_API_URL=https://one8-dine-backend.onrender.com
```

### What This Does

- `VITE_API_URL` tells frontend where backend is located
- All API calls use this URL
- Different for development vs production

---

## Running Frontend Locally

### Development Mode (with Hot Reload)

```bash
npm run dev
```

You should see:
```
VITE v7.3.1  ready in XXX ms

➜  Local:   http://localhost:5173/
➜  press h + enter to show help
```

### Access Frontend

Open browser and visit:
```
http://localhost:5173
```

### Features to Test

- ✓ Home page loads
- ✓ Menu displays items
- ✓ Login/Signup works
- ✓ Book table functionality
- ✓ Place order with search & filters
- ✓ Admin panel
- ✓ Dashboard shows bookings/orders

### Stop Development Server

Press `Ctrl + C` in terminal

### Production Build

To create optimized build:

```bash
npm run build
```

This generates `dist/` folder with production-ready files.

### Preview Production Build

```bash
npm run preview
```

---

## Deploy to Vercel

### What is Vercel?

Vercel is a free hosting platform for React/Next.js apps. Automatically deploys from GitHub.

### Prerequisites

- GitHub account with backend & frontend repos pushed
- Vercel account (signup at https://vercel.com)

### Step-by-Step Deployment

#### 1. Create Vercel Account

- Visit **https://vercel.com**
- Click "Sign Up"
- Choose "Continue with GitHub"
- Authorize Vercel access

#### 2. Import Project

- Click **Add New** → **Project**
- Click **Import Git Repository**
- Find and select `one8-dine` repository
- Click **Import**

#### 3. Configure Settings

Fill in deployment form:

| Field | Value |
|-------|-------|
| **Project Name** | `one8-dine` |
| **Framework** | Vite |
| **Root Directory** | `./one8-dine-frontend` |
| **Build Command** | `npm run build` |
| **Output Directory** | `dist` |
| **Install Command** | `npm install` |

#### 4. Add Environment Variables

- Find **Environment Variables** section
- Click **Add New**
- Variable Name: `VITE_API_URL`
- Value: `https://one8-dine-backend.onrender.com`
- Click **Add**

#### 5. Deploy

- Click **Deploy**
- Wait 2-3 minutes for build
- Get URL: `https://one8-dine.vercel.app`

#### 6. Test Live App

Visit your Vercel URL and test all features:
- Home page ✓
- Menu browsing ✓
- Login/Signup ✓
- Bookings ✓
- Orders ✓
- Admin panel ✓

### Auto-Deployments

Every time you push to GitHub:
1. Vercel automatically starts build
2. Tests your app
3. Deploys if successful
4. No manual action needed!

---

## Project Structure

```
one8-dine-frontend/
├── src/
│   ├── components/             - Reusable React components
│   │   ├── admin/             - Admin-specific components
│   │   ├── booking/           - Booking related components
│   │   ├── home/              - Homepage sections
│   │   ├── ui/                - UI components (buttons, badge, etc)
│   │   ├── AdminLayout.jsx    - Admin layout wrapper
│   │   ├── Layout.jsx         - Main layout with navbar/footer
│   │   ├── Navbar.jsx         - Navigation bar
│   │   └── ProtectedRoute.jsx - Route protection
│   │
│   ├── context/
│   │   └── AuthContext.jsx    - Authentication state
│   │
│   ├── hooks/
│   │   └── useFetch.js        - Custom fetch hook
│   │
│   ├── lib/
│   │   ├── api.js             - All API calls
│   │   └── axios.js           - Axios config
│   │
│   ├── pages/                 - Page components
│   │   ├── admin/             - Admin pages
│   │   ├── Booking.jsx        - Booking page
│   │   ├── Dashboard.jsx      - User dashboard
│   │   ├── Home.jsx           - Homepage
│   │   ├── Login.jsx          - Login page
│   │   ├── Menu.jsx           - Menu page
│   │   ├── OrderPage.jsx      - Order page (NEW)
│   │   └── Signup.jsx         - Signup page
│   │
│   ├── utils/
│   │   └── formatters.js      - Helper functions
│   │
│   ├── App.jsx                - Main app component
│   ├── index.css              - Global styles
│   └── main.jsx               - Entry point
│
├── public/                    - Static assets
├── .env                       - Environment variables
├── .gitignore                 - Git ignore
├── eslint.config.js           - Linting config
├── package.json               - Dependencies
├── tailwind.config.js         - Tailwind config
├── vite.config.js             - Vite config
└── README.md                  - This file
```

---

## Key Features

### User Features
- 🔐 **Authentication** - Signup, Login with JWT
- 🍽️ **Browse Menu** - View all dishes with search
- 🔍 **Advanced Search** - Search, filter by category, sort A-Z or by price
- 📅 **Book Tables** - Reserve tables with date/time picker
- 🛒 **Place Orders** - Order food + reserve table simultaneously
- 📊 **Dashboard** - View bookings & orders
- ⭐ **Responsive Design** - Works on all devices

### Admin Features
- 👨‍💼 **Admin Panel** - Manage everything
- 🍴 **Menu Management** - Add/Edit/Delete menu items
- 📅 **Booking Management** - View & update booking status
- 🛍️ **Order Management** - View & update order status (NEW)
- 👥 **User Management** - View & delete users
- 📈 **Statistics** - View restaurant stats

### New Order Feature
- **Integrated Orders** - Order food + book table at same time
- **Table Availability** - Real-time table blocking for orders
- **Search & Filters** - Find menu items easily
- **Order Status Tracking** - pending → confirmed → preparing → served

---

## Available Scripts

```bash
# Development (hot reload)
npm run dev

# Build for production
npm run build

# Preview production build locally
npm run preview

# Lint code
npm run lint
```

---

## Environment Variables Reference

### `.env` File

```dotenv
# API Backend URL
VITE_API_URL=http://localhost:5000
```

### What Each Variable Does

| Variable | Purpose | Local | Production |
|----------|---------|-------|-----------|
| `VITE_API_URL` | Backend API endpoint | `http://localhost:5000` | `https://one8-dine-backend.onrender.com` |

### Important Notes

- ⚠️ Never commit `.env` to Git
- Already in `.gitignore`
- Each environment needs its own `.env`
- Restart `npm run dev` after changing `.env`

---

## API Connection

### How Frontend Calls Backend

All API calls go through `src/lib/api.js`:

```javascript
import api from './axios';

export const getMenuItems = async () => {
  const data = await api.get('/api/menu');
  return data.items || [];
};

export const createOrder = async (orderData) => {
  const data = await api.post('/api/orders', orderData);
  return data.order;
};
```

### Axios Configuration

Located in `src/lib/axios.js`:
- Automatically uses `VITE_API_URL`
- Handles JWT tokens
- Sets correct headers
- Catches errors

---

## Troubleshooting

### 1. "Port 5173 already in use"
**Solution:**
```bash
npm run dev -- --port 5174
```

### 2. "Cannot reach backend at localhost:5000"
**Solution:**
- Ensure backend is running (`npm run dev` in backend folder)
- Check `VITE_API_URL` in `.env`
- Restart frontend (`Ctrl + C` then `npm run dev`)

### 3. "API calls fail after deployment to Vercel"
**Solution:**
- Check `VITE_API_URL` environment variable on Vercel
- Ensure it points to deployed backend on Render
- Redeploy after updating env vars

### 4. "Login/Signup not working"
**Solution:**
- Check browser console for errors
- Verify backend is running
- Check network tab in DevTools
- Look for CORS errors

### 5. "Images not loading"
**Solution:**
- Check image URLs are correct
- Verify images are in `public/` folder
- Clear browser cache (`Ctrl + Shift + Delete`)

### 6. "Styles not applying"
**Solution:**
- Restart development server
- Clear node_modules: `rm -rf node_modules && npm install`
- Check Tailwind classes are spelled correctly

### 7. "Build fails on Vercel"
**Solution:**
- Check build logs in Vercel dashboard
- Ensure all environment variables are set
- Try building locally: `npm run build`
- Check for missing dependencies: `npm install`

---

## CSS & Styling

### Tailwind CSS

The app uses **Tailwind CSS** for styling:
- Utility-first CSS framework
- Dark theme with gold accents
- Color scheme:
  - Primary: `#D4AF37` (gold)
  - Dark: `#080d1a`
  - Charcoal: `#0f1628`

### CSS Files

- `src/index.css` - Global styles
- `src/App.css` - App-specific styles
- Inline styles in components for flexibility

---

## Performance Tips

1. **Lazy Load Routes**
   ```javascript
   const AdminPages = React.lazy(() => import('./pages/admin/AdminDashboard'));
   ```

2. **Optimize Images**
   - Use `.webp` format
   - Compress before uploading
   - Use `img` lazy loading

3. **Code Splitting**
   - Vite automatically splits code
   - Improves initial load time

4. **Caching**
   - Vercel caches builds automatically
   - Clears on new deployment

---

## Browser Support

- ✅ Chrome 90+
- ✅ Firefox 88+
- ✅ Safari 14+
- ✅ Edge 90+
- ⚠️ IE11 not supported

---

## Security

### Authentication Flow

1. User logs in → Backend creates JWT token
2. Token stored in localStorage
3. Every API request includes token in headers
4. Backend verifies token
5. Only valid requests processed

### Protected Routes

Routes like `/order`, `/booking`, `/dashboard` require authentication. Unauthenticated users redirected to login.

### Admin Routes

Routes like `/admin/*` require admin role. Only admins can access.

---

## Next Steps

### Local Development
1. ✅ Install Node.js
2. ✅ Install dependencies (`npm install`)
3. ✅ Create `.env` file
4. ✅ Start backend (`npm run dev` in backend folder)
5. ✅ Start frontend (`npm run dev` in frontend folder)
6. ✅ Visit http://localhost:5173

### Production Deployment
1. ✅ Push code to GitHub
2. ✅ Deploy backend to Render
3. ✅ Connect frontend to Vercel
4. ✅ Set environment variables on Vercel
5. ✅ Deploy frontend
6. ✅ Test live app

---

## Support & Resources

- **Vite Docs:** https://vitejs.dev/
- **React Docs:** https://react.dev/
- **Tailwind CSS:** https://tailwindcss.com/
- **Axios Docs:** https://axios-http.com/
- **Vercel Docs:** https://vercel.com/docs
- **React Router:** https://reactrouter.com/

---

## Performance Metrics

### Typical Load Times
- **Local Development:** < 2s
- **Vercel Production:** < 1.5s (with caching)
- **Initial Page Load:** ~2.5s
- **After Caching:** < 0.5s

---

## License

ISC

---

**Last Updated:** March 9, 2024  
**Version:** 1.0.0

For issues or questions, check Troubleshooting or create an issue on GitHub. 
