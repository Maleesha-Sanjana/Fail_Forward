# FailForward - Turn Failures Into Fuel

A modern social platform where users share their failures, learn from community solutions, and build their future goals. Built with React, Vite, and Firebase.

## Features

- **Landing Page**: Social media-style hero section with features showcase
- **Login Page**: Futuristic design with cursor-tracking robot background
- **Dashboard**: 3-section layout (Failures, Community Feed, Future Goals)
- **Authentication**: Firebase Auth with Google sign-in support
- **Database**: Firebase Firestore for real-time data
- **UI**: LinkedIn-inspired design with custom CSS

## Tech Stack

- **Frontend**: React 18 + Vite
- **Styling**: Custom CSS (LinkedIn-style)
- **Authentication**: Firebase Auth
- **Database**: Firebase Firestore
- **Routing**: React Router DOM
- **Animations**: Framer Motion (for robot interactions)

## Getting Started

### Prerequisites

- Node.js (v16 or higher)
- Firebase project with Authentication and Firestore enabled

### Installation

1. Clone the repository:
```bash
git clone <your-repo-url>
cd FailForward
```

2. Install dependencies:
```bash
npm install
```

3. Set up Firebase:
   - Create a Firebase project at [Firebase Console](https://console.firebase.google.com/)
   - Enable Authentication (Email/Password and Google)
   - Enable Firestore Database
   - Get your Firebase config

4. Update Firebase configuration:
   - Open `src/firebase/config.js`
   - Replace the placeholder values with your actual Firebase config

5. Start the development server:
```bash
npm run dev
```

6. Open your browser and navigate to `http://localhost:3000`

## Project Structure

```
src/
├── components/
│   ├── Navbar.jsx           # Navigation component
│   ├── ProtectedRoute.jsx   # Route protection
│   └── RobotBackground.jsx  # Cursor-tracking robot
├── contexts/
│   └── AuthContext.jsx      # Firebase auth context
├── firebase/
│   └── config.js            # Firebase configuration
├── pages/
│   ├── LandingPage.jsx      # Public landing page
│   ├── LoginPage.jsx        # Login/signup page
│   └── Dashboard.jsx        # Main user dashboard
├── App.jsx                  # Main app component
├── main.jsx                 # App entry point
└── index.css                # Global styles
```

## Firebase Collections

### Users
```javascript
{
  uid: string,
  email: string,
  displayName: string,
  bio: string,
  avatarUrl: string,
  reputation: number,
  badges: array,
  following: array,
  followers: array,
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Failures
```javascript
{
  title: string,
  description: string,
  authorId: string,
  authorName: string,
  authorAvatar: string,
  tags: array,
  votes: number,
  comments: number,
  status: string, // 'open', 'resolved', 'archived'
  createdAt: timestamp,
  updatedAt: timestamp
}
```

### Future Goals
```javascript
{
  title: string,
  description: string,
  authorId: string,
  authorName: string,
  targetDate: timestamp,
  status: string, // 'active', 'completed', 'paused'
  createdAt: timestamp,
  updatedAt: timestamp
}
```

## Features Overview

### Landing Page
- Hero section with call-to-action
- Features showcase (Share Failures, Find Solutions, Build Future)
- How it works section
- Footer with links

### Login Page
- Email/password authentication
- Google sign-in integration
- Cursor-tracking robot background
- Toggle between sign-in and sign-up

### Dashboard
- **Left Section**: Personal failures with add functionality
- **Center Section**: Community feed showing all users' posts
- **Right Section**: Future goals with add functionality
- Real-time updates using Firestore listeners

## Customization

### Styling
The project uses custom CSS with LinkedIn-inspired design. Key CSS variables are defined in `src/index.css`:

```css
:root {
  --linkedin-blue: #0a66c2;
  --linkedin-blue-hover: #004182;
  --linkedin-gray: #666666;
  --linkedin-light-gray: #f3f2ef;
  /* ... more variables */
}
```

### Robot Animation
The cursor-tracking robot is implemented in `src/components/RobotBackground.jsx` with CSS animations and JavaScript mouse tracking.

## Deployment

### Vercel (Recommended)
1. Push your code to GitHub
2. Connect your repository to Vercel
3. Add environment variables for Firebase config
4. Deploy

### Firebase Hosting
1. Install Firebase CLI: `npm install -g firebase-tools`
2. Login: `firebase login`
3. Initialize: `firebase init hosting`
4. Build: `npm run build`
5. Deploy: `firebase deploy`

## Contributing

1. Fork the repository
2. Create a feature branch: `git checkout -b feature-name`
3. Commit changes: `git commit -am 'Add feature'`
4. Push to branch: `git push origin feature-name`
5. Submit a pull request

## License

This project is licensed under the MIT License.

## Support

For support, email your-email@example.com or create an issue in the repository.
