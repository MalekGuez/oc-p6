function displayLightboxOnEnter(event) {
    if (event.key === "Enter") {
        event.target.blur();
        displayLightbox(event, true);
    }
}

function displayLightbox(event, enter = false) {
    // display lightmodal
    const lightbox = document.getElementById("lightbox-modal");
    const lightboxContent = document.getElementById("lightbox-modal-content");

	lightbox.style.visibility = "visible";
	lightbox.style.opacity = "1";

    setTimeout(() => {
        lightboxContent.style.visibility = "visible";
        lightboxContent.style.opacity = "1";
        lightboxContent.style.translate = "0 0";
    }, 350);
    // get clicked media
    let media;
    if(enter) {
        media = event.target.parentNode;
    } else {
        media = event.target.parentNode.parentNode;
    }
    const clonedMedia = media.cloneNode(true);
    
    // remove tab in lightbox
    clonedMedia.tabIndex = "-1";
    clonedMedia.children[0].tabIndex = "-1";

    // hide heart
    clonedMedia.children[1].children[1].style.display = 'none';
    clonedMedia.children[0].removeAttribute("onclick");
    clonedMedia.children[0].style.cursor = "default";

    const lightboxMedia = document.querySelector('.lightbox-media');
    lightboxMedia.appendChild(clonedMedia);

    // tab navigation
    let close = document.getElementById('close-modal');
    setTimeout(() => {
        close.focus();
    }, 500);
    let rightArrow = document.getElementById('right-arrow');
    rightArrow.addEventListener("keydown", (e) => {
        if (e.key === "Tab") {
            e.preventDefault();
            close.focus();
        }
    });

}

function closeLightbox() {
    const lightbox = document.getElementById("lightbox-modal");
    const lightboxContent = document.getElementById("lightbox-modal-content");

    lightboxContent.style.visibility = "hidden";
    lightboxContent.style.opacity = "0";
    lightboxContent.style.translate = "0 -50%";

    setTimeout(() => {
        lightbox.style.visibility = "hidden";
        lightbox.style.opacity = "0";
        // get clicked media
        const media = document.querySelector('.lightbox-media').firstElementChild;
        const lightboxMedia = document.querySelector('.lightbox-media');
        lightboxMedia.removeChild(media);
    }, 350);
}

function moveLeft() {
    const media = document.querySelector('.lightbox-media').firstElementChild;
    const newId = parseInt(media.id.split('-')[1]) - 1;
    
    if(newId >= 0) {
        const newMedia = document.getElementById(`media-${newId}`);
        const lightboxMedia = document.querySelector('.lightbox-media');
        const clonedMedia = newMedia.cloneNode(true);

        // remove tab in lightbox
        clonedMedia.tabIndex = "-1";
        clonedMedia.children[0].tabIndex = "-1";
    
        // hide heart
        clonedMedia.children[1].children[1].style.display = 'none';
        clonedMedia.children[0].removeAttribute("onclick");
        clonedMedia.children[0].style.cursor = "default";

        lightboxMedia.removeChild(media);
        lightboxMedia.appendChild(clonedMedia);
    } else {
        const lastId = document.querySelector('.medias-container').children.length - 1;
        const newMedia = document.getElementById(`media-${lastId}`);

        const lightboxMedia = document.querySelector('.lightbox-media');
        const clonedMedia = newMedia.cloneNode(true);

        // remove tab in lightbox
        clonedMedia.tabIndex = "-1";
        clonedMedia.children[0].tabIndex = "-1";
    
        clonedMedia.children[1].children[1].style.display = 'none';
        clonedMedia.children[0].removeAttribute("onclick");
        clonedMedia.children[0].style.cursor = "default";

        lightboxMedia.removeChild(media);
        lightboxMedia.appendChild(clonedMedia);
    }
}

function moveRight() {
    const media = document.querySelector('.lightbox-media').firstElementChild;
    const newId = parseInt(media.id.split('-')[1]) + 1;
    const max = document.querySelector('.medias-container').children.length;
    if(newId < max) {
        const newMedia = document.getElementById(`media-${newId}`);
        const clonedMedia = newMedia.cloneNode(true);

        const lightboxMedia = document.querySelector('.lightbox-media');

        // remove tab in lightbox
        clonedMedia.tabIndex = "-1";
        clonedMedia.children[0].tabIndex = "-1";

        // hide heart
        clonedMedia.children[1].children[1].style.display = 'none';
        clonedMedia.children[0].removeAttribute("onclick");
        clonedMedia.children[0].style.cursor = "default";

        lightboxMedia.removeChild(media);
        lightboxMedia.appendChild(clonedMedia);
    } else {
        const lastId = 0;
        const newMedia = document.getElementById(`media-${lastId}`);


        const lightboxMedia = document.querySelector('.lightbox-media');
        const clonedMedia = newMedia.cloneNode(true);
    
        clonedMedia.children[1].children[1].style.display = 'none';
        clonedMedia.children[0].removeAttribute("onclick");
        clonedMedia.children[0].style.cursor = "default";

        lightboxMedia.removeChild(media);
        lightboxMedia.appendChild(clonedMedia);
    }
}