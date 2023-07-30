let addTaskBtn = document.querySelector('.add-task-btn')
let inputTask = document.querySelector('.input-task')
let taskList = document.querySelector('.task-list')

// Добавить задачу
async function addTask(){
    if(inputTask.value != ''){
        taskList.insertAdjacentHTML('afterbegin', `
            <li class="task">${inputTask.value}<span class="delete-task">&#10006;</span></li>
        `)
        inputTask.value = ''
    }
    else{
        alert('Пустая задача - это конечно хорошо, но не всегда логично!')
    }
}

addTaskBtn.addEventListener('click', async function as(){
    await addTask()
    // При каждом добавлении задачи список закрывающих span изменяется
    await catchDeleteItems()
    // При каждом добавлении задачи тегу li в котором находится ее текст добавляется слушатель событий
    await finishTask()
})
window.addEventListener('keydown', async function as2(event){
    if(event.code == 'Enter'){
        await addTask()
        await catchDeleteItems()
        await finishTask()  
    }
})

// Удалить задачу

let deleteTaskSpan

async function catchDeleteItems(){
    deleteTaskSpan = document.querySelectorAll('.delete-task')
    for(let i=0; i<deleteTaskSpan.length; i++){
        deleteTaskSpan[i].addEventListener('click', (event)=>{
            deleteTask(event.target)
        })
    }
}   
async function deleteTask(eventTarget){
    eventTarget.parentNode.style.display = 'none'
}

// Завершить задачу
let tasks

async function finishTask(){
    tasks = document.querySelectorAll('.task')
    // Если не удалять слушатель события после каждого нажатия кнопки добавления задачи, то
    // для уже добавленных задач слушатель события будет добавляться повторно, что недопустимо
    for(let i=0; i<tasks.length; i++){
        tasks[i].removeEventListener('click', checkStatusTask)
    }
    for(let m = 0; m < tasks.length; m++){
        tasks[m].addEventListener('click', checkStatusTask)
    }
}

function checkStatusTask(event){
    if(event.target.className.indexOf('finished') > -1){
        event.target.classList.remove('finished')
    }
    else{
        event.target.classList.add('finished')
    }
}