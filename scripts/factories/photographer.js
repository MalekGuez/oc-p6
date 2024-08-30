// Affichage des photographes sur la page d'accueil
function photographerFactory(data) {
    const { id, name, portrait, city, country, tagline, price } = data;

    const picture = `assets/photographers/${portrait}`;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = "photographer";
        article.innerHTML = `
            <a class="photographers-link" href="./photographer.html?id=${id}">
                <div class="photographer-img">
                    <img src=${picture} alt="${name}"/>
                </div>
                <h2 class="photographer-name">${name}</h2>
            </a>
            <div class="photographers-info">
                <h3 class="photographer-city">${city}, ${country}</h3>
                <span class="photographer-tagline">${tagline}</span>
                <span class="photographer-price">${price}€/jour</span>
            </div>
        `;
        // const img = document.createElement( 'img' );
        // img.setAttribute("src", picture)
        // const h2 = document.createElement( 'h2' );
        // h2.textContent = name;
        // article.appendChild(img);
        // article.appendChild(h2);
        return (article);
    }
    return { name, picture, getUserCardDOM }
}

// Affichage des infos du photographe
function photographerInfoFactory(data, elem) {
    const { name, city, portrait, country, tagline } = data;

    const picture = `assets/photographers/${portrait}`;
    function getUserCardDOM() {
        elem.innerHTML = `
        <div class="photographer-info">
            <h2 class="photographer-name">${name}</h2>
            <h3 class="photographer-city">${city}, ${country}</h3>
            <span class="photographer-tagline">${tagline}</span>
        </div>
        <button class="contact_button" onclick="displayModal()" aria-label="Contactez-moi">Contactez-moi</button>
        <div class="photographer-img">
            <img src=${picture} alt="${name}"/>
        </div>
        `;
        return (elem);
    }
    return { getUserCardDOM }
}


function priceLikesFactory(data, elem) {
    const { likes, price } = data;

    function getUserCardDOM() {
        elem.innerHTML = `
        <span class="medias-likes">
            <span id="likes">${likes}</span>
            <i class="fa-solid fa-heart"></i>
        </span>
        <span class="photographer-price">
            ${price}€ / jour
        </span>
        `;
        return (elem);
    }
    return { getUserCardDOM }
}

// traiter le cas vidéo et img
function mediaFactory(data, name, index) {
    const { image, likes, title, video } = data;

    function getUserCardDOM() {
        const article = document.createElement('article');
        article.className = "media";
        // article.tabIndex = "0";
        article.id = `media-${index}`;
        if(typeof image !== 'undefined') {
            const media = `assets/medias/${name}/${image}`;            
            article.innerHTML = `
                <div class="media-img" onclick="displayLightbox(event)" tabindex="0" onkeydown="displayLightboxOnEnter(event)" aria-label="Voir la photo">
                    <img src="${media}" alt="${title}"/>
                </div>
            `;
        } else {
            const media = `assets/medias/${name}/${video}`;
            article.innerHTML = `
                <div class="media-img" onclick="displayLightbox(event)" tabindex="0" onkeydown="displayLightboxOnEnter(event)" aria-label="Voir la vidéo">
                    <video autoplay>
                        <source src="${media}" alt="${title}">
                    </video>
                </div>
            `;
        }
        article.innerHTML += `
            <div class="media-info">
                <h3 class="media-title">${title}</h3>
                <div class="media-likes">
                    <span id="media-like-${index}">${likes}</span> <i class="fa-solid fa-heart media-hearts" tabindex="0" aria-label="Like"></i>
                </div>        
            </div>
        `;
        return (article);
    }
    return { getUserCardDOM }
}
