export function showNotification(message = "This is a notification!") {
    // Create the notification container
    const notification = document.createElement('div');
    notification.classList.add('notification');

    // Add the notification message
    const notificationMessage = document.createElement('p');
    notificationMessage.classList.add('notification-message');
    notificationMessage.textContent = message; // Add message
    notification.appendChild(notificationMessage);

    // Append to the body
    const mainContainer = document.querySelector('.main-container')
    mainContainer.appendChild(notification);

    // Apply initial styles
    notification.style.transform = 'translateY(100px)';
    notification.style.transition = 'transform 0.5s ease, opacity 0.5s ease';

    // Trigger animation
    setTimeout(() => {
        notification.style.transform = 'translateY(10px)';
        notification.style.opacity = '1';
    }, 100);

    // Hide the notification after 5 seconds
    setTimeout(() => {
        notification.style.transform = 'translateY(-100%)';
        notification.style.opacity = '0';

        // Remove the notification from the DOM after animation ends
        setTimeout(() => {
            notification.remove();
        }, 500); // Match the transition duration
    }, 5000);
}