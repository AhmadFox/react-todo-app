import React from 'react';

const TodoTabs = ({ filterName }) => {

	console.log('== Tabs Re-Render ==');

	// Filter Todo List
	const handelFilterTodos = (e) => {

		const btnGroup = document.querySelectorAll('[data-btn="btn-group"] button');
		btnGroup.forEach((btn) => {
			btn.classList.remove('active');
		})
		e.target.classList.add('active');

		filterName(e.target.value)

	}
	
	return (
		<div className="grid grid-cols-3 gap-x-2 justify-items-center md:w-9/12 xl:w-6/12 mx-auto mb-8" data-btn="btn-group">
			<button onClick={handelFilterTodos} value='all' className='text-sm w-full px-1 py-2 font-semibold uppercase rounded-md text-slate-600 bg-slate-200 hover:bg-violet-500  hover:text-white ease-in-out duration-200 active'>All</button>
			<button onClick={handelFilterTodos} value='uncompleated' className='text-sm w-full px-1 py-2 font-semibold uppercase rounded-md text-slate-600 bg-slate-200 hover:bg-violet-500 hover:text-white ease-in-out duration-200'>To Do</button>
			<button onClick={handelFilterTodos} value='compleated' className='text-sm w-full px-1 py-2 font-semibold uppercase rounded-md text-slate-600 bg-slate-200 hover:bg-violet-500 hover:text-white ease-in-out duration-200'>Done</button>
		</div>
	)
}

export default TodoTabs;