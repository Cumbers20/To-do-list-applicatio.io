document.addEventListener('DOMContentLoaded', function() {
    const params = new URLSearchParams(window.location.search);
    const taskId = params.get('id');

    if (taskId) {
        const task = JSON.parse(localStorage.getItem(taskId));
        
        if (task) {
            document.getElementById('task-detail').innerHTML = `
                <h2>${task.text}</h2>
                <p>Status: ${task.completed ? 'Done' : 'Not Done'}</p>
                <p>Date Added: ${task.dateAdded}</p>
            `;
        } else {
            document.getElementById('task-detail').innerHTML = '<p>Task not found.</p>';
        }
    } else {
        document.getElementById('task-detail').innerHTML = '<p>No task ID provided.</p>';
    }
});
