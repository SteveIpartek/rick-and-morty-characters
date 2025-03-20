const characterList = document.getElementById("character-list");//Catheamos el contenedor 
const prevPage = document.getElementById("prev-page");//Ahora los botones
const nextPage = document.getElementById("next-page");
let currentPage = 1; // Variable para almacenar la página actual


//funcion principal 
function cargarPagina(page) {
  fetch(`https://rickandmortyapi.com/api/character?page=${page}`)//llamar api rick y morty 
    .then((response) => {
      if (!response.ok) {
        throw new Error('Error 404');//En caso de no cargar la pagina
      }
      return response.json();//Al pasar por el filtro de if nos da ha entender que la api funciona asi que la recogemos
    })
    .then((data) => {
      //La biblia 
      console.log(data);

      characterList.innerHTML = ''; // Limpiar la lista de personajes antes de cargar nuevos

      data.results.forEach((character) => { //recorre el array para mostrar la lista de personajes con sus datos correspondientes 
        
        //Creamos la estructura de cada una de las fichas de los personajes
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
        Specie.innerHTML = `<strong>Specie:</strong> ${spchar}`;
        divdat.appendChild(Specie);

        const gender = document.createElement("p");
        const gnchar = character.gender;
        gender.innerHTML = `<strong>Gender:</strong> ${gnchar}`;
        divdat.appendChild(gender);

        const status = document.createElement("p");
        const stchar = character.status;
       // Este switch valida el valor de stchar y dependiendo lo que valga la clase del circulo cambiara.
        switch(stchar) {
          case "Alive":
            status.innerHTML = `<strong>Status:</strong> <span class="circuloV"></span>${stchar}`;
            break;
          case "Dead":
            status.innerHTML = `<strong>Status:</strong> <span class="circuloR"></span>${stchar}`;
            break;
          default:
            status.innerHTML = `<strong>Status:</strong> <span class="circulo"></span>${stchar}`;
        }
          divdat.appendChild(status);

        const origin = document.createElement("p");
        const orichar = character.origin.name;
        origin.innerHTML = `<strong>Origin Dimension:</strong> ${orichar}`;
        divdat.appendChild(origin);
      });
      
      currentPage = page; // Actualizar la página actual
      prevPage.disabled = !data.info.prev; // Deshabilitar el botón "prev" si no hay página anterior
      nextPage.disabled = !data.info.next; // Deshabilitar el botón "next" si no hay página siguiente
    })
    .catch((error) => {
      characterList.innerHTML = 'Error Inesperado '; // Mostrar error en la lista
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


 //Vamos a crear un evento donde al clickear la img logo haga un f5
const imagenes = document.querySelectorAll("img");//Aqui se recoge el logo de la pagina para que luego sea cliqueable

if (imagenes.length > 0) {
  const miImagen = imagenes[0]; // Selecciona la primera imagen (índice 0) en este caso el logo
  miImagen.addEventListener("click", function() {
    
    location.reload();//f5
    
  });
} else {
  console.log("Logo error");
}