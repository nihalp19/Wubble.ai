import { create } from "zustand";
import { persist } from "zustand/middleware";
import { axiosInstance } from "../api/axiosConfig";

export interface Song {
  id: number;
  title: string;
  artist: string;
  url: string;
  duration: number;
  mood: string;
  genre: string;
  isLiked?: boolean;
}

interface ZustandState {
  currentMood: string;
  currentGenre: string;
  setCurrentMood: (mood: string) => void;
  setCurrentGenre: (genre: string) => void;

  moods: string[];
  genres: string[];

  songs: Song[];
  currentSongIndex: number;

  likedSongs: Song[];
  recentSongs: Song[];

  loading: boolean;
  error: string | null;

  fetchMoods: () => Promise<void>;
  fetchGenres: () => Promise<void>;
  fetchSongs: (mood: string, genre: string) => Promise<void>;

  setCurrentSongIndex: (index: number) => void;
  getCurrentSong: () => Song | null;

  toggleLike: (songId: number) => void;
  addToRecentSongs: (song: Song) => void;
  clearRecentSongs: () => void;
  resetSongs: () => void;
}

export const useSongStore = create<ZustandState>()(
  persist(
    (set, get) => ({
      currentMood: "",
      currentGenre: "",
      moods: [],
      genres: [],
      songs: [],
      currentSongIndex: 0,
      likedSongs: [],
      recentSongs: [],
      loading: false,
      error: null,

      setCurrentMood: (mood) => set({ currentMood: mood }),
      setCurrentGenre: (genre) => set({ currentGenre: genre }),

      fetchMoods: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.get("/moods");
          set({ moods: response.data.moods, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      fetchGenres: async () => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.get("/genres");
          set({ genres: response.data.genres, loading: false });
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      fetchSongs: async (mood: string, genre: string) => {
        set({ loading: true, error: null });
        try {
          const response = await axiosInstance.post("/generate-track", { mood, genre });
          const newSong: Song = { ...response.data.track, isLiked: false };

          const updatedSongs = [newSong];
          set({
            songs: updatedSongs,
            currentSongIndex: 0,
            loading: false,
          });

          get().addToRecentSongs(newSong);
        } catch (error: any) {
          set({ error: error.message, loading: false });
        }
      },

      setCurrentSongIndex: (index) => {
        const songs = get().songs;
        if (index >= 0 && index < songs.length) {
          set({ currentSongIndex: index });
          get().addToRecentSongs(songs[index]);
        }
      },

      getCurrentSong: () => {
        const { songs, currentSongIndex } = get();
        return songs[currentSongIndex] || null;
      },

      toggleLike: (songId) => {
        const songs = get().songs.map((song) =>
          song.id === songId ? { ...song, isLiked: !song.isLiked } : song
        );
        const likedSongs = [...get().likedSongs];
        const toggledSong = songs.find((s) => s.id === songId);

        let updatedLikedSongs = likedSongs.filter((s) => s.id !== songId);
        if (toggledSong?.isLiked) {
          updatedLikedSongs = [toggledSong, ...updatedLikedSongs];
        }

        set({ songs, likedSongs: updatedLikedSongs });
      },

      addToRecentSongs: (song: Song) => {
        const { recentSongs } = get();
        const filtered = recentSongs.filter((s) => s.id !== song.id);
        const updated = [song, ...filtered].slice(0, 10); // limit to 10
        set({ recentSongs: updated });
      },

      clearRecentSongs: () => set({ recentSongs: [] }),

      resetSongs: () => set({ songs: [], currentSongIndex: 0, error: null }),
    }),
    {
      name: "wubble-song-store",
      partialize: (state) => ({
        currentMood: state.currentMood,
        currentGenre: state.currentGenre,
        recentSongs: state.recentSongs,
        likedSongs: state.likedSongs,
      }),
    }
  )
);
