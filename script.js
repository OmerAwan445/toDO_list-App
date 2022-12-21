'use strict';
const form  =document.querySelector('form');
const input =document.querySelector('input');
const toDoList=document.querySelector('ul');

form.addEventListener('submit',(e)=>{
e.preventDefault();
createToDoList();
})

toDoList.addEventListener('click',(e)=>{
    if(e.target.closest('button')){
    e.target.closest('li').remove();
    //=======  trim is used bcz there is space in toDotext at the end in every li ==== 
    removeToDoFromLS(e.target.closest('li').textContent.trim());
    }
    else if(e.target.closest('li'))
    {
    e.target.classList.toggle('completed');
    updateToDosInLS();
}
})

// window.localStorage.clear();

function createToDoList(toDoTxt='',completed=false){
    // ======= if a user enters an empty toDo with =======
    if(input.value.includes('  ')) return;
    
    const toDo=document.createElement('li');
    toDo.classList.add('todo-work');
    toDo.innerHTML=`${toDoTxt==='' ? input.value : toDoTxt} <button class="close"><i class="fa fa-close"></i></button>`;
    if(completed===true) toDo.classList.add('completed');
    toDoList.appendChild(toDo);
    if(!toDoTxt)
    updateToDosInLS();
    input.value=''; 
}

function getToDosFromLS(){
   const toDos= JSON.parse(window.localStorage.getItem('todos'));
   return toDos!== null ?toDos:[];   
}

function removeToDoFromLS(removeToDoTxt){
    const toDos= getToDosFromLS();
    const filteredtoDos =toDos.filter(toDo=> toDo.toDoTxt.trim() !==removeToDoTxt);
    window.localStorage.setItem('todos', JSON.stringify(filteredtoDos));
}

function updateToDosInLS(){
    const toDos=[];
    const allTodosUl=document.querySelectorAll('li');
    allTodosUl.forEach(todoLi=>{
        toDos.push({
            toDoTxt:todoLi.textContent,
            completed:todoLi.classList.contains('completed')
            });
        window.localStorage.setItem('todos', JSON.stringify(toDos));

    })
}

function loadToDosFromLS(){
    const toDos=getToDosFromLS();
    toDos.forEach(toDo => {
     createToDoList(toDo.toDoTxt , toDo.completed);   
    });
}
loadToDosFromLS();

