import React from 'react';
import { Form } from 'react-bootstrap';
import { InputNewTodo } from '../InputNewTodo';
import UserSelect from '../UserSelect';
import { connect } from 'react-redux';
import styles from './MainApp.module.css';


type Todo = {
    title: string,
    user?: number,
    isDone: boolean,
}

type MainAppProps = {
    todos: Todo[],
    addTodo: (t: Todo) => void,
    changeTodo: (todos: Todo[]) => void,
}
type MainAppState = {
    todoTitle: string
};

class Index extends React.Component<MainAppProps, MainAppState> {
    constructor(props: MainAppProps) {
        super(props);
        this.state = { todoTitle: '' }
    }
    handleTodoTitle = (todoTitle: string) => {
        this.setState({ todoTitle })
    }

    handleSubmitTodo = (todo: any) => {
        this.props.addTodo(todo)
    }

    render() {
        /**
         * При рендеринге компонента все, что объявленно внутри render(), 
         * будет создаваться заново. Наряду с проблемами производительности, 
         * предыдущее состояние также будет потеряно. 
         * 
         * window – глобальный объект, доступный в любом месте программы. 
         * Не стоит использовать его для хранения allTodosIsDone. 
         * Лучше создать локальную переменную
         */
        const { todoTitle } = this.state;
        window.allTodosIsDone = true;

        /**
         * Для перебора масива без изменений,
         * лучше использолвать метод forEach()
         */

        this.props.todos.map(t => {
            if (!t.isDone) {
                window.allTodosIsDone = false

            /**
             * Значение allTodosIsDone по умолчанию true, 
             * нет необходимости его перезаписывать в else 
             */
            } else {
                window.allTodosIsDone = true
            }
        });

        return (
            /**
             * Нет необходимости использовать элементы библиотеки 
             * react-bootstrap – Form. Можно использовать стандартный input,
             * не усложняя проект внешними зависимостями.
             * 
             * Состояние Form.Check контролируется allTodosIsDone, но нет обработчика onChange(). 
             * Чтобы избежать предупреждений от React, стоит использовать свойство readOnly.
             */
            <div>
                <Form.Check type="checkbox" label="all todos is done!" checked={window.allTodosIsDone}/>
                <hr/>
                <InputNewTodo todoTitle={todoTitle} onChange={this.handleTodoTitle} onSubmit={this.handleSubmitTodo}/>
                {this.props.todos.map((t, idx) => (                    
                    /**
                     * Отсутствует уникальный ключ для элемента списка.
                     * Ключи помогают React определять, какие элементы были изменены.
                     * 
                     * Nit!
                     * С точки зрения семантики, лучше использовать 
                     * теги Ul и Li вместо div.
                     */
                    <div className={styles.todo} >
                        {t.title}
                        <UserSelect user={t.user} idx={idx}/>
                        <Form.Check
                            /**
                             * Использование встроенных стилей не желательно. 
                             * Из-за высокой специфичности, могут быть проблемы с отладкой в дальнейшем.   
                             */
                            style={{ marginTop: -8, marginLeft: 5 }}
                            type="checkbox" checked={t.isDone} onChange={(e) => {
                              /**
                               * Логику работы по обновлению состояния 
                               * лучше вынести в редьюсер.   
                               */
                            const changedTodos = this.props.todos.map((t, index) => {
                                /**
                                 * Использование обычного сравнения == может вызывать 
                                 * проблемы, происходит неявное преобразование типов. 
                                 * Рекомендую использовать строгое сравнение index === idx
                                 * 
                                 * Nit!
                                 * Использование тернарного оператора и spread
                                 * позволит сократить количество кода
                                 */
                                const res = { ...t }
                                if (index == idx) {
                                    res.isDone = !t.isDone;
                                }
                                return res;

                            })
                            this.props.changeTodo(changedTodos)
                        
                        }}
                        />
                    </div>
                ))}
            </div>
        );
    }
}

export default connect(
    (state) => ({}),
    (dispatch) => ({
        addTodo: (todo: any) => {
            dispatch({type: 'ADD_TODO', payload: todo});
        },
        changeTodo: (todos: any) => dispatch({type: 'CHANGE_TODOS', payload: todos}),
        
        // Не используемы код в компоненте.
        removeTodo: (index: number) => dispatch({type: 'REMOVE_TODOS', payload: index}),
    })

)(Index);
