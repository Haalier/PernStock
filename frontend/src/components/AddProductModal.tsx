import { DollarSignIcon, ImageIcon, Package2Icon } from 'lucide-react';
import { useCreateProduct } from '../hooks/useProducts';
import { useForm, type SubmitHandler } from 'react-hook-form';
import toast from 'react-hot-toast';

type Inputs = {
	name: string;
	price: number;
	image: string;
};

function AddProductModal() {
	const { mutate, isPending } = useCreateProduct();
	const { register, handleSubmit, reset, formState } = useForm<Inputs>();

	const onSubmit: SubmitHandler<Inputs> = data => {
		if (!data.image || !data.name || !data.price) return;
		const { image, name, price } = data;
		const productData = {
			name,
			price,
			image,
		};

		mutate(productData, {
			onSuccess: () => {
				const modal = document.getElementById('add_product_modal') as HTMLDialogElement;

				if (modal) modal.close();

				reset();
			},

			onError: error => {
				toast.error(`Something went wrong while adding new product\n${error.message}`);
			},
		});
	};
	return (
		<dialog id='add_product_modal' className='modal'>
			<div className='modal-box'>
				<form method='dialog'>
					<button className='btn btn-sm btn-circle btn-ghost absolute right-2 top-2'>X</button>
				</form>

				<h3 className='font-bold text-xl mb-8'>Add New Product</h3>

				<form onSubmit={handleSubmit(onSubmit)} className='space-y-6'>
					<div className='grid gap-6'>
						<div className='flex flex-col gap-1'>
							<span className='label text-base font-medium'>Product Name</span>
							<label className='input w-full'>
								<Package2Icon />
								<input type='text' placeholder='Enter product name' className='grow' {...register('name', { required: true })} />
							</label>
						</div>

						<div className='flex flex-col gap-1'>
							<span className='label text-base font-medium'>Price</span>
							<label className='input w-full'>
								<DollarSignIcon />
								<input
									defaultValue={0.0}
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
								<ImageIcon className='size-4' />
								<input type='text' placeholder='https://example.com/image.jpg' className='grow' {...register('image', { required: true })} />
							</label>
						</div>
					</div>

					<div className='modal-action'>
						<form method='dialog'>
							<button className='btn btn-ghost'>Cancel</button>
						</form>
						<div className='tooltip' data-tip={!formState.isValid ? 'Fill in all fields' : ''}>
							<button type='submit' disabled={!formState.isValid || isPending} className='btn btn-primary min-w-[120px] disabled:cursor-not-allowed'>
								{isPending ? <span className='loading loading-spinner loading-sm'></span> : 'Add Product'}
							</button>
						</div>
					</div>
				</form>
			</div>

			<form method='dialog' className='modal-backdrop'>
				<button>close</button>
			</form>
		</dialog>
	);
}

export default AddProductModal;
