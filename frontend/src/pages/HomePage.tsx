import { useProducts } from '../hooks/useProducts';

function HomePage() {
	const { data, error, isPending } = useProducts();

	console.log(data);
	console.log(isPending);

	return (
		<main className='container mx-auto px-4 py-8 max-w-6xl'>
			<div className='flex justify-between items-center mb-8'></div>
		</main>
	);
}

export default HomePage;
