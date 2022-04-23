/**
 * Ресурсы React и logo не используются в компоненте
 * Желательно их удалить
 */
import React from 'react';
import logo from '../../logo.svg';

/**
 * Рекомендую в компоненте использовать CSS-модули. В проекте 
 * используются CSS-модули, за исключением глобальных стилей.
 */
import './App.css';
import MainApp from '../MainApp';
import {
    useSelector,
} from 'react-redux';

function App() {
  /**
   * Nit
   * Можно создать типизированный хук useAppSelect и это
   * упростить использование useSelect в дальнейшем
   */
    const todos = useSelector((state: {list: { todos: any[] }}) => state.list.todos);
    /**
     * Логирование нужно только на этапе отладки
     * Во время релиза, лучше его убрать
     */
    console.log(todos);
    
  return (

    /**
     * Нет необходимости комментировать это участок кода. 
     * Для улучшения читаемости лучше изменить название 
     * компонента MainApp на Todo, UserTodo и т.п
     */

    // туду лист для юзеров:
    
    /**
     * Именование CSS-селекторов по классу лучше привести к одному стилю. 
     * Сейчас первый символ App в верхнем регистре, main – нижий
     */
    <div className="App main">
      <header className="App-header">
        TODO list with users:

        {/* Не используемый/закомментированный код лучше удалить */ }
         
        {/*<img src={logo} className="App-logo" alt="logo" />*/}
      </header>
        {/* MAIN APP: */}
        <MainApp todos={todos}/>

        <footer className='App-footer'>
              <a
                href="https://example.org"
                target="_blank"
                className={"App-footer-link"}
              >
                All right reserved
              </a>
        </footer>
    </div>
  );
}

export default App;
