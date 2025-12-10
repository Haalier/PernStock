import { create } from 'zustand';

const mq = window.matchMedia('(prefers-color-scheme: dark)');

interface ThemeStore {
	theme: string;
	setTheme: (theme: string) => void;
}

export const useThemeStore = create<ThemeStore>(set => ({
	theme: localStorage.getItem('preferred-theme') || (mq.matches ? 'night' : 'pastel'),
	setTheme: (theme: string) => {
		localStorage.setItem('preferred-theme', theme);
		set({ theme });
	},
}));
