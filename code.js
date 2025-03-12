// Esperar a que el DOM esté completamente cargado
document.addEventListener('DOMContentLoaded', () => {
  // Seleccionar el contenedor donde se mostrarán los posts
  const container = document.getElementById("post-container");

  // Array simulado de posts (podrían provenir de una API o base de datos)
  let posts = [
    { id: 1, title: "Post 1", content: "Contenido del post 1" },
    { id: 2, title: "Post 2", content: "Contenido del post 2" },
  ];

  // Función para renderizar los posts
  function renderPosts() {
    container.innerHTML = ''; // Limpiar el contenedor
    posts.forEach(post => {
      const postElement = document.createElement("div");
      postElement.classList.add('post');
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.content}</p>
        <button onclick="deletePost(${post.id})">Eliminar</button>
      `;
      container.appendChild(postElement);
    });
  }

  // Función para agregar un nuevo post
  window.addPost = function(title, content) {
    const newId = posts.length > 0 ? Math.max(...posts.map(p => p.id)) + 1 : 1;
    posts.push({ id: newId, title, content });
    renderPosts();
  }

  // Función para eliminar un post
  window.deletePost = function(id) {
    posts = posts.filter(post => post.id !== id);
    renderPosts();
  }

  // Función para cargar más posts (simulada)
  function loadMorePosts() {
    const newPosts = [
      { id: posts.length + 1, title: `Post ${posts.length + 1}`, content: `Contenido del post ${posts.length + 1}` },
      { id: posts.length + 2, title: `Post ${posts.length + 2}`, content: `Contenido del post ${posts.length + 2}` },
    ];
    posts = [...posts, ...newPosts];
    renderPosts();
  }

  // Renderizar los posts iniciales
  renderPosts();

  // Agregar estilos CSS
  const style = document.createElement('style');
  style.textContent = `
    .post {
      border: 1px solid #ddd;
      margin-bottom: 10px;
      padding: 10px;
      border-radius: 5px;
    }
    button {
      margin-top: 10px;
      padding: 5px 10px;
      cursor: pointer;
    }
  `;
  document.head.appendChild(style);

  // Agregar botones para nuevas funcionalidades
  const addPostButton = document.createElement('button');
  addPostButton.textContent = 'Agregar Post';
  addPostButton.onclick = () => addPost(`Nuevo Post ${posts.length + 1}`, `Contenido del nuevo post ${posts.length + 1}`);
  document.body.insertBefore(addPostButton, container);

  const loadMoreButton = document.createElement('button');
  loadMoreButton.textContent = 'Cargar Más';
  loadMoreButton.onclick = loadMorePosts;
  document.body.appendChild(loadMoreButton);
});

async function fetchPosts() {
  const url = "posts.json"; // Asegúrate de que esta ruta sea correcta
  const container = document.getElementById("post-container");

  if (!container) {
    console.error("Container element not found");
    return;
  }

  try {
    // Mostrar un indicador de carga
    container.innerHTML = "<p>Cargando posts...</p>";

    const response = await fetch(url);

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    const posts = await response.json();

    // Limpiar el contenedor
    container.innerHTML = "";

    // Crear y añadir elementos para cada post
    posts.forEach(post => {
      const postElement = document.createElement("article");
      postElement.className = "post";
      postElement.innerHTML = `
        <h2>${post.title}</h2>
        <p>${post.body}</p>
        <footer>
          <span>ID del Post: ${post.id}</span>
          <span>ID del Usuario: ${post.userId}</span>
        </footer>
      `;
      container.appendChild(postElement);
    });

  } catch (error) {
    console.error("Error fetching posts:", error); // Muestra el error en la consola
    container.innerHTML = "<p>Error al cargar los posts. Por favor, intente más tarde.</p>";
  }
}

// Llamar a la función cuando se carga la página
document.addEventListener('DOMContentLoaded', fetchPosts);