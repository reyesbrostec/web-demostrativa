// Scroll suave
document.querySelectorAll('a[href^="#"]').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

// Mensaje al enviar formulario
document.querySelector('form').addEventListener('submit', e => {
    e.preventDefault();
    alert('Gracias por contactarnos, te responderemos pronto.');
});
