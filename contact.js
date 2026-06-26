
// CONFIGURACIÓN EMAILJS


const EMAILJS_CONFIG = {
  publicKey: "Y2k8g6cphpg-m6-W6",      // De Account > General
  serviceId: "service_x9tj6hy",      // De Email Services
  templateId: "template_p1d1kwa"     // De Email Templates
};


// INICIALIZACIÓN
(function() {
  emailjs.init({ publicKey: EMAILJS_CONFIG.publicKey });
})();

 
// LÓGICA DEL FORMULARIO

document.addEventListener('DOMContentLoaded', function() {
  const contactForm = document.getElementById('contactForm');
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  
  if (!contactForm) return; // Salir si no existe el formulario
  
  contactForm.addEventListener('submit', handleSubmit);
});

async function handleSubmit(e) {
  e.preventDefault();
  
  const form = e.target;
  const submitBtn = document.getElementById('submitBtn');
  const formMessage = document.getElementById('formMessage');
  
  // Validación extra del lado del cliente
  if (!validateForm(form)) return;
  
  // Estado de carga
  setLoadingState(submitBtn, true);
  hideMessage(formMessage);
  
  try {
    const response = await emailjs.sendForm(
      EMAILJS_CONFIG.serviceId,
      EMAILJS_CONFIG.templateId,
      form
    );
    
    console.log('✅ Email enviado:', response.status, response.text);
    showMessage(
      formMessage, 
      '✅ ¡Mensaje enviado con éxito! Te responderé pronto.', 
      'success'
    );
    form.reset();
    
  } catch (error) {
    console.error('❌ Error al enviar:', error);
    showMessage(
      formMessage, 
      '❌ Error al enviar el mensaje. Por favor intenta nuevamente o escríbeme directamente a mi correo.', 
      'error'
    );
  } finally {
    setLoadingState(submitBtn, false);
  }
}


// FUNCIONES AUXILIARES

function validateForm(form) {
  const name = form.name.value.trim();
  const email = form.email.value.trim();
  const message = form.message.value.trim();
  
  if (name.length < 2) {
    showMessage(
      document.getElementById('formMessage'),
      '⚠️ Por favor ingresa tu nombre completo.',
      'error'
    );
    return false;
  }
  
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage(
      document.getElementById('formMessage'),
      '⚠️ Por favor ingresa un email válido.',
      'error'
    );
    return false;
  }
  
  if (message.length < 10) {
    showMessage(
      document.getElementById('formMessage'),
      '⚠️ El mensaje debe tener al menos 10 caracteres.',
      'error'
    );
    return false;
  }
  
  return true;
}

function setLoadingState(btn, isLoading) {
  const btnText = btn.querySelector('span');
  const btnIcon = btn.querySelector('i');
  
  btn.disabled = isLoading;
  
  if (isLoading) {
    btnText.textContent = 'Enviando...';
    btnIcon.className = 'fa-solid fa-spinner fa-spin';
    btn.classList.add('loading');
  } else {
    btnText.textContent = 'Enviar mensaje';
    btnIcon.className = 'fa-solid fa-paper-plane';
    btn.classList.remove('loading');
  }
}

function showMessage(element, text, type) {
  element.textContent = text;
  element.className = `form-message ${type}`;
  element.style.display = 'block';
  
  // Auto-ocultar después de 6 segundos
  setTimeout(() => {
    hideMessage(element);
  }, 6000);
}

function hideMessage(element) {
  element.style.display = 'none';
  element.textContent = '';
}