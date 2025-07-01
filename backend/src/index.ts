import express from 'express';
import cors from "cors"
import dotenv from "dotenv"

dotenv.config()


const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

const moods = [
  { id: 'happy', name: 'Happy', description: 'Uplifting and joyful vibes' },
  { id: 'sad', name: 'Sad', description: 'Melancholic and emotional' },
  { id: 'energetic', name: 'Energetic', description: 'High energy and motivating' },
  { id: 'chill', name: 'Chill', description: 'Relaxing and laid-back' }
];

const genres = [
  { id: 'pop', name: 'Pop', description: 'Catchy mainstream melodies' },
  { id: 'lofi', name: 'Lo-fi', description: 'Smooth and nostalgic beats' },
  { id: 'cinematic', name: 'Cinematic', description: 'Epic and atmospheric' },
  { id: 'edm', name: 'EDM', description: 'Electronic dance music' }
];


const mockTracks = [
  {
    id: 1,
    title: 'Sunny Day Vibes',
    artist: 'AI Composer',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 120,
    mood: 'happy',
    genre: 'pop'
  },
  {
    id: 2,
    title: 'Midnight Thoughts',
    artist: 'AI Composer',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 180,
    mood: 'sad',
    genre: 'lofi'
  },
  {
    id: 3,
    title: 'Power Rush',
    artist: 'AI Composer',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 150,
    mood: 'energetic',
    genre: 'edm'
  },
  {
    id: 4,
    title: 'Calm Waters',
    artist: 'AI Composer',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 200,
    mood: 'chill',
    genre: 'cinematic'
  },
  {
    id: 5,
    title: 'Upbeat Journey',
    artist: 'AI Composer',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 140,
    mood: 'happy',
    genre: 'edm'
  },
  {
    id: 6,
    title: 'Contemplation',
    artist: 'AI Composer',
    url: 'https://www.soundjay.com/misc/sounds/bell-ringing-05.wav',
    duration: 160,
    mood: 'sad',
    genre: 'cinematic'
  }
];

app.all("/",async(req,res) => {
    res.send("BACKEND IS WORKING")
})

app.get('/api/moods', (req, res) => {
  res.json(moods);
});

app.get('/api/genres', (req, res) => {
  res.json(genres);
});

app.post('/api/generate-track', (req, res) => {
  const { mood, genre } = req.body;
  
  setTimeout(() => {
    
    let filteredTracks = mockTracks.filter(
      track => track.mood === mood && track.genre === genre
    );
    
    if (filteredTracks.length === 0) {
      filteredTracks = mockTracks.filter(
        track => track.mood === mood || track.genre === genre
      );
    }
    
    if (filteredTracks.length === 0) {
      filteredTracks = mockTracks;
    }
    
    const randomTrack = filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
    
    res.json({
      success: true,
      track: {
        ...randomTrack,
        generatedAt: new Date().toISOString()
      }
    });
  }, 2000); 
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});