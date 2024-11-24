// Contains the logic behind each item row in the table body
export function attachRowClickListeners(items) {
    const tableRows = document.querySelectorAll('tbody tr');
    const itemModalContainer = document.querySelector('#item-modal-container');

    tableRows.forEach(row => {
        row.addEventListener('click', () => {
            itemModalContainer.classList.add('show-blocker');
            document.body.style.overflow = 'hidden';

            const itemModalFullName         = document.querySelector('#item-modal-full-name');
            const itemModalItemName         = document.querySelector('#item-modal-item-name');
            const itemModalItemDescription  = document.querySelector("#item-modal-item-description");
            const itemModalItemStatus       = document.querySelector('#item-modal-item-status');
            const itemModalItemImage        = document.querySelector('#item-modal-item-image');
            const itemModalItemCategory     = document.querySelector('#item-modal-item-category');

            const rowId         = row.querySelector('td').textContent;
            const matchingItem  = items.find(item => item.id == rowId)

            if (matchingItem) {
                fetch(`http://localhost:8080/api/items/image/${matchingItem.id}`)
                .then(res => {
                    console.log(res.url)
                    itemModalItemImage.src = res.url; 
                })

                itemModalFullName.textContent           = `Reported by: ${matchingItem.full_name}`
                itemModalItemName.textContent           = `Item Name: ${matchingItem.item_name}`
                itemModalItemDescription.textContent    = `Item Description: ${matchingItem.item_description}`

                if(matchingItem.is_found === 0){
                    itemModalItemStatus.textContent = `Item Status: Missing`

                } else {
                    itemModalItemStatus.textContent = `Item Status: Found`
                }
                itemModalItemCategory.textContent = `Category: ${matchingItem.item_category}`
            }
        })
    })
}