import { useNavigate } from 'react-router';
import { useDeleteProduct } from '../hooks/useProducts';

function ConfirmModal({ id }: { id: number }) {
	const { mutate: deleteProduct, isPending, error } = useDeleteProduct();
	const navigate = useNavigate();

	function handleDelete() {
		navigate('/');
		deleteProduct(id);
	}

	return (
		<dialog id='confirm_delete_dialog' className='modal'>
			<div className='modal-box'>
				<h3 className='font-bold text-lg'>Confirm Delete</h3>

				{error ? <p className='bg-error-content py-4'>{error.message}</p> : <p className='py-4'>Are you sure you want to delete this product?</p>}

				<div className='modal-action'>
					<form method='dialog'>
						<button className='btn'>Cancel</button>
					</form>

					<button className='btn btn-error' onClick={handleDelete}>
						{isPending ? <span className='loading loading-spinner loading-sm'></span> : 'Delete'}
					</button>
				</div>
			</div>
		</dialog>
	);
}

export default ConfirmModal;
