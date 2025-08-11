document.addEventListener("DOMContentLoaded", () => {
    const budget = document.getElementById("budget");
    const budgetValue = document.getElementById("budgetValue");
    const form = document.getElementById("contactForm");

    // Actualiza valor del presupuesto
    budget.addEventListener("input", () => {
        budgetValue.textContent = `$${budget.value}`;
    });

    // Enviar formulario con fetch
    form.addEventListener("submit", async (e) => {
        e.preventDefault();
        const formData = {
            name: form.name.value,
            email: form.email.value,
            message: form.message.value,
            consent: form.consent.checked
        };

        try {
            const res = await fetch("/api/contact", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(formData)
            });

            const data = await res.json();
            alert(data.message || "Solicitud enviada correctamente.");
            form.reset();
        } catch (err) {
            alert("Error al enviar la solicitud.");
        }
    });
});
