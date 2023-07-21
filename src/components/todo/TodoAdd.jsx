import React from "react";

const TodoAdd = ({ openModal }) => {

	console.log('== Add Button Re-Render ==');

	return (
		<button className="w-full px-6 py-4 bg-violet-100 border border-dashed border-violet-500 hover:bg-violet-600 text-violet-600 hover:text-white font-semibold uppercase rounded-md ease-in-out duration-200"
			onClick={() => openModal(true)}
		>Add new task</button>
	)
};

export default TodoAdd;

