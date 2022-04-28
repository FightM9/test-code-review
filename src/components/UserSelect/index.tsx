import React from 'react';
import { useDispatch, useSelector } from 'react-redux';
import styles from './UserSelect.module.css';

type UserSelectProps = {
    user?: number,
    idx: number,
}

function UserSelect(props: UserSelectProps) {
    const dispatch = useDispatch();
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    React.useEffect(
        () => {
            /**
             * Логирование нужно только на этапе отладки
             * Во время релиза, лучше его убрать
             */
            console.log('userSelect');
            /**
             * Лучше вынести работу с сервером в отдельный файл,
             * разделяя UI и получение данных.
             * 
             * Могут возникнуть ошибки при работе REST API. 
             * Во избежанию проблем, необходимо обрабатывать такие случаи. 
             * Например, использовать try.. catch
             */
            fetch('https://jsonplaceholder.typicode.com/users/').then(
                (users) => users.json(),
            ).then(users => setOptions(users))
        },
        [],
    )
    const [options, setOptions] = React.useState([]);

    const { idx } = props;
    const handleChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        /**
        * Логику работы по обновлению состояния 
        * лучше вынести в редьюсер и передовать только id.   
        */
        const changedTodos = todos.map((t, index) => {
            const res = { ...t }
            if (index == idx) {
                
              /**
               * Логирование нужно только на этапе отладки
               * Во время релиза, лучше его убрать
               */
              console.log("props.user", props.user);
              res.user = e.target.value;
            }
            return res;
        })
        /**
         * В редьюсере нет действия с именем CHANGE_TODO,
         * Возможно имели ввиду CHANGE_TODOS.
         * Во избежание таких опечаток, можно создать константы.
         */
        dispatch({type: 'CHANGE_TODO', payload: changedTodos})
    }

    return (
        /**
         * Нужна пустая опция по умолчанию. При инициализации, 
         * пользователь еще не сделал выбор, а в строке уже стоит значение.
         */
        <select name="user" className={styles.user} onChange={handleChange}>
            {options.map((user: any) => <option value={user.id}>{user.name}</option>)}
        </select>
    );
}

export default UserSelect;
