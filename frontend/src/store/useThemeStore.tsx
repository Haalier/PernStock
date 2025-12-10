import { create } from 'zustand';
import { getThemeColors, THEMES, type ThemeName } from '../constants';

const mq = window.matchMedia('(prefers-color-scheme: dark)');

interface ThemeStore {
	theme: string;
	themeColors: [string, string, string];
	setTheme: (theme: ThemeName) => void;
}

// export const useThemeStore = create<ThemeStore>(set => ({

// 	theme: localStorage.getItem('preferred-theme') || (mq.matches ? 'night' : 'pastel'),
// 	themeColors: JSON.parse(localStorage.getItem('preferred-theme-colors') || JSON.stringify(mq.matches ? ["#0F172A", "#334155", "#64748B"] : ["#ffd8d8", "#b7e4c7", "#d8b4fe"])),
// 	setTheme: (theme: string) => {
// 		localStorage.setItem('preferred-theme', theme);
// 		set({ theme });
// 	},
// }));

export const useThemeStore = create<ThemeStore>(set => {
	const savedTheme = localStorage.getItem('preferred-theme') as ThemeName | null;
	const savedColors = localStorage.getItem('preferred-theme-colors');

	const initialTheme = savedTheme && THEMES.some(t => t.name === savedTheme) ? savedTheme : mq.matches ? 'night' : 'pastel';

	const initialColors = savedColors ? JSON.parse(savedColors) : getThemeColors(initialTheme);

	return {
		theme: initialTheme,
		themeColors: initialColors,
		setTheme: (theme: ThemeName) => {
			const colors = getThemeColors(theme);
			localStorage.setItem('preferred-theme', theme);
			localStorage.setItem('preferred-theme-colors', JSON.stringify(colors));
			set({ theme, themeColors: colors });
		},
	};
});
