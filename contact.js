document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  
  if (!contactForm) return;
  
  contactForm.addEventListener('submit', handleSubmit);
});

async function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  const formData = new FormData(form);
  
  setLoadingState(submitBtn, true);
  hideMessage(formMessage);
  
  try {
    // Envío AJAX a FormSubmit
    const response = await fetch('https://formsubmit.co/ajax/arielrobsebasti@gmail.com', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Accept': 'application/json'
      },
      body: JSON.stringify(Object.fromEntries(formData))
    });
    
    const result = await response.json();
    
    if (result.success === "true" || response.ok) {
      showMessage(formMessage, '✅ ¡Mensaje enviado con éxito! Te responderé pronto.', 'success');
      form.reset();
    } else {
      showMessage(formMessage, '❌ Error al enviar. Intenta nuevamente.', 'error');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage(formMessage, '❌ Error de conexión. Intenta nuevamente.', 'error');
  } finally {
    setLoadingState(submitBtn, false);
  }
}

function setLoadingState(btn, isLoading) {
  const btnText = btn.querySelector('span');
  const btnIcon = btn.querySelector('i');
  btn.disabled = isLoading;
  
  if (isLoading) {
    btnText.textContent = 'Enviando...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
  } else {
    btnText.textContent = 'Enviar mensaje';
    btnIcon.className = 'fa-solid fa-paper-plane';
  }
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `form-message ${type}`;
  element.style.display = 'block';
  setTimeout(() => hideMessage(element), 6000);
}

function hideMessage(element) {
  element.style.display = 'none';
}