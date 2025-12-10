import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { useThemeStore } from './store/useThemeStore';

export default function App() {
	const { theme } = useThemeStore();
	return (
		<div className='min-h-svh bg-base-200 transition-colors duration-300' data-theme={theme}>
			<Navbar />

			<Routes>
				<Route path='/' element={<HomePage />} />
				<Route path='/' element={<ProductPage />} />
			</Routes>
		</div>
	);
}
