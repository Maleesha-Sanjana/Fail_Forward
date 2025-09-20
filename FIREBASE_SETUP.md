# Firebase Setup Guide for FailForward

This guide will walk you through setting up Firebase Authentication and Firestore Database for your FailForward project.

## Step 1: Create a Firebase Project

1. **Go to Firebase Console**
   - Visit [https://console.firebase.google.com/](https://console.firebase.google.com/)
   - Sign in with your Google account

2. **Create New Project**
   - Click "Create a project" or "Add project"
   - Enter project name: `failforward` (or any name you prefer)
   - Click "Continue"

3. **Configure Google Analytics** (Optional)
   - You can enable or disable Google Analytics
   - For this project, you can disable it
   - Click "Create project"

4. **Wait for Project Creation**
   - Firebase will create your project (takes 1-2 minutes)
   - Click "Continue" when ready

## Step 2: Enable Authentication

1. **Navigate to Authentication**
   - In the left sidebar, click "Authentication"
   - Click "Get started"

2. **Set up Sign-in Methods**
   - Click on "Sign-in method" tab
   - Enable "Email/Password":
     - Click on "Email/Password"
     - Toggle "Enable" to ON
     - Click "Save"
   
   - Enable "Google":
     - Click on "Google"
     - Toggle "Enable" to ON
     - Select a project support email (your email)
     - Click "Save"

3. **Configure Authorized Domains**
   - Go to "Settings" tab in Authentication
   - Under "Authorized domains", you should see:
     - `localhost` (for development)
     - Your project domain (for production)
   - Add any additional domains if needed

## Step 3: Set up Firestore Database

1. **Navigate to Firestore Database**
   - In the left sidebar, click "Firestore Database"
   - Click "Create database"

2. **Choose Security Rules**
   - Select "Start in test mode" (for development)
   - Click "Next"
   - **Important**: We'll update these rules later for security

3. **Choose Location**
   - Select a location closest to your users
   - For most cases, choose "us-central1" or "us-east1"
   - Click "Done"

4. **Wait for Database Creation**
   - Firestore will create your database (takes 1-2 minutes)

## Step 4: Get Firebase Configuration

1. **Go to Project Settings**
   - Click the gear icon (⚙️) next to "Project Overview"
   - Select "Project settings"

2. **Get Web App Configuration**
   - Scroll down to "Your apps" section
   - Click the web icon (</>) to add a web app
   - Enter app nickname: `failforward-web`
   - Check "Also set up Firebase Hosting" (optional)
   - Click "Register app"

3. **Copy Configuration**
   - You'll see a configuration object like this:
   ```javascript
   const firebaseConfig = {
     apiKey: "AIzaSyC...",
     authDomain: "failforward-12345.firebaseapp.com",
     projectId: "failforward-12345",
     storageBucket: "failforward-12345.appspot.com",
     messagingSenderId: "123456789",
     appId: "1:123456789:web:abcdef123456"
   };
   ```
   - **Copy this entire configuration object**

## Step 5: Update Your Project Configuration

1. **Open Firebase Config File**
   - Navigate to: `src/firebase/config.js`
   - Replace the placeholder values with your actual config:

   ```javascript
   import { initializeApp } from 'firebase/app';
   import { getAuth } from 'firebase/auth';
   import { getFirestore } from 'firebase/firestore';
   import { getStorage } from 'firebase/storage';

   // Replace this with your actual Firebase config
   const firebaseConfig = {
     apiKey: "your-actual-api-key",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-actual-project-id",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "your-sender-id",
     appId: "your-app-id"
   };

   // Initialize Firebase
   const app = initializeApp(firebaseConfig);

   // Initialize Firebase services
   export const auth = getAuth(app);
   export const db = getFirestore(app);
   export const storage = getStorage(app);

   export default app;
   ```

## Step 6: Set up Firestore Security Rules

1. **Go to Firestore Rules**
   - In Firebase Console, go to "Firestore Database"
   - Click on "Rules" tab

2. **Update Security Rules**
   - Replace the default rules with these:

   ```javascript
   rules_version = '2';
   service cloud.firestore {
     match /databases/{database}/documents {
       // Users can read and write their own user document
       match /users/{userId} {
         allow read, write: if request.auth != null && request.auth.uid == userId;
       }
       
       // Anyone can read failures, but only authenticated users can write
       match /failures/{failureId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Anyone can read future goals, but only authenticated users can write
       match /futureGoals/{goalId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
       
       // Comments can be read by anyone, written by authenticated users
       match /comments/{commentId} {
         allow read: if true;
         allow write: if request.auth != null;
       }
     }
   }
   ```

3. **Publish Rules**
   - Click "Publish" to save the rules

## Step 7: Test Your Setup

1. **Install Dependencies**
   ```bash
   cd /Users/maleeshasanjana/Desktop/Fail_Forward
   npm install
   ```

2. **Start Development Server**
   ```bash
   npm run dev
   ```

3. **Test Authentication**
   - Go to `http://localhost:3000`
   - Click "Get Started" or "Sign In"
   - Try creating an account with email/password
   - Try signing in with Google
   - Check if you can access the dashboard

4. **Test Firestore**
   - In the dashboard, try adding a failure or future goal
   - Check Firebase Console > Firestore Database to see if data appears

## Step 8: Environment Variables (Optional but Recommended)

For better security, you can use environment variables:

1. **Create .env file**
   ```bash
   touch .env
   ```

2. **Add to .env file**
   ```
   VITE_FIREBASE_API_KEY=your-api-key
   VITE_FIREBASE_AUTH_DOMAIN=your-project.firebaseapp.com
   VITE_FIREBASE_PROJECT_ID=your-project-id
   VITE_FIREBASE_STORAGE_BUCKET=your-project.appspot.com
   VITE_FIREBASE_MESSAGING_SENDER_ID=your-sender-id
   VITE_FIREBASE_APP_ID=your-app-id
   ```

3. **Update config.js to use environment variables**
   ```javascript
   const firebaseConfig = {
     apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
     authDomain: import.meta.env.VITE_FIREBASE_AUTH_DOMAIN,
     projectId: import.meta.env.VITE_FIREBASE_PROJECT_ID,
     storageBucket: import.meta.env.VITE_FIREBASE_STORAGE_BUCKET,
     messagingSenderId: import.meta.env.VITE_FIREBASE_MESSAGING_SENDER_ID,
     appId: import.meta.env.VITE_FIREBASE_APP_ID
   };
   ```

## Step 9: Deploy to Production (Optional)

1. **Build for Production**
   ```bash
   npm run build
   ```

2. **Deploy to Firebase Hosting**
   ```bash
   npm install -g firebase-tools
   firebase login
   firebase init hosting
   firebase deploy
   ```

## Troubleshooting

### Common Issues:

1. **"Firebase: Error (auth/configuration-not-found)"**
   - Check that your Firebase config is correct
   - Make sure you copied the entire config object

2. **"Permission denied" errors**
   - Check your Firestore security rules
   - Make sure the user is authenticated

3. **Google Sign-in not working**
   - Check that Google sign-in is enabled in Firebase Console
   - Make sure your domain is authorized

4. **Data not appearing in Firestore**
   - Check the browser console for errors
   - Verify your security rules allow the operation
   - Check the Firestore console to see if data is being written

### Getting Help:

- Firebase Documentation: [https://firebase.google.com/docs](https://firebase.google.com/docs)
- Firebase Console: [https://console.firebase.google.com/](https://console.firebase.google.com/)
- Check browser console for detailed error messages

## Next Steps

Once Firebase is set up:

1. Test all authentication methods
2. Test creating and reading data
3. Customize the security rules for your needs
4. Set up monitoring and analytics
5. Deploy to production when ready

Your FailForward project should now be fully functional with Firebase Authentication and Firestore Database!
