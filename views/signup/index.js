
const nameInput = document.querySelector('#name-input');
const emailInput = document.querySelector('#email-input');
const passwordInput = document.querySelector('#password-input');
const confirmPasswordInput = document.querySelector('#confirm-password-input');
const formBtn = document.querySelector('#form-btn');
const form = document.querySelector('#form');

const NAME_VALIDATION = /^([A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}\s){1}[A-ZÁÉÍÓÚÑ][a-záéíóúñ]{1,15}$/;
const EMAIL_VALIDATION = /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/;
const PASSWORD_VALIDATION = /^(?=.*\d)(?=.*[a-z])(?=.*[a-zA-Z]).{8,}$/;

// validations
let nameValidation = false;
let emailValidation = false;
let passwordValidation = false;
let confirmPasswordValidation = false;

const resetInputs = () => {
    formBtn.disabled = true;
    nameInput.value = ''
    emailInput.value = ''
    passwordInput.value = ''
    confirmPasswordInput.value = ''
    nameInput.classList.remove('outline-green-700', 'outline-red-700', 'outline-2', 'outline', 'focus:outline-cyan-700');
    emailInput.classList.remove('outline-green-700', 'outline-red-700', 'outline-2', 'outline', 'focus:outline-cyan-700');
    passwordInput.classList.remove('outline-green-700', 'outline-red-700', 'outline-2', 'outline', 'focus:outline-cyan-700');
    confirmPasswordInput.classList.remove('outline-green-700', 'outline-red-700', 'outline-2', 'outline', 'focus:outline-cyan-700');
};

const validation = (input, regexValidation) => {

    formBtn.disabled = nameValidation && emailValidation && passwordValidation && confirmPasswordValidation ? false : true;

    if (input.value === '') {
        input.classList.remove('outline-red-700', 'focus:outline-cyan-700');
        input.classList.add('outline-2', 'outline', 'focus:outline-cyan-700');
    } else if (regexValidation) {
        input.classList.remove('outline-red-700', 'focus:outline-cyan-700');
        input.classList.add('outline-green-700', 'outline-2', 'outline');
    } else {
        input.classList.remove('outline-green-700', 'focus:outline-cyan-700');
        input.classList.add('outline-red-700', 'outline-2', 'outline');
    }
};

nameInput.addEventListener('input', e => {
    nameValidation = NAME_VALIDATION.test(e.target.value);
    validation(nameInput, nameValidation);
});
emailInput.addEventListener('input', e => {
    emailValidation = EMAIL_VALIDATION.test(e.target.value);
    validation(emailInput, emailValidation);
});
passwordInput.addEventListener('input', e => {
    passwordValidation = PASSWORD_VALIDATION.test(e.target.value);
    confirmPasswordValidation = e.target.value === confirmPasswordInput.value;
    validation(passwordInput, passwordValidation);
    validation(confirmPasswordInput, confirmPasswordValidation);

});
confirmPasswordInput.addEventListener('input', async e => {
    confirmPasswordValidation = e.target.value === passwordInput.value;
    validation(confirmPasswordInput, confirmPasswordValidation);
});

form.addEventListener('submit', async e => {
    e.preventDefault();
    loader.classList.remove('hidden');
    formBtn.classList.add('hidden');
    if (nameValidation && emailValidation && passwordValidation && confirmPasswordValidation) {
        try {
            const newUser = {
                name: nameInput.value,
                email: emailInput.value,
                password: passwordInput.value,
            };
            // eslint-disable-next-line no-undef
            const { data } = await axios.post('/api/users', newUser);
    
            notification.classList.remove('hidden');
            createNotification(false, data)
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 5000)
            
            loader.classList.add('hidden');
            formBtn.classList.remove('hidden');
            resetInputs();
        } catch (error) {
            notification.classList.remove('hidden');
            createNotification(true, error.response.data.error)
            setTimeout(() => {
                notification.classList.add('hidden');
            }, 5000)
            loader.classList.add('hidden');
            formBtn.classList.remove('hidden');
            formBtn.disabled = true;
        }
        } else {
        notification.classList.remove('hidden');
        createNotification(true, 'Debes validar todos los campos.')
        setTimeout(() => {
            notification.classList.add('hidden');
        }, 5000)
        loader.classList.add('hidden');
        formBtn.classList.remove('hidden');
        formBtn.disabled = true;
    }
});

window.onload = function() {
    var loader = document.getElementById('loaderr')
    var home = document.getElementById('home')

    home.style.visibility = 'flex'
    home.style.opacity = '100'
    
    loader.style.visibility = 'hidden';
    loader.style.opacity = '0'
}