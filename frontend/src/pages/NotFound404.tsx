import { Home, Search } from 'lucide-react';
import { Link } from 'react-router';

function NotFound404() {
	return (
		<div className='container mx-auto min-h-[calc(100vh-64px)] flex items-center justify-center'>
			<div className='text-center max-w-2xl'>
				<div className='relative mb-8'>
					<h1 className='text-[150px] md:text-[200px] font-bold text-base-content/10 leading-none select-none'>404</h1>
					<div className='absolute top-0 left-[-15px] flex items-center justify-center'>
						<Search className='size-16 md:size-20 text-primary opacity-50' />
					</div>
				</div>

				<h2 className='text-3xl md:text-4xl font-bold text-base-content mb-4'>Page Not Found</h2>
				<p className='text-lg text-base-content/70 mb-8 max-w-md mx-auto'>
					We apologize, but the page you are looking for does not exist or has been moved.
				</p>

				<div className='flex flex-col sm:flex-row gap-4 justify-center items-center'>
					<Link to='/' className='btn btn-primary gap-2'>
						<Home className='size-5' />
						Home Page
					</Link>
				</div>

				<div className='mt-12 flex justify-center gap-2'>
					<div className='size-2 rounded-full bg-primary animate-pulse'></div>
					<div className='size-2 rounded-full bg-primary animate-pulse' style={{ animationDelay: '0.2s' }}></div>
					<div className='size-2 rounded-full bg-primary animate-pulse' style={{ animationDelay: '0.4s' }}></div>
				</div>
			</div>
		</div>
	);
}

export default NotFound404;
