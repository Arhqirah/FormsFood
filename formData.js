document.addEventListener('DOMContentLoaded', function() {
    const form = document.getElementById('recipeForm');
    const numericInputs = form.querySelectorAll('input[type=number]');
    const textInputs = form.querySelectorAll('input[type=text], textarea');
    const urlInputs = form.querySelectorAll('input[type=url]');

    numericInputs.forEach(input => {
        input.addEventListener('input', function(e) {
            let value = e.target.value;

            if (value && isNaN(value)) {
                showError(input, 'Please enter a valid number.');
                return;
            }

            if (input.id === 'serves') {
                if (value < 1 || value > 10) {
                    showError(input, 'Value must be between 1 and 10.');
                } else {
                    clearError(input);
                }
            } else if (input.id === 'prep' || input.id === 'cook') {
                if (value.length > 3) {
                    showError(input, 'Value must be up to 3 digits.');
                } else {
                    clearError(input);
                }
            }
        });
    });

    [...textInputs, ...urlInputs].forEach(input => {
        input.addEventListener('blur', function(e) {
            if (input.type === 'text' && e.target.value.trim() === '') {
                showError(input, 'This field cannot be empty');
            } else if (input.type === 'url') {
                try {
                    new URL(e.target.value);
                    clearError(input);
                } catch (_) {
                    showError(input, 'Please enter a valid URL.');
                }
            } else {
                clearError(input);
            }
        });
    });

    form.addEventListener('submit', function(event) {
    
        const errors = form.querySelectorAll('.error-message');
        if (errors.length > 0) {
            event.preventDefault(); 
            errors[0].previousElementSibling.focus();
        }
    });

    function showError(input, message) {
        clearError(input); 
        input.classList.add('error-input');
        const errorSpan = document.createElement('span');
        errorSpan.classList.add('error-message');
        errorSpan.textContent = message;
        input.parentNode.insertBefore(errorSpan, input.nextSibling);
    }

    function clearError(input) {
        input.classList.remove('error-input');
        const nextElement = input.nextElementSibling;
        if (nextElement && nextElement.classList.contains('error-message')) {
            nextElement.remove();
        }
    }
});
