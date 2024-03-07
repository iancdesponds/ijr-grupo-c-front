const showPopUp = (text) => {
    const popup = document.getElementById('popup');
    if (popup) {
        popup.textContent = text;
        popup.style.display = 'block';
        setTimeout(() => {
            popup.classList.add('show');
        }, 10);
        setTimeout(() => {
            popup.classList.remove('show');
            setTimeout(() => {
                popup.style.display = 'none';
            }, 500);
        }, 1500);
    } else {
        console.error('Elemento popup não encontrado no DOM.');
    }
};