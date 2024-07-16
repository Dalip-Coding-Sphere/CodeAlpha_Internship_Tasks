let currentIndex = 0;
let currentImages = [];

function openPopup(src) {
    const popup = document.getElementById('popup');
    const popupImg = document.getElementById('popup-img');
    currentIndex = currentImages.indexOf(src);

    // Display as flex container
    popup.style.display = 'flex';
    popupImg.src = src;
}

function closePopup() {
    const popup = document.getElementById('popup');
    popup.style.display = 'none';
}

function navigate(direction) {
    currentIndex += direction;

    if (currentIndex < 0) {
        currentIndex = currentImages.length - 1;
    } else if (currentIndex >= currentImages.length) {
        currentIndex = 0;
    }

    const popupImg = document.getElementById('popup-img');
    popupImg.src = currentImages[currentIndex];
}

document.addEventListener('DOMContentLoaded', function () {
    const galleryImages = document.querySelectorAll('.box img');
    currentImages = Array.from(galleryImages).map(img => img.src);

    const filterButtons = document.querySelectorAll('.filter-button');
    filterButtons.forEach(button => {
        button.addEventListener('click', function () {
            const filterValue = this.getAttribute('data-filter');

            galleryImages.forEach(image => {
                const category = image.getAttribute('src').split('\\')[1].split('/')[0];

                if (filterValue === 'all' || category === filterValue) {
                    image.style.display = 'block';
                } else {
                    image.style.display = 'none';
                }
            });

            // Update current images array after filtering
            currentImages = Array.from(galleryImages).map(img => img.src);
        });
    });

    // Keyboard navigation
    document.addEventListener('keydown', function (event) {
        if (document.getElementById('popup').style.display === 'flex') {
            switch (event.key) {
                case 'ArrowLeft':
                    navigate(-1);
                    break;
                case 'ArrowRight':
                    navigate(1);
                    break;
                case 'Escape':
                    closePopup();
                    break;
            }
        }
    });

    // Close popup when clicking outside the image
    const popup = document.getElementById('popup');
    popup.addEventListener('click', function (event) {
        if (event.target === popup) {
            closePopup();
        }
    });
});