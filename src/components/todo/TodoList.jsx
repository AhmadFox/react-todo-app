import React, { Fragment, useState, useEffect, useMemo, useRef } from 'react';

// Packages
import { Dialog, Transition } from "@headlessui/react";

// Contexts
import { useTodos } from '../../contexts/todosContext';
import { useNotification } from '../../contexts/notificationContext';

// Components
import TodoItem from './TodoItem';
import TodoAdd from './TodoAdd';

const TodoList = ({ activeFilter }) => {
	
	const cancelButtonRef = useRef(null);
	const {todos, todosDispatch} = useTodos();
	const { hideShowNotification } = useNotification();
	const [ deleteDialog, setDeleteDialog ] = useState(false);
	const [ editDialog, setEditDialog ] = useState(false);
	const [ addDialod, setAddDialog] = useState(false);
	const [ selectedItem, setSelectedItem ] = useState('');

	const [ formTodo, setformTodo ] = useState({ title: '', details: '' });


	// Filtaration Arrays
	const compleatedTodos = useMemo(() => {

		return todos.filter((item) => item.isCompleated)

	}, [todos]);

	const notCompleatedTodos = useMemo(() => {

		return todos.filter((item) => !item.isCompleated)

	}, [todos])

	let todosToBeRenderd = todos;
	activeFilter === 'compleated' ? todosToBeRenderd = compleatedTodos :
	activeFilter === 'uncompleated' ? todosToBeRenderd = notCompleatedTodos : todosToBeRenderd = todos;

	// Show Dialog
	const SelectedTask = (todo, action) => {

		setSelectedItem(todo);

		console.log('todo ==>', todo);
		console.log('action ==>', action);

		action === 'DELETE' && setDeleteDialog(true);

		if( action === 'EDIT' ) {
			setEditDialog(true);
			setformTodo({
				title: selectedItem.title,
				details: selectedItem
			})
		}
	}

	// Handel Add New Todo Dispatch
	const handelAddClick = () => {
		todosDispatch({
			type: 'added',
			payload: {
				title: formTodo.title, details: formTodo.details
			}
		})

		hideShowNotification({
			msgType: 'add-task',
			message: `Task "${formTodo.title.toUpperCase()}" Added succesfuly!`
		});

		setformTodo({
			title: '',
			details: ''
		});

		setAddDialog(false)
	}

	//  Handel Delete Todo Dispatch
	const handelDeleteClick = () => {

		todosDispatch({
			type: 'deleted',
			payload: selectedItem.id
		});
		setDeleteDialog(false);
		hideShowNotification({
			msgType: 'remove-task',
			message: `Task "${selectedItem.title.toUpperCase()}" was deleted.`
		});

	};

	// Handel Edit Todo Dispatch
	const handelEditClick = () => {

		todosDispatch({
			type: 'update',
			payload: {
				title: formTodo.title, details: formTodo.details, id: selectedItem.id
			}
		});
		setEditDialog(false);
		hideShowNotification({
			msgType: 'edit-task',
			message: `Task "${formTodo.title.toUpperCase()}" Edit Successfuly!`
		});
	
	};

	useEffect(() => {
		
		setformTodo(selectedItem);
		todosDispatch({type: 'get'});

	}, [ selectedItem, todosDispatch ]);

	useEffect(() => {
		setformTodo([]);
	}, [ addDialod ])
	
	return (

		<Fragment>

			{/* Delete Dialog */}
			<Transition.Root show={deleteDialog} as={Fragment}>
				<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setDeleteDialog}
				>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
				</Transition.Child>
		
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="sm:flex sm:items-start">
							<div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-red-100 sm:mx-0 sm:h-10 sm:w-10">
								<svg
								xmlns="http://www.w3.org/2000/svg"
								fill="none"
								viewBox="0 0 24 24"
								strokeWidth={1.5}
								stroke="currentColor"
								className="w-6 h-6 text-red-600"
								>
								<path
									strokeLinecap="round"
									strokeLinejoin="round"
									d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126zM12 15.75h.007v.008H12v-.008z"
								/>
								</svg>
							</div>
							<div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
								<Dialog.Title
								as="h3"
								className="text-xl font-bold leading-6 text-red-600"
								>
								Delete Task
								</Dialog.Title>
								<div className="mt-2">
								<p className="text-sm text-gray-500">
									Are you sure you want to delete this task? All of
									your tasks will be permanently update. This action
									cannot be undone.
								</p>
								</div>
							</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
							type="button"
							className="outline-none inline-flex w-full justify-center rounded-md bg-red-600 px-6 py-2 text-sm font-semibold text-white shadow-sm hover:bg-red-500 sm:ml-3 sm:w-auto"
							onClick={handelDeleteClick}
							>
							Delete
							</button>
							<button
							type="button"
							className="outline-none mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
							onClick={() => setDeleteDialog(false)}
							ref={cancelButtonRef}
							>
							Cancel
							</button>
						</div>
						</Dialog.Panel>
					</Transition.Child>
					</div>
				</div>
				</Dialog>
			</Transition.Root>
			{/* === Delete Dialog === */}

			{/* Edit Dialog */}
			<Transition.Root show={editDialog} as={Fragment}>
				<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setEditDialog}
				>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
				</Transition.Child>
		
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="mt-3 text-center sm:mt-0 sm:text-left">
							<Dialog.Title
								as="h3"
								className='text-xl font-bold leading-6 text-blue-600'
							>
								Edit Task
							</Dialog.Title>
							<div className="mt-2 grid gap-y-4">
								<input
								value={formTodo.title}
								onChange={(e) =>
									setformTodo({ ...formTodo, title: e.target.value })
								}
								placeholder="Task Title"
								type="text"
								name=""
								id=""
								className='bg-gray-100 py-2 px-4 rounded-md w-full border border-blue-100 focus:border-blue-300 ease-in-out duration-20'/>
								<textarea
								placeholder="Task Details"
								name=""
								id=""
								rows="4"
								value={formTodo.details}
								onChange={(e) => setformTodo({ ...formTodo, details: e.target.value })}
								className='bg-gray-100 py-2 px-4 rounded-md w-full border border-blue-100 focus:border-blue-300 outline-none ease-in-out duration-200'
								></textarea>
							</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								className={`outline-none inline-flex w-full justify-center rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm bg-blue-500 hover:bg-blue-600 sm:ml-3 sm:w-auto ease-in-out duration-200`}
								onClick={handelEditClick}
							>
								Save Edit
							</button>
							<button
							type="button"
							className="outline-none mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto ease-in-out duration-200"
							onClick={() => setEditDialog(false)}
							ref={cancelButtonRef}
							>
							Cancel
							</button>
						</div>
						</Dialog.Panel>
					</Transition.Child>
					</div>
				</div>
				</Dialog>
			</Transition.Root>
			{/* === Edit Dialog === */}

			{/* Add Dialog */}
			<Transition.Root show={addDialod} as={Fragment}>
				<Dialog
				as="div"
				className="relative z-10"
				initialFocus={cancelButtonRef}
				onClose={setAddDialog}
				>
				<Transition.Child
					as={Fragment}
					enter="ease-out duration-300"
					enterFrom="opacity-0"
					enterTo="opacity-100"
					leave="ease-in duration-200"
					leaveFrom="opacity-100"
					leaveTo="opacity-0"
				>
					<div className="fixed inset-0 bg-black bg-opacity-40 transition-opacity" />
				</Transition.Child>
		
				<div className="fixed inset-0 z-10 overflow-y-auto">
					<div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
					<Transition.Child
						as={Fragment}
						enter="ease-out duration-300"
						enterFrom="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
						enterTo="opacity-100 translate-y-0 sm:scale-100"
						leave="ease-in duration-200"
						leaveFrom="opacity-100 translate-y-0 sm:scale-100"
						leaveTo="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
					>
						<Dialog.Panel className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
						<div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
							<div className="mt-3 text-center sm:mt-0 sm:text-left">
							<Dialog.Title
								as="h3"
								className='text-xl font-bold leading-6 text-violet-600'
							>
								Add New Task
							</Dialog.Title>
							<div className="mt-2 grid gap-y-4">
								<input
								value={formTodo.title}
								onChange={(e) =>
									setformTodo({ ...formTodo, title: e.target.value })
								}
								placeholder="Task Title"
								type="text"
								name=""
								id=""
								className='bg-gray-100 py-2 px-4 rounded-md w-full border border-violet-100 focus:border-violet-300 ease-in-out duration-20'/>
								<textarea
								placeholder="Task Details"
								name=""
								id=""
								rows="4"
								value={formTodo.details}
								onChange={(e) => setformTodo({ ...formTodo, details: e.target.value })}
								className='bg-gray-100 py-2 px-4 rounded-md w-full border border-violet-100 focus:border-violet-300 outline-none ease-in-out duration-200'
								></textarea>
							</div>
							</div>
						</div>
						<div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
							<button
								type="button"
								className={`outline-none inline-flex w-full justify-center rounded-md px-6 py-2 text-sm font-semibold text-white shadow-sm bg-violet-500 hover:bg-violet-600 sm:ml-3 sm:w-auto ease-in-out duration-200`}
								onClick={handelAddClick}
							>
								Create Task
							</button>
							<button
							type="button"
							className="outline-none mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto ease-in-out duration-200"
							onClick={() => setAddDialog(false)}
							ref={cancelButtonRef}
							>
							Cancel
							</button>
						</div>
						</Dialog.Panel>
					</Transition.Child>
					</div>
				</div>
				</Dialog>
			</Transition.Root>
			{/* === Edit Dialog === */}

			<div className="grid gap-y-3 mb-6">
				{
					todosToBeRenderd.length > 0 ?
						todosToBeRenderd.map((task) => (
							<TodoItem key={task.id} todo={task} handelSelectedTask={SelectedTask} />
						))
					:
					<p className='text-center font-bold text-xl text-gray-500'>Not Task Found</p>
				}
			</div>

			<div className="flex flex-row-reverse">
				<TodoAdd openModal={setAddDialog} />
			</div>

		</Fragment>
	)
}

export default TodoList;