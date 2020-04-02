// State
let todos = [];

const $inputTodo = document.querySelector('.input-todo');
const $todos = document.querySelector('.todos');
const $completedTodos = document.querySelector('.completed-todos');
const $activeTodos = document.querySelector('.active-todos');
const $completeAll = document.querySelector('.complete-all');


const render = () => {
  let html = '';

  todos.forEach(todo => {
    html += ` <li id="${todo.id}" class="todo-item">
    <input id="ck-${todo.id}" class="checkbox"${todo.completed ? ' checked' : ''} type="checkbox">
    <label for="ck-${todo.id}">${todo.content}</label>
    <i class="remove-todo far fa-times-circle"></i>
  </li>`;
  }); // input 의 아이디와 label의 아이디를 일치시킬 것

  $todos.innerHTML = html;

  $completedTodos.textContent = todos.filter(todo => todo.completed).length || 0;

  $activeTodos.textContent = todos.filter(todo => !todo.completed).length || 0;

};


const getTodos = () => {
  todos = [
    { id: 1, content: 'HTML', completed: false },
    { id: 2, content: 'css', completed: true },
    { id: 3, content: 'Javascript', completed: false },
  ];
  
  todos.sort((todo1, todo2) => todo2.id - todo1.id);

  render();
};

window.onload = getTodos; // 호출의 상하관계 알 것


$inputTodo.onkeyup = e => {
  if (e.keyCode !== 13 || $inputTodo.value === '') return;

  const newId = todos.length ? Math.max(...todos.map(todo => todo.id)) + 1 : 1;
  const newTodo = { id: newId, content: $inputTodo.value, completed: false };
  todos = [newTodo, ...todos];

  $inputTodo.value = '';
  render();
};


$todos.onchange = e => {

  todos = todos.map(todo => {
    // console.log(todo.id, + e.target.parentNode.id);
    return todo.id === +e.target.parentNode.id ? { ...todo, completed: !todo.completed } : todo;
  });
  // console.log(todos);

  render();
};


$todos.onclick = e => {
  if (!e.target.matches('.todos > li > .far')) return;

  todos = todos.filter(todo => {
    return todo.id !== +e.target.parentNode.id;
  });

  render(); 
};


$completeAll.onchange = e => {
  // todos = todos.map(todo => ({ ...todo, completed: e.target.checked ? true : false }));
  todos = todos.map(todo => ({ ...todo, completed: !!e.target.checked }));

  render(); 
};