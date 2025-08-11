export default async function handler(req, res) {
    if (req.method !== "POST") {
        return res.status(405).json({ message: "Método no permitido" });
    }

    const { name, email, message, consent } = req.body;

    if (!name || !email || !message || !consent) {
        return res.status(400).json({ message: "Todos los campos son obligatorios" });
    }

    // Aquí iría la integración con un servicio de correo seguro (ej. SendGrid, SMTP)
    console.log("Solicitud recibida:", { name, email, message });

    return res.status(200).json({ ok: true, message: "Formulario recibido con éxito" });
}
