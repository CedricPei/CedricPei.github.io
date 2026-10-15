(() => {
    const photos = Array.from(document.querySelectorAll('[data-molly-photo]'));
    const viewer = document.querySelector('.molly-lightbox');
    if (!photos.length || !viewer || typeof viewer.showModal !== 'function') return;

    const image = viewer.querySelector('.molly-lightbox-image');
    const count = viewer.querySelector('.molly-lightbox-count');
    let current = 0;

    function showPhoto(index) {
        current = (index + photos.length) % photos.length;
        image.src = photos[current].href;
        image.alt = photos[current].querySelector('img').alt;
        count.textContent = `${current + 1} / ${photos.length}`;
    }

    photos.forEach((photo, index) => {
        photo.addEventListener('click', event => {
            if (event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
            event.preventDefault();
            showPhoto(index);
            viewer.showModal();
            document.documentElement.classList.add('molly-viewer-open');
        });
    });

    viewer.querySelector('.molly-lightbox-close').addEventListener('click', () => viewer.close());
    viewer.querySelector('.molly-lightbox-prev').addEventListener('click', () => showPhoto(current - 1));
    viewer.querySelector('.molly-lightbox-next').addEventListener('click', () => showPhoto(current + 1));

    viewer.addEventListener('click', event => {
        if (event.target === viewer) viewer.close();
    });

    viewer.addEventListener('keydown', event => {
        if (event.key === 'ArrowLeft' || event.key === 'ArrowRight') {
            event.preventDefault();
            showPhoto(current + (event.key === 'ArrowLeft' ? -1 : 1));
        }
    });

    viewer.addEventListener('close', () => {
        document.documentElement.classList.remove('molly-viewer-open');
    });
})();
