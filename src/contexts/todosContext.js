import { createContext, useReducer, useContext } from "react";
import todosReducer from '../reducers/todoReducer';

export const TodosContext = createContext([]);

export const TodosProvider = ({ children }) => {

    const [ todos, todosDispatch ] = useReducer(todosReducer, []);

    return (
        <TodosContext.Provider value={{todos, todosDispatch}}>
            {children}
        </TodosContext.Provider>
    )
}

export const useTodos = () => {
    return useContext(TodosContext)
}