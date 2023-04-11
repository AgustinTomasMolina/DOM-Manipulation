/**
 * This file is just a silly example to show everything working in the browser.
 * When you're ready to start on your site, clear the file. Happy hacking!
 **/

const baseUrl = "https://platzi-avo.vercel.app";

const appNode = document.querySelector('#app')

const formatPrice = (price) => {

    const newPrice = new window.Intl.NumberFormat('en-EN', {
        style: 'currency',
        currency: 'GBP',
    }).format(price);


    return newPrice;
};

// WEB API

// Conectarnos al servidor.
// Promise --> async/await.
window
    .fetch(`${baseUrl}/api/avo`)

    // Procesar la respuesta y convertirla en JSON.
    .then(res => res.json())

    // JSON --> DATA --> Renderizar info BROWSER.
    .then(responseJson => {

        const TODOSLOSITEMS = [];

        responseJson.data.forEach((item) => {

            // Crear imagen
            const imagen = document.createElement('img');
            // Cual es la URL de la imagen
            imagen.className = 'h-16 w-16 md:h-24 md:w-24 rounded-full mx-auto md:mx-0 md:mr-6';
            imagen.src = `${baseUrl}${item.image}`;



            // Crear titulo
            const title = document.createElement('h2');
            title.className = 'text-lg';
            title.textContent = item.name;


            // Crear precio
            const price = document.createElement('div');
            price.className = 'text-gray-600 ';
            price.textContent = formatPrice(item.price);


            // Creamos un contenedor el título y el precio
            const priceAndTitle = document.createElement("div")
            priceAndTitle.className = "text-center md:text-left";
            priceAndTitle.appendChild(title);
            priceAndTitle.appendChild(price);


            // Metemos todo dentro de una tarjeta contenedora
            const card = document.createElement("div");
            card.className = "md:flex bg-white rounded-lg p-6 hover:bg-gray-300";
            card.append(imagen, priceAndTitle);


            // creacion de contenedor
            const container = document.createElement('div');
            container.appendChild(card);



            // En ves meter uno por uno, pushea por cada uno de estos items
            TODOSLOSITEMS.push(container);

        });

        // Cuando termines en el body se le agrega con append, todo el resultado de lo que haya
        // dentro del ARRAY. Y se agregan las etiquetas al final del HTML.
        appNode.append(...TODOSLOSITEMS);
    })




