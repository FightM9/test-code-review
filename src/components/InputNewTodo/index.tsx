import React from 'react';
import styles from './InputNewTodo.module.css'

type InputNewTodoProps = {
    todoTitle: string,
    onChange: (todoTitle: string) => void,
    onSubmit: (todo: any) => void,

}
type InputNewTodoState = {
    value: string
}
/**
 * Nit!
 * Лучше использовать функциональные компоненты и хуки. 
 * Более чистым и легким для понимания компонентам по сравнению 
 * с компонентами классов аналогичной сложности.
 */
export class InputNewTodo extends React.Component<InputNewTodoProps, InputNewTodoState> {
    componentDidUpdate(prevProps: Readonly<InputNewTodoProps>, prevState: Readonly<InputNewTodoState>, snapshot?: any) {
        if (this.props.todoTitle !== prevProps.todoTitle) {
            this.setState({value: this.props.todoTitle})
        }
    }

    handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        this.props.onChange(e.target.value);
    }

    /**
     * Nit
     * Если вложить input в form, то будет доступно событие onSubmit у формы, 
     * который так же вызывается при нажатии Enter, что позволит избежать 
     * взаимодействия с обработчиком события keydown
     */

    handleKeyDown = (event: React.KeyboardEvent) => {
        /**
         * Использовать keyCode больше не рекомендуется. 
         * Он устарел (удален) из спецификации ECMAScript
         * Лучше сделать: event.key || event.keyCode;
         */
        if (event.keyCode !== 13) {
            return;
        }

        event.preventDefault();

        /**
         * Nit!
         * Можно осуществить проверку без объявления переменной val,
         * в условном операторе if (this.state.value.trim())
         */
        var val = this.state.value.trim();

        if (val) {
            this.props.onSubmit({
                title: this.state.value,
                isDone: false,
            });
            this.props.onChange('');
        }
    }

    render() {
        return (
            <input
                className={styles['new-todo']}
                type="text"
                value={this.props.todoTitle}
                onChange={this.handleChange}
                onKeyDown={this.handleKeyDown}
                placeholder="What needs to be done?"
            />
        );
    }
}
