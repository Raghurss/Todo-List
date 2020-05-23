/*var dateAndTime = {

startTime: function(){
  var today = new Date();
  var day = today.getDate();
  var month = today.getMonth();
  var year = today.getFullYear();
  var hour = today.getHours();
  var minute = today.getMinutes();
  var second = today.getSeconds();
  minute = this.checkTime(minute);
  second = this.checkTime(second);
  document.getElementById('txt').innerHTML = "Date: " + day + "/" + month + "/" + year + " " + "Clock: " + hour+":"+minute+":"+second;
  var t = setTimeout(this.startTime(),500);
},

checkTime: function(i) {
  if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
  return i;
}
};
*/
//ICONS for all the buttons must be done next!!!!!
var todoList = {
  todos: [],
  addTodo: function(todoText) {
    if(todoText!="")
    {
    this.todos.push({
      todoText: todoText,
      completed: false
    });
  }
  else
  {
    alert("Text Field is empty!");
  }
  },
  changeTodo: function(position, todoText) {
    if(position>=0 && position<this.todos.length)
    {
      if(todoText!="")
      {
        this.todos[position].todoText = todoText;
      }
      else
      {
        alert("Text Field is empty!");
      }
    }
    else
    {
      alert("Enter a valid position!")
    }
  },
  deleteTodo: function(position) {
    this.todos.splice(position, 1);
  },
  toggleTodo: function(position) {
    if(this.todos[position].completed===true)
    {
      this.todos[position].completed=false;
    }
    else
    {
      this.todos[position].completed=true;
    }
  },
  /*toggleCompleted: function(position) {
    if(position>=0 && position<this.todos.length)
    {
    var todo = this.todos[position];
    todo.completed = !todo.completed;
    }
    else
    {
      alert("Enter a valid position!")
    }
  },*/
  deleteAll: function() {
    if(this.todos.length===0)
    {
      alert("Your Todo-List is empty!")
    }
    else
    {
      this.todos.splice(0,this.todos.length);

    }
  },
  toggleAll: function() {
    if(this.todos.length===0)
    {
      alert("Your Todo-List is empty!")
    }
    else
    {
    var totalTodos = this.todos.length;
    var completedTodos = 0;
    
    // Get number of completed todos.
    for (var i = 0; i < totalTodos; i++) {
      if (this.todos[i].completed === true) {
        completedTodos++;
      }
    }
    
    // Case 1: If everything’s true, make everything false.
    if (completedTodos === totalTodos) {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = false;
      }
    // Case 2: Otherwise, make everything true.
    } else {
      for (var i = 0; i < totalTodos; i++) {
        this.todos[i].completed = true;
      }      
    }
  }
}
};

var handlers = {
  addTodo: function() {
    var addTodoTextInput = document.getElementById('addTodoTextInput');
   todoList.addTodo(addTodoTextInput.value);
    addTodoTextInput.value = '';
    view.displayTodos();
  },
  changeTodo: function() {
    var changeTodoPositionInput = document.getElementById('changeTodoPositionInput');
    var changeTodoTextInput = document.getElementById('changeTodoTextInput');
    todoList.changeTodo(changeTodoPositionInput.valueAsNumber, changeTodoTextInput.value);
    changeTodoPositionInput.value = '';
    changeTodoTextInput.value = '';
    view.displayTodos();
  },
  deleteTodo: function(position) {
    //var deleteTodoPositionInput = document.getElementById('deleteTodoPositionInput');
    //todoList.deleteTodo(deleteTodoPositionInput.valueAsNumber);
    //deleteTodoPositionInput.value = '';
    todoList.deleteTodo(position);
    view.displayTodos();
  },
  toggleTodo: function(position) {
    todoList.toggleTodo(position);
    view.displayTodos();
  },
  /*toggleCompleted: function() {
    var toggleCompletedPositionInput = document.getElementById('toggleCompletedPositionInput');
    todoList.toggleCompleted(toggleCompletedPositionInput.valueAsNumber);
    toggleCompletedPositionInput.value = '';
    view.displayTodos();
  },*/
  toggleAll: function() {
    todoList.toggleAll();
    view.displayTodos();
  },
  deleteAll: function() {
    todoList.deleteAll();
    view.displayTodos();
  }  
};

var view = {
  displayTodos: function() {
    var todosUl = document.querySelector('ul');
    todosUl.innerHTML = '';
    for (var i = 0; i < todoList.todos.length; i++) {
      var todoLi = document.createElement('li');
      var todo = todoList.todos[i];
      var todoTextWithCompletion = '';

      if (todo.completed === true) {
        todoTextWithCompletion = '(x) ' + todo.todoText;
      } else {
        todoTextWithCompletion = '( ) ' + todo.todoText;
      }
      todoLi.id=i;
      todoLi.textContent = todoTextWithCompletion;
      todoLi.appendChild(this.createDeleteButton());
      todoLi.appendChild(this.createToggleButton());
      todosUl.appendChild(todoLi);
    }  
  },
  createDeleteButton: function(){
    var deleteButton = document.createElement('button');
    deleteButton.textContent = 'Delete';
    deleteButton.className = 'deleteButton';//class need not be unique unlike id
    return deleteButton;
  },
  createToggleButton: function(){
    var toggleButton = document.createElement('button');
    toggleButton.textContent = 'Toggle';
    toggleButton.className = 'toggleButton';
    return toggleButton;
  },
  //event delegation
  setupEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click',function(event){
      //console.log(event);
    //console.log(event.target.parentNode.id);
    var elementClicked = event.target;
    if(elementClicked.className === 'deleteButton')
    {
      handlers.deleteTodo(parseInt(elementClicked.parentNode.id));
    }
    else if(elementClicked.className === 'toggleButton')
      {
        handlers.toggleTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }/*,
  setupToggleEventListeners: function(){
    var todosUl = document.querySelector('ul');
    todosUl.addEventListener('click',function(event){
      var elementClicked = event.target;
      if(elementClicked.className === 'toggleButton')
      {
        handlers.toggleTodo(parseInt(elementClicked.parentNode.id));
      }
    });
  }*/
};
view.setupEventListeners();











