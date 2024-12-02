// Imports
import { attachRowClickListeners }  from './attachRowClickListeners.js'
import { initializeModalEvents }    from './initializeModalEvents.js'
import { fetchDataAndRenderChart }  from './chart1.js'
import { showNotification }         from './notification.js';
import { renderItemRow }            from './renderItemRow.js';

// GET: returns all the items
function getAllItems() {
    fetch('http://localhost:8080/api/items')
    .then(res=>res.json())
    .then(items => {
        // console.log(items.result);
        showEmptyMessage(items.result);
        renderItemRow(items.result);
        attachRowClickListeners(items.result);
        initializeModalEvents();
        fetchDataAndRenderChart();
        updateItemSummaryStatus();
    })
}

// POST: add an item
function addMissingItem() {
    const postForm = document.querySelector('.post-form')
    const imageView = document.querySelector('.image-view');
    const imageViewText = document.querySelector('.image-view-text')

    postForm.addEventListener('submit', (e)=> {
        e.preventDefault();

        const formData = new FormData(postForm);
         
        const formDataFullName = formData.get('postFullName');
        const formDataItemName = formData.get('postItemName');
        const formDataItemDescription = formData.get('postItemDescription');
        const formDataItemImage = formData.get('postItemImage').name;
        const formDataItemCategory = formData.get('postItemCategory')

        // form validation
        if (formDataFullName.trim() === '' || formDataItemName.trim() === '' || formDataItemDescription.trim() === '' || formDataItemCategory.trim() === '' || formDataItemCategory === null){
            showNotification('Please fill up all the fields')
        } else {
            if (formDataFullName.length > 50 || formDataItemName.length > 50 || formDataItemDescription.length > 100 || formDataItemImage.length > 200){
                showNotification('Character length exceeds the limit');
            } else {
                fetch('http://localhost:8080/api/items', {
                    method: "POST",
                    body: formData    
                })
                .then(res => res.json())
                .then(data => {
                    imageViewText.textContent = 'Click or drag and drop to upload your image'
                    imageView.style.backgroundImage = `none`

                    getAllItems()
                    updateItemSummaryStatus()
                    showNotification(data.message)
                }).catch(error => console.error(error))

                // After the form is successfully submitted, the form inputs would be resetted
                postForm.querySelector('#post-full-name').value = '';
                postForm.querySelector('#post-item-name').value = '';
                postForm.querySelector('#post-item-description').value = '';
                // postForm.querySelector('#input-file').value = ''
            }
        }  
    })
}

// DELETE: delete an item
function deleteMissingItem() {
    const deleteItemBtn = document.querySelector(".delete-item-btn");
    const deleteItemId = document.querySelector('.delete-item-id');
    const deleteModalContainer = document.querySelector('#delete-modal-container')

    deleteItemBtn.addEventListener('click', ()=> {
        // getting the id 
        const deleteItemIdContent = deleteItemId.textContent;
        console.log(deleteItemIdContent)
        console.log('test')

        fetch(`http://localhost:8080/api/items/${deleteItemIdContent}`, {
            method: "DELETE"
        })
        .then(res => res.json())
        .then(data => {
            deleteModalContainer.classList.remove('show-blocker')
            document.body.style.overflow = 'auto'

            getAllItems();
            updateItemSummaryStatus()
            showNotification(data.message)
            
        })

    })
}

// PUT: edit an item
function editMissingItem() {
    const editForm = document.querySelector('.edit-form');
    const editItemId = document.querySelector('#edit-item-id');
    const editModalContainer = document.querySelector('#edit-modal-container')

    editForm.addEventListener('submit', (e) => {
        e.preventDefault();
        console.log('edit')
        const formData = new FormData(editForm);

        const formDataFullName = formData.get('editFullName');
        const formDataItemName = formData.get('editItemName');
        const formDataItemDescription = formData.get('editItemDescription');
        

        if (formDataFullName.trim() === '' || formDataItemName.trim() === '' || formDataItemDescription.trim() === '' ){
            showNotification('Please fill up all the fields');
        } else {
            if (formDataFullName.length > 50 || formDataItemName.length > 50 || formDataItemDescription.length > 100) {
                showNotification('Character length exceeds the limit');
            } else {
                const editItemIdContent = editItemId.textContent
        
                fetch(`http://localhost:8080/api/items/${editItemIdContent}`, {
                    method: 'PUT',
                    body: formData
                })
                .then(res=>res.json())
                .then(data=> {
                    editModalContainer.classList.remove('show-blocker');
                    document.body.style.overflow = 'auto';

                    getAllItems();
                    updateItemSummaryStatus();
                    showNotification(data.message);
                })
                .catch(error => console.error(error))
            }
        } 
    })
}

function updateItemSummaryStatus() {
    totalFound();
    totalMissing();
}

// GET: returns the total count of found items
function totalFound() {
    const itemsFoundSummaryText = document.querySelector('.items-found-summary-text')
    fetch('http://localhost:8080/api/items/count/found')
    .then(res=> res.json())
    .then(data=> {
        // debug
        // console.log(data.items_found)
        itemsFoundSummaryText.textContent = `${data.items_found}`
    })
}

// GET: retunrs the total count of missing items
function totalMissing() {
    const itemsMissingSummaryText = document.querySelector('.items-missing-summary-text')
    fetch('http://localhost:8080/api/items/count/missing')
    .then(res=> res.json())
    .then(data=>{
        // debug
        // console.log(data.items_missing)
        itemsMissingSummaryText.textContent = `${data.items_missing}`
    })
    
}

// GET: returns the specific item based on the id passed
function search() {
    const searchInput = document.querySelector('.search-input');

    searchInput.addEventListener('input', (e) => {
        e.preventDefault()
        const itemName = searchInput.value.trim(); 

        if(itemName){
            fetch(`http://localhost:8080/api/items/search/${itemName}`)
            .then(res => res.json())
            .then(data => {
                console.log(data.result)
                renderItemRow(data.result); // Render rows
                attachRowClickListeners(data.result); // Attach listeners
                initializeModalEvents();
            })
        } else {
            getAllItems()
        }
    })
}

function showEmptyMessage(items){
    const emptyListMessage = document.querySelector('.empty-list-message-container')
    !items || items.length === 0
    ?  emptyListMessage.style.display = 'flex'
    :  emptyListMessage.style.display = 'none'
}

getAllItems();
addMissingItem();
deleteMissingItem();
editMissingItem();
totalFound();
totalMissing()
search();