import { PlusCircleIcon } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../models/ProductModel';
import ProductCard from '../components/ProductCard';

function HomePage() {
	const { data, error, isPending } = useProducts();

	console.log(data);
	console.log(isPending);

	return (
		<main className='container mx-auto px-4 py-8 max-w-6xl'>
			<div className='flex justify-between items-center mb-8'>
				<button className='btn btn-primary'>
					<PlusCircleIcon className='size-5 mr-2' />
					Add Product
				</button>
			</div>

			{error && <div className='alert alert-error mb-8'>{error.message}</div>}

			{isPending ? (
				<div className='flex justify-center items-center h-64'>
					<div className='loading loading-spinner loading-lg'></div>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{data?.map((product: Product) => (
						<ProductCard product={product}/>
					))}
				</div>
			)}
		</main>
	);
}

export default HomePage;
