import { v4 as uuidv4 } from 'uuid';

const intialTodos = [
	{
		id: uuidv4(),
		title: 'Read Book',
		details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit accusamus.',
		isCompleated: false
	},
	{
		id: uuidv4(),
		title: 'Go To Gym',
		details: 'Lorem ipsum dolor sit amet consectetur adipisicing elit accusamus.',
		isCompleated: false
	}
];



export default function reducer(currentTodos, action) {
    switch(action.type) {
        // reducer add new task
        case 'added': {
            const newTodo = {
                id: uuidv4(),
                title: action.payload.title,
                details: action.payload.details,
                isCompleated: false
            }
            const updatedTodos = [...currentTodos, newTodo];
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        // reducer delete task
        case 'deleted': {
            const updatedTodos = currentTodos.filter((item) => {
                return item.id !== action.payload
            });
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        // reducer edit task
        case 'update': {
            const updatedTodos = currentTodos.map((item) =>  {
                if ( item.id === action.payload.id ) {
                    return { 
                        ...item,
                        title:  action.payload.title,
                        details:  action.payload.details
                    }
                } else {
                    return item
                }
            });
        
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        // reducer edit task
        case 'cheked': {
            const updatedTodos = currentTodos.map((item) => {
                if ( item.id === action.payload.id ) {
                    return {
                        ...item,
                        title:  action.payload.title,
                        details:  action.payload.details,
                        isCompleated: !action.payload.isCompleated
                    }
                } else {
                    return item
                }
            });
            
            localStorage.setItem('todos', JSON.stringify(updatedTodos));
            return updatedTodos;
        }
        case 'get' : {
            const storageTodos = JSON.parse(localStorage.getItem('todos')) ?? intialTodos;
            return storageTodos;
        }
        default: {
            throw Error('Unknown Action' + action.type)
        }
    }
}