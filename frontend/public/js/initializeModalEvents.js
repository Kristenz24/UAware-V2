export function initializeModalEvents(){
    const kebabContainers = document.querySelectorAll('.kebab-container');

    kebabContainers.forEach(kebabContainer => {
        kebabContainer.addEventListener('click', (e) => {
            e.stopPropagation()
            kebabContainer.querySelector('.kebab-modal').classList.toggle('display-kebab-modal')
        })
        kebabContainer.addEventListener('mouseover', () => {
            kebabContainer.querySelector('.kebab-modal').classList.add('display-kebab-modal');
        })
        kebabContainer.addEventListener('mouseout', () => {
            kebabContainer.querySelector('.kebab-modal').classList.remove('display-kebab-modal');
        })

        // Edit Modal Container
        kebabContainer.querySelector('.kebab-modal').querySelector('.open-edit-modal-btn').addEventListener('click', (e) => {
            // To stop bubbling
            e.stopPropagation()

            const editModalContainer = document.querySelector('#edit-modal-container')
            editModalContainer.classList.add('show-blocker')
            document.body.style.overflow = 'hidden';

            const parentRow = kebabContainer.closest('tr')

            const editItemId = document.querySelector('#edit-item-id')
            const firstTd = parentRow.children[0];
            editItemId.textContent = firstTd.textContent;

            const editFullName = document.querySelector('#edit-full-name');
            const secondTd = parentRow.children[1];
            editFullName.value = secondTd.textContent;

            const editItemName = document.querySelector('#edit-item-name');
            const thirdTd = parentRow.children[2];
            editItemName.value = thirdTd.textContent;

            const editItemDescription = document.querySelector('#edit-item-description');
            const fourthTd = parentRow.children[3];
            editItemDescription.value = fourthTd.textContent;
        })

        // Delete Modal Container
        const deleteModalContainer = document.querySelector('#delete-modal-container')
        kebabContainer.querySelector('.kebab-modal').querySelector('.open-delete-modal-btn').addEventListener('click', (e) => {
            // To stop bubbling
            e.stopPropagation()
            deleteModalContainer.classList.add('show-blocker')
            document.body.style.overflow = 'hidden';

            const deleteItemName = document.querySelector('.delete-item-name');
            const parentRow = kebabContainer.closest('tr')
            const thirdTd = parentRow.children[2];
            const itemName = thirdTd.textContent;
            deleteItemName.textContent = itemName;
            
            const deleteItemId = document.querySelector('.delete-item-id');
            const firstTd = parentRow.children[0];
            const itemId = firstTd.textContent
            deleteItemId.textContent = itemId;
        })
    })
}

// Post modal
const postModalContainer = document.querySelector('#post-modal-container')
document.querySelector('.open-post-modal-btn').addEventListener('click', () => { 
    postModalContainer.classList.add('show-blocker')
    document.body.style.overflow = 'hidden';
})