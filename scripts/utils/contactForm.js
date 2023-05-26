function displayModal() {
    const modal = document.getElementById("contact_modal");

    const modalTitle = document.getElementById("modal-title");
    modalTitle.innerHTML = document.querySelector('.photographer-name').innerHTML;
	modal.style.display = "flex";

    const closeContact = document.getElementById("contact-close");
    closeContact.focus();
}

function closeModal() {
    const modal = document.getElementById("contact_modal");
    modal.style.display = "none";
}


function submitForm(e) {
    e.preventDefault();

    // const firstname = document.getElementById('firstname');
    // const name = document.getElementById('name');
    // const email = document.getElementById('email');
    // const message = document.getElementById('message');
    
    Array.from(e.target).forEach(elem => {
        if(elem.nodeName != 'BUTTON') {
            console.log(`${elem.id} : ${elem.value}`);
        }
    });
}