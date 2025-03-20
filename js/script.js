const characterList = document.getElementById("character-list");
const prevPage = document.getElementById("prev-page");
const nextPage = document.getElementById("next-page");

let currentPage = 1; // Variable para almacenar la página actual

function cargarPagina(page) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error fatal');
      }
      return response.json();
    })
    .then((data) => {
      console.log(data);
      characterList.innerHTML = ''; // Limpiar la lista de personajes antes de cargar nuevos

      data.results.forEach((character) => {
        const divFicha = document.createElement("div");
        divFicha.id = 'cajaFicha';
        characterList.appendChild(divFicha);

        const divImg = document.createElement("div");
        divImg.id = 'cajaImgChar';
        const Imagchar = character.image;
        divImg.innerHTML = '<img src="' + Imagchar + '">';
        divFicha.appendChild(divImg);

        const divdat = document.createElement("div");
        divdat.id = 'cajaDatos';
        divFicha.appendChild(divdat);

        const h3name = document.createElement("h3");
        const namechar = character.name;
        h3name.textContent = namechar;
        divdat.appendChild(h3name);

        const Specie = document.createElement("p");
        const spchar = character.species;
        Specie.innerHTML = `<span>Specie:</span> ${spchar}`;
        divdat.appendChild(Specie);

        const gender = document.createElement("p");
        const gnchar = character.gender;
        gender.innerHTML = `<span>Gender:</span> ${gnchar}`;
        divdat.appendChild(gender);

        const status = document.createElement("p");
        const stchar = character.status;
        status.innerHTML = `<span>Status:</span> ${stchar}`;
        divdat.appendChild(status);

        const origin = document.createElement("p");
        const orichar = character.origin.name;
        origin.innerHTML = `<span>Origin Dimension:</span> ${orichar}`;
        divdat.appendChild(origin);
      });
      currentPage = page; // Actualizar la página actual
      prevPage.disabled = !data.info.prev; // Deshabilitar el botón "prev" si no hay página anterior
      nextPage.disabled = !data.info.next; // Deshabilitar el botón "next" si no hay página siguiente
    })
    .catch((error) => {
      characterList.innerHTML = 'Error 404'; // Mostrar error en la lista
    });
}

// Cargar la primera página al cargar la página
cargarPagina(currentPage);

// Evento para el botón "next page"
nextPage.addEventListener("click", () => {
  cargarPagina(currentPage + 1);
});

// Evento para el botón "prev page"
prevPage.addEventListener("click", () => {
  cargarPagina(currentPage - 1);
});


