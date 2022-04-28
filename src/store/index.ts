import { configureStore } from '@reduxjs/toolkit'

/**
 * Nit
 * Конфигурацию хранилища и редьюсер можно разделить на два файла.
 * Например, store и todoReducer. Это упростит работу, когда
 * количество редьюсеров увеличится
 */
export default configureStore({
    reducer: {
        list: (state = {todos: []}, action) => {
            switch (action.type) {
                case 'ADD_TODO': {

                    /**
                     * Redux строго придерживается принципов иммутабельности
                     * Необходимо использовать spread-оператор или concat
                     * https://redux.js.org/faq/immutable-data#why-is-immutability-required-by-redux
                     */
                    const newState = state;
                    newState.todos.push(action.payload);
                    return newState;
                }
                case 'REMOVE_TODO': {
                    return {
                        ...state,
                        todos: state.todos.filter((t: any, index: number) => index !== action.payload),
                    };
                }
                case 'CHANGE_TODOS': {
                    return {
                        todos: action.payload,
                    };
                }
                default:
                    return state;
            }
        }
    }
})
