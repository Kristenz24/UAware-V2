// Formatter
const $             = ref => document.querySelector(ref);
const $all          = ref => document.querySelectorAll(ref);
const createElement = tag => document.createElement(tag);


export function renderItemRow(items){
    const tbody = $('tbody');
    tbody.innerHTML = "";

    items.forEach(item => {
        // Appending table row
        const tr = createElement('tr');
        tr.classList.add('item-row');
        tbody.appendChild(tr);

        // Appending id
        const id = document.createElement('td');
        id.textContent = item.id;
        tr.appendChild(id);

        // Appending full name
        const fullName = document.createElement('td');
        fullName.classList.add('truncate-text');
        fullName.textContent = item.full_name;
        tr.appendChild(fullName);

        // Appending item name
        const itemName = document.createElement('td');
        itemName.classList.add('truncate-text');
        itemName.textContent = item.item_name;
        tr.appendChild(itemName);

        // Appending item description
        const itemDescription = document.createElement('td');
        itemDescription.classList.add('truncate-text');
        itemDescription.textContent = item.item_description;
        tr.appendChild(itemDescription);

        // Appending status
        const itemStatus = document.createElement('td');
        itemStatus.classList.add('status');
        const divStatus = document.createElement('div')
        const pStatus = document.createElement('p');

        // Conditional redering, will show if the item is missing or found
        if (item.is_found === 0) {
            pStatus.textContent = "Missing"
            divStatus.classList.add('status-missing-clr')
            itemStatus.appendChild(divStatus);
            itemStatus.appendChild(pStatus);
            
        } else {
            pStatus.textContent = "Found";
            divStatus.classList.add('status-found-clr');
            itemStatus.appendChild(divStatus);
            itemStatus.appendChild(pStatus);
        }
        tr.appendChild(itemStatus);

        // Kebab container
        const kebabContainer = document.createElement('td');
        kebabContainer.classList.add('kebab-container');
        tr.appendChild(kebabContainer);

        // Kebab button
        const kebabButton = document.createElement('i')
        kebabButton.classList.add('kebab-btn', 'fa-solid', 'fa-ellipsis-vertical');
        kebabContainer.appendChild(kebabButton);

        // Kebab modal
        const kebabModal = document.createElement('div');
        kebabModal.classList.add('kebab-modal');
        kebabContainer.appendChild(kebabModal);

        // edit kebab button
        const openEditModalBtn = document.createElement('button');
        openEditModalBtn.classList.add('open-edit-modal-btn');
        kebabModal.appendChild(openEditModalBtn);

        // edit kebab button icon
        const editKebabModalIcon = document.createElement('i');
        editKebabModalIcon.classList.add('fa-solid', 'fa-pen-to-square');
        openEditModalBtn.appendChild(editKebabModalIcon);

        // edit kebab button text
        const editKebabModalText = document.createElement('p');
        editKebabModalText.textContent = 'Edit';
        openEditModalBtn.appendChild(editKebabModalText)

        // delete kebab button
        const openDeleteModalBtn = document.createElement('button');
        openDeleteModalBtn.classList.add('open-delete-modal-btn');
        kebabModal.appendChild(openDeleteModalBtn);

        // delete kebab button icon
        const deleteKebabModalIcon = document.createElement('i');
        deleteKebabModalIcon.classList.add('fa-solid', 'fa-trash');
        openDeleteModalBtn.appendChild(deleteKebabModalIcon);

        // delete kabab button text
        const deleteKebabModalText = document.createElement('p');
        deleteKebabModalText.textContent = 'Delete';
        openDeleteModalBtn.appendChild(deleteKebabModalText)
    })
}