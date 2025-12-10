import { Link } from 'react-router';
import type { Product } from '../models/ProductModel';
import { EditIcon, Trash2Icon } from 'lucide-react';
import { useDeleteProduct } from '../hooks/useProducts';

function ProductCard({ product }: { product: Product }) {
	const { mutate, isPending } = useDeleteProduct();

	const handleDeleteProduct = (id: number) => {
		mutate(id);
	};

	return (
		<div
			className={`card bg-base-100 shadow-xl hover:shadow-2xl hover:-translate-y-1 transition-all duration-300 ${
				isPending ? 'pointer-events-none' : ''
			}`}
		>
			{isPending && (
				<div className='z-50 absolute inset-0 bg-base-100/60 backdrop-blur-sm flex items-center justify-center rounded-xl'>
					<span className='loading loading-spinner loading-xl text-primary'></span>
				</div>
			)}
			<figure className='relative pt-[56.52%]'>
				<img src={product.image} alt={product.name} className='absolute top-0 left-0 w-full h-full object-cover' />
			</figure>

			<div className='card-body'>
				<h2 className='card-title text-xl font-semibold'>{product.name}</h2>
				<p className='text-2xl font-bold text-primary'>${Number(product.price).toFixed(2)}</p>
			</div>

			<div className='card-actions justify-end m-4'>
				<Link to={`/product/${product.id}`} className='btn btn-sm btn-info btn-outline'>
					<EditIcon className='size--4' />
				</Link>

				<button className='btn btn-sm btn-error btn-outline' onClick={() => handleDeleteProduct(product.id)}>
					<Trash2Icon className='size-4' />
				</button>
			</div>
		</div>
	);
}

export default ProductCard;
