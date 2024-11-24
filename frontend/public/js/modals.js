const postModalContainer    = document.querySelector('#post-modal-container')
const editModalContainer    = document.querySelector('#edit-modal-container')
const deleteModalContainer  = document.querySelector('#delete-modal-container')
const itemModalContainer    = document.querySelector('#item-modal-container')

const itemModalItemImage = document.querySelector('#item-modal-item-image');

// Would close the modal if the user clicked outside
window.addEventListener('click', (e) => {
    if(e.target === postModalContainer) {
        document.body.style.overflow = 'auto';
        postModalContainer.classList.remove('show-blocker')
    } 
    else if (e.target === editModalContainer) {
        document.body.style.overflow = 'auto';
        editModalContainer.classList.remove('show-blocker')
    } 
    else if (e.target === deleteModalContainer) {
        document.body.style.overflow = 'auto';
        deleteModalContainer.classList.remove('show-blocker') 
    }
    else if (e.target === itemModalContainer) {
        document.body.style.overflow = 'auto';
        itemModalContainer.classList.remove('show-blocker') 
        itemModalItemImage.src = ''
    }
})

// buttons 
const postFormCloseBtn = document.querySelector('.post-form-close-btn');
const editFormCloseBtn = document.querySelector('.edit-form-close-btn');
const deleteFormCloseBtn = document.querySelector('.delete-form-close-btn');
const itemFormCloseBtn = document.querySelector('.item-form-close-btn');




postFormCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    postModalContainer.classList.remove('show-blocker')
})

editFormCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    editModalContainer.classList.remove('show-blocker')
})

deleteFormCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    deleteModalContainer.classList.remove('show-blocker')
})

itemFormCloseBtn.addEventListener('click', () => {
    document.body.style.overflow = 'auto';
    itemModalContainer.classList.remove('show-blocker')
    itemModalItemImage.src = ''
})