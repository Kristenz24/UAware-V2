const dropArea  = document.querySelector('#drop-area');
const inputFile = document.querySelector('#input-file');
const imageView = document.querySelector('.image-view');
const imageViewText = document.querySelector('.image-view-text')

inputFile.addEventListener('change', uploadImage);

function uploadImage() {
    let imageLink = URL.createObjectURL(inputFile.files[0])
    imageView.style.backgroundImage = `url(${imageLink})`
    imageViewText.textContent = ''
}

dropArea.addEventListener('dragover', (e) => {
    e.preventDefault();
})

dropArea.addEventListener('drop', (e) => {
    e.preventDefault();
    inputFile.files = e.dataTransfer.files;
    uploadImage();
})

