const asideNavigation           = document.querySelector('.aside-navigation');
const asideNavigationBlocker    = document.querySelector('.aside-navigation-blocker')

function showMenu() {
    console.log('clicked')
    asideNavigationBlocker.classList.toggle('show-menu-overlay')
    asideNavigation.classList.toggle('show-menu')
}

const editToggleButtonContainer = document.querySelector('.edit-toggle-button-container');
const editToggleButtonCircle = document.querySelector('.edit-toggle-button-circle');
const editToggleButtonCheckbox = document.querySelector('#edit-toggle-button-checkbox');
const editToggleButtonStatusText = document.querySelector('.edit-toggle-button-status-text');

editToggleButtonCheckbox.addEventListener('click', () => {
    if (editToggleButtonCheckbox.checked) {
        editToggleButtonCircle.style.transform = 'translateX(100%)'
        editToggleButtonStatusText.textContent = "Found"
        editToggleButtonContainer.style.backgroundColor = 'var(--clr-found-highlight)'
        editToggleButtonCircle.style.border = 'calc(var(--toggle-button-size) / 10) solid var(--clr-found-highlight)'
    } else {
        editToggleButtonCircle.style.transform = 'translateX(0)'
        editToggleButtonStatusText.textContent = "Missing"
        editToggleButtonContainer.style.backgroundColor = 'var(--clr-missing-highlight)'
        editToggleButtonCircle.style.border = 'calc(var(--toggle-button-size) / 10) solid var(--clr-missing-highlight)'
    }
})