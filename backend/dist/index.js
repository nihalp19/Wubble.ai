"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
app.use((0, cors_1.default)());
app.use(express_1.default.json());
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
app.all("/", (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    res.send("BACKEND IS WORKING");
}));
app.get('/api/moods', (req, res) => {
    res.json(moods);
});
app.get('/api/genres', (req, res) => {
    res.json(genres);
});
app.post('/api/generate-track', (req, res) => {
    const { mood, genre } = req.body;
    setTimeout(() => {
        let filteredTracks = mockTracks.filter(track => track.mood === mood && track.genre === genre);
        if (filteredTracks.length === 0) {
            filteredTracks = mockTracks.filter(track => track.mood === mood || track.genre === genre);
        }
        if (filteredTracks.length === 0) {
            filteredTracks = mockTracks;
        }
        const randomTrack = filteredTracks[Math.floor(Math.random() * filteredTracks.length)];
        res.json({
            success: true,
            track: Object.assign(Object.assign({}, randomTrack), { generatedAt: new Date().toISOString() })
        });
    }, 2000);
});
app.listen(PORT, () => {
    console.log(`Server running on http://localhost:${PORT}`);
});
