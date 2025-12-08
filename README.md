# 🍔 Enantra Food Stall - Real-time Ordering System

A modern, real-time food ordering web application built with React, Firebase, and Tailwind CSS. Perfect for food stalls and restaurants to manage orders efficiently with live updates between customers and kitchen staff.

**🌐 Live Demo:** [https://bitehub99.netlify.app/](https://bitehub99.netlify.app/)

![Status](https://img.shields.io/badge/status-live-success)
![React](https://img.shields.io/badge/React-19.2.0-blue)
![Firebase](https://img.shields.io/badge/Firebase-12.6.0-orange)
![Netlify](https://img.shields.io/badge/Netlify-Deployed-00C7B7)

## ✨ Features

### Customer Features
- 📱 **Mobile-optimized** responsive design
- 🍕 **Browse Menu** with category filtering (Burgers, Sides, Beverages)
- 🛒 **Shopping Cart** with quantity management
- 💳 **Quick Checkout** - Payment method selection only
- ⚡ **Real-time Order Tracking** - See order status updates live
- 📱 **QR Code Access** - Easy mobile site access

### Admin/Cook Features
- 🔐 **Secure Admin Login** with Firebase Authentication
- 📊 **Real-time Order Dashboard** - See orders as they come in
- ⏳ **First-Come-First-Served** - Orders displayed by creation time
- ✅ **Order Management** - Mark orders as completed with one click
- 📦 **Stock Management** - Mark items as available/unavailable
- 📈 **Statistics Dashboard** - View pending and completed orders
- 🔄 **Live Updates** - No page refresh needed

## 🛠️ Tech Stack

- **Frontend Framework:** React 19.2.0
- **Routing:** React Router DOM 7.10.1
- **Styling:** Tailwind CSS 4.1.17
- **Backend:** Firebase
  - **Database:** Cloud Firestore (Real-time)
  - **Authentication:** Firebase Auth
- **3D Graphics:** React Three Fiber, Three.js
- **Build Tool:** Vite 7.2.4
- **QR Code:** qrcode.react
- **Hosting:** Netlify

## 🚀 Getting Started

### Prerequisites

- Node.js 20.19+ or 22.12+
- npm or yarn
- Firebase account

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd enantra-foodstall
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Firebase Setup**
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable **Firestore Database** (Start in test mode for development)
   - Enable **Authentication** → Email/Password method
   - Copy your Firebase config and update `src/config/firebase.js`

4. **Create Admin User**
   - Go to Firebase Console → Authentication → Users
   - Add user with email: `chaoscrew@enantra.com`
   - Set password: `surprisedude`

5. **Initialize Menu Items**
   - The app will auto-initialize menu items on first load
   - Or manually add items to Firestore `menu` collection

6. **Run the development server**
   ```bash
   npm run dev
   ```

7. **Open your browser**
   - Visit `http://localhost:5173`

## 🔥 Firebase Configuration

### Firestore Security Rules

Add these rules in Firebase Console → Firestore Database → Rules:

```javascript
rules_version = '2';
service cloud.firestore {
  match /databases/{database}/documents {
    // Orders - anyone can create, only admins can read/update
    match /orders/{orderId} {
      allow create: if true;
      allow read: if request.auth != null;
      allow update: if request.auth != null;
      allow delete: if false;
    }
    
    // Menu - anyone can read, only admins can write
    match /menu/{itemId} {
      allow read: if true;
      allow write: if request.auth != null;
    }
  }
}
```

### Firebase Services Required

1. **Firestore Database**
   - Collections: `orders`, `menu`
   - Real-time listeners enabled

2. **Authentication**
   - Email/Password enabled
   - Admin user created

## 📱 Usage

### Customer Flow

1. Visit the website: [https://bitehub99.netlify.app/](https://bitehub99.netlify.app/)
2. Click **"Order Now"** or scan QR code
3. Browse menu and add items to cart
4. Go to cart and proceed to checkout
5. Select payment method (Cash/Card/UPI)
6. Place order and track status in real-time

### Admin Flow

1. Click **"Admin Login"** on homepage
2. Login with credentials:
   - **Username:** `xxxx`
   - **Password:** `xxxx`
3. View pending orders (oldest first)
4. Manage stock availability
5. Mark orders as completed when ready

## 📁 Project Structure

```
enantra-foodstall/
├── src/
│   ├── components/          # React components
│   │   ├── AdminDashboard.jsx
│   │   ├── Cart.jsx
│   │   ├── Checkout.jsx
│   │   ├── Menu.jsx
│   │   ├── OrderSuccess.jsx
│   │   ├── StockManagement.jsx
│   │   └── ...
│   ├── context/              # React Context providers
│   │   ├── AuthContext.jsx
│   │   └── CartContext.jsx
│   ├── hooks/                # Custom React hooks
│   │   ├── useMenuItems.js
│   │   └── useOrders.js
│   ├── pages/                # Page components
│   │   ├── Home.jsx
│   │   └── AdminLogin.jsx
│   ├── ui/                   # UI components
│   │   ├── HeroSection.jsx
│   │   └── ...
│   ├── config/               # Configuration files
│   │   └── firebase.js
│   ├── data/                 # Static data
│   │   └── menuItems.js
│   ├── App.jsx               # Main app component
│   └── main.jsx              # Entry point
├── public/                   # Static assets
├── package.json
└── README.md
```

## 🚢 Deployment

### Deploy to Netlify

1. **Build the project**
   ```bash
   npm run build
   ```

2. **Deploy to Netlify**
   - Connect your GitHub repository to Netlify
   - Set build command: `npm run build`
   - Set publish directory: `dist`
   - Deploy!

3. **Environment Variables** (if needed)
   - Add Firebase config as environment variables in Netlify dashboard

### Current Deployment

- **URL:** [https://bitehub99.netlify.app/](https://bitehub99.netlify.app/)
- **Platform:** Netlify
- **Status:** ✅ Live

## 🔑 Admin Credentials

- **Username:** `Chaoscrew`
- **Password:** `surprisedude`
- **Email (Firebase):** `chaoscrew@enantra.com`

> ⚠️ **Important:** Change these credentials in production!

## 📊 Features Breakdown

### Real-time Order System
- Orders sync instantly between customer and admin
- No page refresh needed
- First-come-first-served ordering

### Stock Management
- Mark items as available/unavailable
- Real-time updates to customer menu
- Prevents ordering unavailable items

### Simplified Checkout
- Payment method selection only
- No customer details required
- Perfect for walk-in orders

### Order Status
- **Pending** → Orders waiting to be prepared
- **Completed** → Orders ready for pickup

## 🛡️ Security

- Firebase Authentication for admin access
- Protected admin routes
- Firestore security rules
- No sensitive data in localStorage

## 📝 Scripts

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run preview  # Preview production build
npm run lint     # Run ESLint
```

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

Built with ❤️ for Enantra Food Stall

## 🙏 Acknowledgments

- Firebase for backend infrastructure
- React team for the amazing framework
- Netlify for hosting
- All open-source contributors

---

**⭐ Star this repo if you find it helpful!**

For issues or questions, please open an issue on GitHub.
