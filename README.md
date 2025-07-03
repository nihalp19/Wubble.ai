# 🎵 Wubble QuickTune

An AI-powered music generation platform that creates personalized tracks based on your mood and genre preferences. Experience the future of music creation with beautiful UI animations and seamless audio playback.


## ✨ Features

### 🎯 Core Functionality
- **Mood-Based Generation**: Choose from Happy, Sad, Energetic, or Chill moods
- **Genre Selection**: Pick from Pop, Lofi, Cinematic, or EDM genres
- **AI Music Generation**: Get unique tracks tailored to your preferences
- **Instant Playback**: Seamless audio streaming with built-in player

### 🎪 User Experience
- **Beautiful UI**: Modern design with aurora text effects and sparkles
- **Smooth Animations**: Flickering grid backgrounds and magic card interactions
- **Responsive Design**: Optimized for mobile, tablet, and desktop
- **Interactive Elements**: Hover effects and micro-interactions

### 🎧 Music Player
- **Full Controls**: Play, pause, skip functionality
- **Progress Tracking**: Real-time playback progress with duration display
- **Like System**: Save your favorite tracks
- **Download Feature**: Download generated tracks for offline listening
- **Recent History**: Quick access to recently played songs

### 💾 Data Persistence
- **Zustand Store**: Efficient state management with persistence
- **Local Storage**: Saves preferences, liked songs, and recent tracks
- **Session Management**: Maintains state across browser sessions

## 🚀 Getting Started

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd wubble-quicktune
   ```

2. **Install frontend dependencies**
   ```bash
   npm install
   ```

3. **Install backend dependencies**
   ```bash
   cd backend
   npm install
   ```

4. **Start the backend server**
   ```bash
   cd backend
   npm run dev
   ```

5. **Start the frontend development server**
   ```bash
   # In the root directory
   npm run dev
   ```

6. **Open your browser**
   Navigate to `http://localhost:5173`

## 🏗️ Project Structure

```
wubble-quicktune/
├── src/
│   ├── components/           # Reusable UI components
│   │   └── magicui/         # Magic UI components (Aurora, Sparkles, etc.)
│   ├── demo-components/     # Demo-specific components
│   │   ├── MagicCardDemo.tsx
│   │   ├── SongPlayerBar.tsx
│   │   ├── SongGeneratingLoader.tsx
│   │   └── LoadingSpinner.tsx
│   ├── store/               # State management
│   │   └── useSongStore.ts  # Zustand store for songs
│   ├── api/                 # API configuration
│   │   └── axiosConfig.ts   # Axios instance setup
│   ├── App.tsx              # Main application component
│   └── main.tsx             # Application entry point
├── backend/                 # Express.js backend
│   └── server.ts            # API server with mock data
└── public/                  # Static assets
```

## 🎨 Technology Stack

### Frontend
- **React 18.3.1**: Modern React with hooks and concurrent features
- **TypeScript**: Type-safe development
- **Tailwind CSS**: Utility-first CSS framework
- **Zustand**: Lightweight state management with persistence
- **Framer Motion**: Smooth animations and transitions
- **Lucide React**: Beautiful icons
- **Vite**: Fast build tool and development server

### Backend
- **Express.js**: Web framework for Node.js
- **CORS**: Cross-origin resource sharing
- **TypeScript**: Type-safe server development
- **Cloudinary**: Audio hosting and delivery


## 🔧 API Endpoints

### Base URL: `http://localhost:5000/api`

- **GET /moods** - Get available moods
  ```json
  {
    "moods": ["happy", "sad", "energetic", "chill"]
  }
  ```

- **GET /genres** - Get available genres
  ```json
  {
    "genres": ["pop", "lofi", "cinematic", "edm"]
  }
  ```

- **POST /generate-track** - Generate music track
  ```json
  // Request
  {
    "mood": "happy",
    "genre": "pop"
  }
  
  // Response
  {
    "success": true,
    "track": {
      "id": 1,
      "title": "Blinding Lights",
      "artist": "The Weeknd",
      "url": "https://...",
      "download": "https://...",
      "duration": 200,
      "mood": "happy",
      "genre": "pop",
      "generatedAt": "2024-01-01T00:00:00.000Z"
    }
  }
  ```

## 🎵 Music Generation Process

1. **Selection**: User chooses mood and genre from interactive cards
2. **Generation**: AI processes the combination (5-second simulation)
3. **Delivery**: Returns optimized audio track with metadata
4. **Playback**: Automatic playback with full player controls
5. **Persistence**: Saves to recent songs and allows liking/downloading

   

## 🎯 Key Features Explained

### Magic UI Components
- **Aurora Text**: Animated gradient text effects for branding
- **Sparkles Text**: Particle animation text for descriptions
- **Line Shadow Text**: 3D shadow text effects for titles
- **Flickering Grid**: Animated background patterns
- **Magic Cards**: Interactive selection cards with hover effects
- **Shimmer Button**: Animated generate button

### State Management
- **Persistent Storage**: Preferences saved locally using Zustand persist
- **Optimistic Updates**: Smooth UI interactions
- **Error Handling**: Graceful error states with user feedback
- **Loading States**: Beautiful loading animations during generation

### Audio Features
- **Seamless Playback**: Automatic audio loading and playback
- **Progress Tracking**: Real-time progress bar with time display
- **Like System**: Heart icon to save favorite tracks
- **Download Support**: Direct download links for generated tracks
- **Recent History**: Dropdown showing recently played songs

## 🚀 Performance Optimizations

- **Code Splitting**: Automatic chunk splitting with Vite
- **Lazy Loading**: Components loaded on demand
- **Audio Optimization**: Efficient audio streaming from Cloudinary
- **Bundle Analysis**: Optimized build sizes
- **State Persistence**: Efficient local storage management

## 🐛 Troubleshooting

### Common Issues

1. **Audio Not Playing**
   - Check browser audio permissions
   - Verify CORS settings for audio URLs
   - Ensure audio format compatibility (MP3)
   - Check network connectivity to Cloudinary

2. **API Connection Issues**
   - Verify backend server is running on port 5000
   - Check CORS configuration in server.ts
   - Validate API endpoint URLs in axiosConfig.ts
   - Ensure both frontend and backend are running

3. **Build Errors**
   - Clear node_modules and reinstall dependencies
   - Check TypeScript version compatibility
   - Verify all dependencies are installed
   - Check for missing environment variables

4. **State Persistence Issues**
   - Clear browser local storage
   - Check Zustand persist configuration
   - Verify browser supports local storage





