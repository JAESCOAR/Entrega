document.getElementById('email');
const userTable = document.getElementById('userTable').getElementsByTagName('tbody')[0];
const messageDiv = document.getElementById('message');

const apiUrl = 'http://localhost:8080';

// Función para mostrar u ocultar el panel de usuario y la sección de inicio de sesión
function toggleUserPanel(showPanel) {
    if (showPanel) {
        userPanel.classList.remove('hidden');
        loginSection.classList.add('hidden');
        mainSections.forEach(section => {
            section.classList.remove('hidden');
        });
    } else {
        userPanel.classList.add('hidden');
        loginSection.classList.remove('hidden');
        mainSections.forEach(section => {
            section.classList.add('hidden');
        });
    }
}

// Iniciar sesión
loginForm.addEventListener('submit', async (event) => {
    event.preventDefault();
    // Aquí puedes realizar la autenticación con tu backend
    // Si la autenticación es exitosa, muestra el panel de usuario
    toggleUserPanel(true);
});

// Cerrar sesión
logoutButton.addEventListener('click', () => {
    // Aquí puedes implementar la lógica para cerrar sesión
    // Por ejemplo, limpiar las credenciales almacenadas y redirigir a la página de inicio
    toggleUserPanel(false);
});

// Función para cargar los usuarios
async function loadUsers() {
    const response = await fetch(apiUrl);
    const users = await response.json();
    userTable.innerHTML = '';
    users.forEach(user => {
        const row = userTable.insertRow();
        row.insertCell(0).textContent = user.id;
        row.insertCell(1).textContent = user.name;
        row.insertCell(2).textContent = user.apellido;
        row.insertCell(3).textContent = user.telefono;
        row.insertCell(4).textContent = user.email;

        const actions = row.insertCell(5);
        const editButton = document.createElement('button');
        editButton.textContent = 'Editar';
        editButton.addEventListener('click', () => editUser(user));
        actions.appendChild(editButton);

        const deleteButton = document.createElement('button');
        deleteButton.textContent = 'Eliminar';
        deleteButton.addEventListener('click', () => deleteUser(user.id));
        actions.appendChild(deleteButton);
    });
}

// Crear usuario
async function createUser(user) {
    const response = await fetch(apiUrl, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response;
}

// Actualizar usuario
async function updateUser(id, user) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'PUT',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(user)
    });
    return response;
}

// Eliminar usuario
async function deleteUser(id) {
    const response = await fetch(`${apiUrl}/${id}`, {
        method: 'DELETE'
    });
    loadUsers();
    return response;
}

// Editar usuario
function editUser(user) {
    userId.value = user.id;
    name.value = user.name;
    apellido.value = user.apellido;
    telefono.value = user.telefono;
    email.value = user.email;
}

// Mostrar mensaje
function showMessage(message, type) {
    messageDiv.textContent = message;
    messageDiv.className = type;
    messageDiv.style.display = 'block';
    setTimeout(() => {
        messageDiv.style.display = 'none';
    }, 3000);
}

// Cargar usuarios al cargar la página
loadUsers();
