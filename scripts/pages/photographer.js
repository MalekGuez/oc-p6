const sortSelect = document.getElementById("medias-sort");
const params = new URLSearchParams(window.location.search);

function likeMedia(index) {
    let mediaLikes = document.getElementById(`media-like-${index}`);
    let totalLikes = document.getElementById('likes');
    console.log(mediaLikes);
    if(mediaLikes.classList.contains('media-liked')) {
        mediaLikes.innerHTML = parseInt(mediaLikes.innerText) - 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerText) - 1;
    }
    else {
        mediaLikes.innerHTML = parseInt(mediaLikes.innerText) + 1;
        totalLikes.innerHTML = parseInt(totalLikes.innerText) + 1;
    }
    mediaLikes.classList.toggle('media-liked');
}

sortSelect.addEventListener("change", () => {
    params.set("sort", sortSelect.value);
    window.location.search = params.toString();
});

function setSelectValue() {
    const sortParam = params.get("sort");
    if (sortParam) {
        sortSelect.value = sortParam;
    }
}

async function getMediasFromPhotographer(id, sort = 'fame') {
    let medias = await fetch('../../data/photographers.json')
    .then((response) => response.json())
    .then((json) => {
        switch(sort) {
            case 'fame':
                // tri par ordre décroissant
                return json.media.filter(m => m.photographerId == id).sort((a, b) => b.likes - a.likes);
            case 'date':
                // tri par date la + récente
                return json.media.filter(m => m.photographerId == id).sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime());
            case 'title':
                // tri par ordre alphabétique
                return json.media.filter(m => m.photographerId == id).sort((a, b) => a.title.localeCompare(b.title));
        }
        
    });
    return ({
        medias: [...medias]});
}

async function getLikesFromPhotographer(id) {
    let likes = 0;
    await fetch('../../data/photographers.json')
    .then((response) => response.json())
    .then((json) => 
        json.media.filter(m => {
            if(m.photographerId == id) likes += m.likes;
        })
    );
    return likes;
}

async function getPhotographer(id) {
    let photographer = await fetch('../../data/photographers.json')
    .then((response) => response.json())
    .then((json) => json.photographers.filter(p => p.id == id));
    return photographer[0];
}

// Afficher l'encart nbLikes + price
function displayNumbers(price, likes) {
    const photographerNbs = document.querySelector(".photographer-nbs");
    const nbsModel = priceLikesFactory({price, likes}, photographerNbs);
    nbsModel.getUserCardDOM();
}

function displayInfo(photographer) {
    const photographerHeader = document.querySelector(".photograph-header");
    const photographerModel = photographerInfoFactory(photographer, photographerHeader);
    photographerModel.getUserCardDOM();
};

function displayMedias(medias, name) {
    const photographerMedia = document.querySelector(".medias-container");

    medias.forEach((media, index) => {
        const photographerModel = mediaFactory(media, name, index);
        photographerModel.getUserCardDOM();
        const userCardDOM = photographerModel.getUserCardDOM();
        photographerMedia.appendChild(userCardDOM);
    });
}

async function init() {
    const id = (new URL(document.location)).searchParams.get('id');
    const sort = (new URL(document.location)).searchParams.get('sort');
    let { medias } = sort ? await getMediasFromPhotographer(id, sort) : await getMediasFromPhotographer(id);

    let likes = await getLikesFromPhotographer(id);    
    let photographer = await getPhotographer(id);

    let photographerSplittedName = photographer.name.split(" ")[0];
    
    displayInfo(photographer);
    displayNumbers(photographer.price, likes);
    displayMedias(medias, photographerSplittedName);
    setSelectValue();

    const hearts = document.querySelectorAll(".media-hearts");
    hearts.forEach((heart, index) => heart.addEventListener("click", () => {
        likeMedia(index);
    }));
    hearts.forEach((heart, index) => heart.addEventListener("keydown", (event) => {
        if (event.key === "Enter") {
            likeMedia(index);
        }
    }));
}

init();

