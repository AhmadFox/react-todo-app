import React from 'react';
import Section from './ui/Section';

const Footer = () => {
	console.log('== Footer Re-Render ==');
	return (
		<footer className="bg-white">
			<Section addStyle={'!py-4'}>
				<p className="text-slate-500 text-sm text-center">By: <a href="https://github.com/AhmadFox" rel="noreferrer" target='_blank' className=" text-gray-500 hover:text-violet-600 ease-in-out duration-300 text-sm">Ahmad Gharaibeh</a></p>
			</Section>
		</footer>
	)
}

export default Footer;
