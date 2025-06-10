const searchBtn = document.getElementById('searchBtn');

const searchInput = document.getElementById('searchInput');

const loader = document.getElementById('loader');

const results = document.getElementById('results');



const API_KEY = 'Pegar_aquí_la_api_key';



searchBtn.addEventListener('click', ()=>{

  const query = searchInput.value.trim();

  if(query!==''){

    buscarJuegos(query);

  }

});



function buscarJuegos(nombreJuego){

  //mostrar Loader

  loader.classList.remove('hidden');

  results.innerHTML= '';



  //consulta a la API

  const url = `https://api.rawg.io/api/games?key=${API_KEY}&search=${encodeURIComponent(nombreJuego)}`;



  //Fetch permita hacer consultas http GET

  //verifica si la respuesta es correcta y conviete JSON



  fetch(url)

  //error API

  .then(response=>{

    if(!response.ok) throw new Error('No se pudo conectar a la API👀');

    return response.json();

  })

  //exito

  then(data =>{

    mostrarResultados(data.results);

  })

  //validando si algo salio mal

  .catch(error=>{

    results.innerHTML = `<p class="text-red-600">✖️Error: ${error.message}</p>`;

  })

  .finally(()=>{

    loader.classList.add('hidden');

  });

}



function mostrarResultados(juegos){

  if(juegos.length===0){

    results.innerHTML = `<p class="text-red-600">✖️ No se encontraron juegos</p>`;

    return

  }



  juegos.forEach(juego=>{

    const div = document.createElement('div');

    div.className ='bg-white rounded shadow p-4';



    div.innerHTML = `



    <img src="${juego.background_image}" alt="${juego.name}" class="w-full h-48 object-cover rounded mb-2">

    <h2 class="text-lg text-gray-600">⭐⭐Rating: ${juego.rating}</h2>

    <p class="text-sm text-gray-600">Lanzamiento: ${juego.relased || 'No hay fecha'}</p>

    `;

    results.appendChild(div);

  });

}