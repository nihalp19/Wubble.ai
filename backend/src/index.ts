import express, { Request, Response } from 'express';
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();
const app = express();


const PORT = process.env.PORT || 5000;

const FRONTEND_URL: string = process.env.FRONTEND_URL || 'http://localhost:5173';

app.use(cors({
  origin: [FRONTEND_URL],
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH'],
  credentials: true
}));


app.use(express.json());

const moods = ["happy", "sad", "energetic", "chill"];
const genres = ["pop", "lofi", "cinematic", "edm"];



const mockTracks = [
  {
    id: 1,
    title: 'Blinding Lights',
    artist: 'The Weeknd',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444264/ps4zq3srtdrfxyvhrapc.mp3',
    duration: 200,
    mood: 'happy',
    genre: 'pop'
  },
  {
    id: 2,
    title: 'Raabta (Lofi Remix)',
    artist: 'Arijit Singh',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444260/mfixymezpkoktarhklqm.mp3',
    duration: 180,
    mood: 'happy',
    genre: 'lofi'
  },
  {
    id: 3,
    title: 'Lut Gaye',
    artist: 'Arijit Singh',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444249/xfhi1cy26tzv3sceieqj.mp3',
    duration: 190,
    mood: 'happy',
    genre: 'cinematic'
  },
  {
    id: 4,
    title: 'Starboy (Kygo Remix)',
    artist: 'The Weeknd',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444251/g9qzj9rdc6v31i9whcbk.mp3',
    duration: 210,
    mood: 'happy',
    genre: 'edm'
  },
  {
    id: 5,
    title: 'Call Out My Name',
    artist: 'The Weeknd',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444256/jvf0nxodvd5knttqvurz.mp3',
    duration: 220,
    mood: 'sad',
    genre: 'pop'
  },
  {
    id: 6,
    title: 'Apna Bana Le (Lofi)',
    artist: 'Arijit Singh',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444247/zceawfngk3jtcaj5ecyp.mp3',
    duration: 185,
    mood: 'sad',
    genre: 'lofi'
  },
  {
    id: 7,
    title: 'Tum Hi Ho',
    artist: 'Arijit Singh',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444255/v3iczmgbigfihckj1hma.mp3',
    duration: 240,
    mood: 'sad',
    genre: 'cinematic'
  },
  {
    id: 8,
    title: 'Tu Aake Dekhle',
    artist: 'King',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444254/pq88drlbevrce0yenyja.mp3',
    duration: 175,
    mood: 'energetic',
    genre: 'pop'
  },
  {
    id: 9,
    title: 'She Move It Like (Lofi Remix)',
    artist: 'Badshah',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444249/evdumqwnp6jdjscqmblj.mp3',
    duration: 165,
    mood: 'energetic',
    genre: 'lofi'
  },
  {
    id: 10,
    title: 'Yeh Fitoor Mera',
    artist: 'Arijit Singh',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444256/pdz3n5cszfktj4v0wtsz.mp3',
    duration: 195,
    mood: 'energetic',
    genre: 'cinematic'
  },
  {
    id: 11,
    title: 'Die For You (Remix)',
    artist: 'The Weeknd',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444249/ilpratxhhk2bgqdhigay.mp3',
    duration: 210,
    mood: 'chill',
    genre: 'pop'
  },
  {
    id: 12,
    title: 'Kya Mujhe Pyaar Hai (Lofi)',
    artist: 'KK',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444247/v2ismvvtrnb15npr18pj.mp3',
    duration: 180,
    mood: 'chill',
    genre: 'lofi'
  },
  {
    id: 13,
    title: 'Khaabon Ke Parinday',
    artist: 'Mohit Chauhan',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444260/pxjlny9x37pklvurpvs8.mp3',
    duration: 200,
    mood: 'chill',
    genre: 'cinematic'
  },
  {
    id: 14,
    title: 'Nothing’s Gonna Hurt You Baby (EDM Remix)',
    artist: 'Cigarettes After Sex',
    url: 'https://res.cloudinary.com/dxavgp3fo/video/upload/v1751444252/y9ewwdhgzpjh88dhdccs.mp3',
    duration: 215,
    mood: 'chill',
    genre: 'edm'
  }
];


app.all("/", async (req, res) => {
  res.send("BACKEND IS WORKING")
})

app.get('/api/moods', (req, res) => {
  res.json({ moods });
});

app.get('/api/genres', (req, res) => {
  res.json({ genres });
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

export default app;
