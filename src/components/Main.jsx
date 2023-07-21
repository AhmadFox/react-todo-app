import React, { useState } from 'react';

// Context
import { TodosProvider } from "../contexts/todosContext";
import { NotificationProvider } from "../contexts/notificationContext";

// Components
import TodoList from "./todo/TodoList";
import Section from "./ui/Section";
import TodoTabs from "./todo/TodoTabs";

const Main = () => {

	const [ filterTodo, setFilterTodo ] = useState('all');

	return (
		<main className="bg-zinc-100">
			<Section>
				<div className='bg-white p-6 xl:py-9 rounded-lg shadow-lg'>

					{/* == Title == */}
					<h1 className="font-bold text-xl md:text-2xl xl:text-3xl text-center uppercase text-stone-600">My Tasks</h1>
					<hr className='my-6' />

					{/* == Tabs Todos Type == */}
					<TodoTabs filterName={setFilterTodo}/>

					{/* == Todos List == */}
					<TodosProvider>
						<NotificationProvider>
							<TodoList activeFilter={filterTodo}/>
						</NotificationProvider>
					</TodosProvider>
					
				</div>
			</Section>
		</main>
	)
}

export default Main;