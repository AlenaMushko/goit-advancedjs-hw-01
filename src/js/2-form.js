const formData = {
  email: '',
  message: '',
};

const STORAGE_KEY = 'feedback-form-state';

const form = document.querySelector('.feedback-form');
const emailInput = form.querySelector('input[name="email"]');
const messageInput = form.querySelector('textarea[name="message"]');

const loadFormData = () => {
  const savedData = localStorage.getItem(STORAGE_KEY);
  if (savedData) {
    try {
      const parsedData = JSON.parse(savedData);
      formData.email = parsedData.email || '';
      formData.message = parsedData.message || '';

      emailInput.value = formData.email;
      messageInput.value = formData.message;
    } catch (error) {
      console.error('Error parsing saved form data:', error);
    }
  }
};

const saveFormData = () => {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(formData));
};

const handleInput = event => {
  const { name, value } = event.target;

  formData[name] = value.trim();
  saveFormData();
};

const handleSubmit = event => {
  event.preventDefault();

  if (!formData.email.trim() || !formData.message.trim()) {
    alert('Fill please all fields');
    return;
  }

  console.log(formData);

  localStorage.removeItem(STORAGE_KEY);
  formData.email = '';
  formData.message = '';
  form.reset();
};

const initForm = () => {
  loadFormData();

  form.addEventListener('input', handleInput);
  form.addEventListener('submit', handleSubmit);
};

if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', initForm);
} else {
  initForm();
}
