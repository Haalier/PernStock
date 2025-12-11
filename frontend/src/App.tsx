import { Route, Routes } from 'react-router';
import Navbar from './components/Navbar';
import HomePage from './pages/HomePage';
import ProductPage from './pages/ProductPage';
import { useThemeStore } from './store/useThemeStore';
import { Toaster } from 'react-hot-toast';
import NotFound404 from './pages/NotFound404';

export default function App() {
	const { theme, themeColors } = useThemeStore();
	return (
		<div className='min-h-svh flex flex-col bg-base-200 transition-colors duration-300' data-theme={theme}>
			<Navbar />

			<div className='flex-1 min-h-full'>
				<Routes>
					<Route path='/' element={<HomePage />} />
					<Route path='/product/:id' element={<ProductPage />} />
					<Route path='*' element={<NotFound404 />} />
				</Routes>
			</div>
			<Toaster
				toastOptions={{
					duration: 5000,
					style: {
						borderRadius: '12px',
						background: `${themeColors[0]}`,
						color: `${themeColors[2]}`,
						border: '1px solid rgba(255,255,255,0.1)',
						boxShadow: '0 10px 25px -5px rgba(0,0,0,0.4)',
						padding: '14px 20px',
						fontSize: '15px',
						maxWidth: '420px',
					},
					success: {
						iconTheme: {
							primary: '#10b981',
							secondary: '#ecfdf5',
						},
						style: {
							borderLeft: '4px solid #10b981',
						},
					},
					error: {
						iconTheme: {
							primary: '#ef4444',
							secondary: '#fee2e2',
						},
						style: {
							borderLeft: '4px solid #ef4444',
						},
					},
					loading: {
						style: {
							background: '#1e293b',
							color: '#f1f5f9',
							borderLeft: '4px solid #3b82f6',
						},
					},
				}}
			/>
		</div>
	);
}
