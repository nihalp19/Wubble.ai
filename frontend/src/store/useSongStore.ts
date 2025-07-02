import { create } from 'zustand';
import { axiosInstance } from '../api/axiosConfig'; // Adjust the import path as necessary

// Define Song, Mood, Genre types as per your API response
export interface Song {
  id: number;                // Changed to number to match your mock data
  title: string;
  artist: string;
  url: string;
  duration: number;
  mood: string;
  genre: string;
}







interface ZustandState {
  currentMood: string;
  currentGenre: string;
  setCurrentMood: (mood: string) => void;
  setCurrentGenre: (genre: string) => void;
  moods: string[];
  genres: string[];
  songs: Song[];
  loading: boolean;
  error: string | null;
  recentSongs: Song[];
  fetchMoods: () => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchSongs: (mood: string, genre: string) => Promise<void>;
  addToRecentSongs: (song: Song) => void;
  clearRecentSongs: () => void;
  resetSongs: () => void;
}

export const useSongStore = create<ZustandState>((set, get) => ({
  currentGenre: '',
  currentMood: '',
  setCurrentMood: (mood: string) => set({ currentMood: mood }),
  setCurrentGenre: (genre: string) => set({ currentGenre: genre }),
  moods: [],
  genres: [],
  songs: [],
  loading: false,
  error: null,
  recentSongs: [],

  fetchMoods: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/moods');
      set({ moods: response.data.moods, loading: false }); // <-- Fix here
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },

  fetchGenres: async () => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.get('/genres');
      set({ genres: response.data.genres, loading: false }); // <-- Fix here
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },


  fetchSongs: async (mood: string, genre: string) => {
    set({ loading: true, error: null });
    try {
      const response = await axiosInstance.post('/generate-track', { mood, genre });
      // The song is at response.data.track
      set({ songs: [response.data.track], loading: false }); // Store as array!
    } catch (error: any) {
      set({ error: error.message, loading: false });
    }
  },


  addToRecentSongs: (song: Song) => {
    const { recentSongs } = get();
    const filtered = recentSongs.filter(s => s.id !== song.id);
    const updated = [song, ...filtered].slice(0, 10);
    set({ recentSongs: updated });
  },

  clearRecentSongs: () => set({ recentSongs: [] }),

  resetSongs: () => set({ songs: [], loading: false, error: null })
}));
