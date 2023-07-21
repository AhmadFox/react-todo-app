import React from 'react';

import Logo from '../assets/images/logo.svg';
import Container from './ui/Container';

const  Navbar = () => {
	console.log('== Navbar Re-Render ==');
	return (
		<nav className='bg-slate-950 py-4 shadow-lg'>
			<Container>
				<div className="flex justify-between items-center">
					<div className="flex items-center gap-x-3">
						<img src={Logo} alt="Logo Brand" className='w-10 h-auto' width="512" height="512" />
						<p className="text-violet-500 font-bold">ToDo App</p>
					</div>
				</div>
			</Container>
		</nav>
	)
}

export default Navbar;