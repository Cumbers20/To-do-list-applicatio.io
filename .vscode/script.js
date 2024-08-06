document.addEventListener('DOMContentLoaded', function() {
    const addButton = document.getElementById('add-btn');
    const inputField = document.getElementById('todo-input');
    const todoList = document.getElementById('todo-list');
    const doneList = document.getElementById('done-list');
    const profileButton = document.getElementById('profile-btn');

    // Check if user is logged in
    const user = JSON.parse(localStorage.getItem('user'));
    if (!user) {
        window.location.href = 'profile.html'; // Redirect to profile page if not logged in
    }

    function addTask() {
        const todoText = inputField.value.trim();
        
        if (todoText === "") return;

        const taskId = 'task-' + new Date().getTime();
        const listItem = document.createElement('li');
        listItem.textContent = todoText;
        listItem.dataset.id = taskId;

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Delete';
        deleteButton.className = 'delete-btn';
        deleteButton.addEventListener('click', function() {
            if (listItem.classList.contains('completed')) {
                doneList.removeChild(listItem);
            } else {
                todoList.removeChild(listItem);
            }
            localStorage.removeItem(taskId);
        });

        listItem.appendChild(deleteButton);
        listItem.addEventListener('click', function() {
            listItem.classList.toggle('completed');
            updateStatus(listItem);
        });

        const task = {
            text: todoText,
            completed: listItem.classList.contains('completed'),
            dateAdded: new Date().toLocaleString()
        };
        localStorage.setItem(taskId, JSON.stringify(task));

        todoList.appendChild(listItem);
        inputField.value = ""; // Clear input field
        inputField.focus(); // Focus back to input field
    }

    function updateStatus(listItem) {
        if (listItem.classList.contains('completed')) {
            doneList.appendChild(listItem);
            listItem.querySelector('.status')?.remove();
            listItem.innerHTML += '<span class="status"> Done</span>';
        } else {
            todoList.appendChild(listItem);
            listItem.querySelector('.status')?.remove();
        }
    }

    addButton.addEventListener('click', addTask);
    inputField.addEventListener('keypress', function(event) {
        if (event.key === 'Enter') {
            addTask();
        }
    });

    profileButton.addEventListener('click', function() {
        window.location.href = 'profile.html';
    });

    document.querySelectorAll('#todo-list li, #done-list li').forEach(item => {
        item.addEventListener('click', function() {
            window.location.href = `task.html?id=${item.dataset.id}`;
        });
    });
});
