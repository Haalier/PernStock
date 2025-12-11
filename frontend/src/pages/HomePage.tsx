import { PackageIcon, PlusCircleIcon } from 'lucide-react';
import { useProducts } from '../hooks/useProducts';
import type { Product } from '../models/ProductModel';
import ProductCard from '../components/ProductCard';
import AddProductModal from '../components/AddProductModal';

function HomePage() {
	const { data, error, isPending } = useProducts();

	function openModal() {
		return (document.getElementById('add_product_modal') as HTMLDialogElement).showModal();
	}

	return (
		<main className='container mx-auto px-4 py-8 max-w-6xl'>
			<div className='flex justify-between items-center mb-8'>
				<button className='btn btn-primary' onClick={openModal}>
					<PlusCircleIcon className='size-5 mr-2' />
					Add Product
				</button>
			</div>

			<AddProductModal />

			{error && <div className='alert alert-error mb-8'>{error.message}</div>}

			{data?.length === 0 && !isPending && (
				<div className='flex flex-col justify-center items-center h-96 space-y-4'>
					<div className='bg-base-100 rounded-full p-6'>
						<PackageIcon className='size-12' />
					</div>
					<div className='text-center space-y-2'>
						<h3 className='text-2xl font-semibold'>No products found</h3>
						<p className='text-gray-500 max-w-sm'>Get started by adding you first product to the inventory</p>
					</div>
				</div>
			)}

			{isPending ? (
				<div className='flex justify-center items-center h-64'>
					<div className='loading loading-spinner loading-lg'></div>
				</div>
			) : (
				<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6'>
					{data?.map((product: Product) => (
						<ProductCard key={product.id} product={product} />
					))}
				</div>
			)}
		</main>
	);
}

export default HomePage;
