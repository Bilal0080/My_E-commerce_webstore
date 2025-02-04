// script.js

// Get the form and message elements
const form = document.getElementById('contact-form');
const successMessage = document.getElementById('success-message');
const errorMessage = document.getElementById('error-message');

// Handle form submission
form.addEventListener('submit', async (event) => {
    event.preventDefault();

    // Reset messages
    successMessage.classList.add('hidden');
    errorMessage.classList.add('hidden');

    // Get form data
    const formData = new FormData(form);
    const formObject = Object.fromEntries(formData.entries());

    // Validate form
    if (!formObject.name || !formObject.email || !formObject.subject || !formObject.message) {
        errorMessage.textContent = 'Please fill out all fields.';
        errorMessage.classList.remove('hidden');
        return;
    }

    // Send form data to the server using fetch
    try {
        const response = await fetch('/submit-contact', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formObject),
        });

        const result = await response.json();
        if (result.success) {
            successMessage.classList.remove('hidden');
            form.reset();
        } else {
            errorMessage.textContent = result.message || 'There was an error sending your message. Please try again later.';
            errorMessage.classList.remove('hidden');
        }
    } catch (error) {
        errorMessage.textContent = 'Network error. Please try again later.';
        errorMessage.classList.remove('hidden');
    }
});
