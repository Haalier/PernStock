import { useNavigate, useParams } from 'react-router';
import { useProduct, useUpdateProduct } from '../hooks/useProducts';
import { ArrowLeftIcon, SaveIcon, Trash2Icon } from 'lucide-react';
import { useForm, type SubmitHandler } from 'react-hook-form';
import ConfirmModal from '../components/ConfirmModal';

type Inputs = {
	name: string;
	price: number;
	image: string;
};

function ProductPage() {
	const { id } = useParams();
	const productId = Number(id!);
	const { data: product, isPending, error: productError } = useProduct(productId);
	const { mutate: updateProduct, isPending: isPendingUpdate, error: updateError } = useUpdateProduct();
	const { register, handleSubmit, formState } = useForm<Inputs>();
	const navigate = useNavigate();
	const error = productError || updateError;

	function openConfirmModal(): void {
		const modal = document.getElementById('confirm_delete_dialog') as HTMLDialogElement;
		modal.showModal();
	}

	const onSubmit: SubmitHandler<Inputs> = data => {
		console.log(data);
		updateProduct({ id: productId, data });
	};

	if (isPending || isPendingUpdate) {
		return (
			<div className='flex justify-center items-center min-h-svh'>
				<div className='loading loading-spinner loading-lg'></div>
			</div>
		);
	}

	if (productError || updateError) {
		return (
			<div className='container mx-auto px-4 py-8'>
				<div className='alert alert-error'>{error?.message}</div>
			</div>
		);
	}

	return (
		<div className='container mx-auto px-4 py-7 max-w-4xl'>
			<button onClick={() => navigate('/')} className='btn btn-ghost mb-8'>
				<ArrowLeftIcon className='size-4 mr-2' />
				Back to products
			</button>

			<div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
				<div className='rounded-lg overflow-hidden shadow-lg bg-base-100'>
					<img src={product?.image} alt={product?.name} />
				</div>

				<div className='card bg-base-100 shadow-lg'>
					<div className='card-body'>
						<h2 className='card-title text-2xl mb-6'>Edit Product</h2>

						<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
							<div className='flex flex-col gap-1'>
								<span className='label text-base font-medium'>Product Name</span>
								<label className='input w-full'>
									<input
										type='text'
										defaultValue={product?.name}
										placeholder='Enter product name'
										className='grow'
										{...register('name', { required: true })}
									/>
								</label>
							</div>

							<div className='flex flex-col gap-1'>
								<span className='label text-base font-medium'>Price</span>
								<label className='input w-full'>
									<input
										defaultValue={product?.price}
										type='number'
										min={0}
										step={0.01}
										placeholder='0.00'
										className='grow focus:input-primary transition-colors duration-200'
										{...register('price', { required: true, min: 0 })}
									/>
								</label>
							</div>

							<div className='flex flex-col gap-1'>
								<span className='label text-base font-medium'>Image URL</span>
								<label className='input w-full'>
									<input
										type='text'
										placeholder='https://example.com/image.jpg'
										defaultValue={product?.image}
										className='grow'
										{...register('image', { required: true })}
									/>
								</label>
							</div>

							<div className='flex justify-between mt-8'>
								<button type='button' onClick={openConfirmModal} className='btn btn-error'>
									<Trash2Icon className='size-4 mr-2' />
									Delete Product
								</button>

								<button type='submit' className='btn btn-primary' disabled={!formState.isValid || isPendingUpdate}>
									{isPendingUpdate ? (
										<span className='loading loading-spinner loading-sm'></span>
									) : (
										<>
											<SaveIcon className='size-4 mr-2' />
											Save Changes
										</>
									)}
								</button>
							</div>
						</form>
					</div>
				</div>
			</div>
			<ConfirmModal id={productId} />
		</div>
	);
}

export default ProductPage;
