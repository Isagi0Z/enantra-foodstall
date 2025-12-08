# Firebase Setup Guide

## 1. Firebase Project Setup

1. Go to [Firebase Console](https://console.firebase.google.com/)
2. Your project `enantra-foodstall` is already configured
3. The Firebase config is already in `src/config/firebase.js`

## 2. Enable Authentication

1. In Firebase Console, go to **Authentication** → **Sign-in method**
2. Enable **Email/Password** authentication
3. Create your first admin user:
   - Go to **Authentication** → **Users**
   - Click **Add user**
   - Enter email and password (e.g., `admin@enantra.com`)
   - This will be your cook/admin login credentials

## 3. Set Up Firestore Database

1. Go to **Firestore Database** in Firebase Console
2. Click **Create database**
3. Choose **Start in test mode** (for development) or **Production mode** (for production)
4. Select your preferred location
5. Click **Enable**

## 4. Firestore Security Rules

Add these security rules in **Firestore Database** → **Rules**:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders collection - customers can create, admins can read/write
    match /orders/{orderId} {
      allow create: if request.auth == null || request.auth != null;
      allow read: if request.auth != null; // Only authenticated users (admins) can read
      allow update: if request.auth != null; // Only authenticated users (admins) can update
      allow delete: if request.auth != null; // Only authenticated users (admins) can delete
    }
  }
}
```

**For Production**, use stricter rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    match /orders/{orderId} {
      allow create: if true; // Anyone can create orders
      allow read: if request.auth != null; // Only admins can read
      allow update: if request.auth != null; // Only admins can update
      allow delete: if false; // No one can delete orders
    }
  }
}
```

## 5. Testing the Application

1. **Customer Flow:**
   - Visit `http://localhost:5173`
   - Browse menu, add items to cart
   - Checkout and place order
   - See real-time order status updates

2. **Admin/Cook Flow:**
   - Visit `http://localhost:5173/admin/login`
   - Login with admin credentials
   - See orders in real-time, ordered by creation time (first-come-first-served)
   - Update order status: Pending → Preparing → Ready → Completed
   - View QR code for easy mobile access

## 6. Features Implemented

✅ **Real Backend:** Firebase Firestore  
✅ **Real Database:** Cloud Firestore  
✅ **Live Sync:** Real-time order updates between customer and admin  
✅ **No localStorage:** All data stored in Firestore  
✅ **Admin Authentication:** Firebase Auth with email/password  
✅ **Order Completion System:** Status tracking (pending → preparing → ready → completed)  
✅ **QR Code:** Auto-generates QR code for mobile site access  
✅ **First-Come-First-Served:** Orders displayed by creation time (oldest first)

## 7. Deployment

### Deploy to Firebase Hosting:

```bash
npm run build
firebase init hosting
firebase deploy
```

### Or deploy to Vercel/Netlify:

1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Make sure to set up environment variables if needed

## 8. Mobile QR Code

The admin dashboard automatically generates a QR code that links to your website. When customers scan it, they'll be taken directly to the mobile-optimized menu.

## Troubleshooting

- **Authentication errors:** Make sure Email/Password is enabled in Firebase Console
- **Firestore errors:** Check that Firestore is enabled and rules are set correctly
- **Real-time updates not working:** Verify Firestore rules allow read access for authenticated users

