B — Despliegue paso a paso (local → GitHub → Vercel)
0) Pre-check (rápido)

Antes de empezar, confirma que tienes:

    Windows con VS Code instalado.

    Git instalado y GitHub Desktop configurado con tu cuenta.

    Cuenta en Vercel.

    Node.js + npm instalado (usa node -v y npm -v para verificar).
    Si te falta alguno dímelo y te indico cómo instalarlo.

1) Crear proyecto local y revisar archivos (5–10 min)

    Crea la carpeta del proyecto, por ejemplo:

    C:\Proyectos\web-demostrativa

    Abre VS Code → Archivo > Abrir carpeta → selecciona web-demostrativa.

    Abre el documento del canvas “WEB-DEMOSTRATIVA — Arccio...” y copia los archivos base a tu carpeta (crea index.html, style.css, script.js, api/contact.js, privacy-policy.md, vercel.json, README.md).

        Por qué: tener archivos listos acelera la validación local y evita errores tipográficos.

2) Probar en local con Live Preview (5 min)

    En VS Code instala la extensión Live Preview (MarketPlace).

    Abre index.html.

    Haz clic en el botón Preview (icono en la esquina superior derecha del editor) o usa el comando Live Preview: Show Preview.

    Verifica:

        Hero, botones CTA, estilos (paleta pastel azul/naranja/verde).

        Interactividad: mueve la barra de presupuesto (range) y observa el valor cambiar.

        Formulario: al enviar mostrará “Enviando...” (en local no habrá /api activo a menos que ejecutes vercel dev — ver paso 4).

Consejo: si quieres que el endpoint /api/contact funcione localmente, en la terminal instala Vercel CLI (npm i -g vercel) y luego ejecuta:

vercel dev

Esto levantará un servidor local (normalmente en http://127.0.0.1:3000) que sirve la web y las funciones serverless (carpeta /api).

    Por qué: vercel dev emula la plataforma y te permite probar la función api/contact exactamente como en producción.

3) Inicializar Git y crear repo con GitHub Desktop (10 min)

Opción GUI (GitHub Desktop):

    Abre GitHub Desktop → File > New repository.

        Name: web-demostrativa

        Local path: C:\Proyectos\web-demostrativa

    Click Create repository.

    En GitHub Desktop escribe un commit message: Inicial: WEB-DEMOSTRATIVA - Arccio → Commit to main.

    Click Publish repository → selecciona tu cuenta de GitHub → Publish.

Alternativa (CLI):

cd C:\Proyectos\web-demostrativa
git init
git add .
git commit -m "Inicial: WEB-DEMOSTRATIVA - Arccio"
# Crea repo en GitHub manualmente y luego:
git remote add origin https://github.com/tuUsuario/web-demostrativa.git
git branch -M main
git push -u origin main

    Por qué: mantener el historial (commits) y un repo público o privado te permite desplegar con Vercel y versionar cambios.

4) Desplegar en Vercel (GUI o CLI) (5–8 min)
Opción A — Panel web (recomendada si prefieres GUI)

    Entra en https://vercel.com → Login.

    Click New Project → Import Git Repository → selecciona web-demostrativa de tu GitHub.

    Opciones:

        Framework: Vercel detectará “Other” (sitio estático).

        Build command: dejar vacío o npm run build si tienes un build step.

        Output directory: / (root).

    Click Deploy.

    Al finalizar tendrás una URL tipo https://web-demostrativa-<hash>.vercel.app.

Opción B — CLI (rápido)

En la carpeta del proyecto ejecuta:

vercel login              # login por email si no lo has hecho
vercel                    # sigue prompts: selecciona scope y nombre del proyecto
# Para publicar en producción:
vercel --prod

    Por qué: Vercel integra CI/CD — cada push a main desplegará una versión nueva automáticamente.

5) Configurar variables de entorno y secretos en Vercel (importantísimo)

En Vercel dashboard → tu proyecto → Settings → Environment Variables:

    MAIL_API_KEY — (si usas SendGrid/Mailgun).

    CONTACT_EMAIL — correo receptor de notificaciones.

    SUPABASE_URL / SUPABASE_ANON_KEY (si usarás Supabase).

    NEXTAUTH_SECRET (si luego activas autenticación).

Agrega variables para Preview y Production según necesites.

    Por qué: nunca metas keys en el repo. Vercel las proporciona como process.env.* en serverless.

6) Verificación post-deploy (lista rápida)

    Abre la URL pública de Vercel.

    Prueba la barra de presupuesto y asegúrate que el valor se muestre.

    Prueba el formulario:

        Si configuraste api/contact y claves, completa y envía; revisa logs en Vercel (Dashboard → Deployments → Logs).

        Si no, usa vercel dev para test local.

    Usar Inspector / Console en el navegador para errores.

    Ejecuta Lighthouse (Chrome DevTools → Lighthouse) para metrics de performance/SEO/accessibility.

7) Opcional: enlazar dominio personalizado

En Vercel → Domains → Add Domain → sigue instrucciones para configurar DNS (CNAME/A records). Vercel te dará certificados TLS automáticamente.
C — Integración premium: Obsidian → Git → Plataforma académica (Next.js + MDX). ¿Por qué este flujo?

Motivación:

    Permite que el equipo académico (docentes/administrativos) escriba contenido en Obsidian (familiar, offline, con backlinks) y que ese contenido se sincronice automáticamente al repositorio que alimenta la plataforma pública/privada.

    Ideal para instituciones que quieren editar currículos, noticias, guías o recursos y publicarlos con control de versiones.

C.1) Arquitectura recomendada (alto nivel)

/web-demostrativa (repo principal)
├─ /site               # demo landing (lo que ya publicaste)
├─ /platform           # Next.js app que consume /content (o contenido via API)
└─ /content            # Markdown (.md/.mdx) mantenido por Obsidian (la fuente de verdad)

    Obsidian abre la carpeta content/ como Vault.

    Obsidian Git plugin hace commits/push a GitHub.

    Vercel (o una segunda instancia) despliega platform/ y genera páginas desde content/ (SSG/ISR).

Por qué monorepo: simplifica permisos, rutas y despliegues, y te permite relacionar demo y la plataforma.
C.2) Configurar Obsidian para flujo Git (detallado)

    En tu máquina crea C:\Proyectos\web-demostrativa\content y abre Obsidian → Open folder as vault → selecciona content.

    Instala plugin comunitario Obsidian Git:

        Settings → Community plugins → Browse → Obsidian Git → install → enable.

    Configuración sugerida (Obsidian Git plugin):

        Auto pull on startup: ON.

        Auto pull before save: ON.

        Auto commit on save: ON (opcional; recomendar intervalos para evitar muchos commits).

        Push after commit: ON.

        Commit message template: chore: content update - {{date}}

    Autenticación Git:

        En Windows, usa Git Credential Manager (ya viene con Git for Windows) o crea SSH keys y añádelas a GitHub.

        Para PAT (si usas HTTPS): GitHub → Settings → Developer settings → Personal access tokens → Generate token (scopes: repo). Guarda el token localmente.

        Por seguridad: preferir SSH keys o credential manager antes que pegar tokens en archivos.

Por qué: este flujo automatiza que los cambios que hagan docentes en Obsidian lleguen al repo content y desencadenen un build en Vercel.
C.3) Plataforma Next.js que consume Markdown (pasos claves)

    Desde la raíz crea carpeta platform y genera la app:

cd C:\Proyectos\web-demostrativa
npx create-next-app@latest platform
# responde prompts (TypeScript opcional). 

Instala MDX/Markdown tooling:

cd platform
npm install @next/mdx @mdx-js/loader gray-matter remark remark-html

Configura next.config.js para MDX:

const withMDX = require('@next/mdx')({
  extension: /\.mdx?$/
})
module.exports = withMDX({
  pageExtensions: ['js','jsx','ts','tsx','md','mdx'],
})

Leer archivos de /content para generar rutas estáticas:

    En getStaticPaths y getStaticProps usar fs y path:

        import fs from 'fs'
        import path from 'path'
        import matter from 'gray-matter'

        const contentPath = path.join(process.cwd(), '..', 'content') // si platform está en subcarpeta

        const files = fs.readdirSync(contentPath)

        Parsear frontmatter con gray-matter y renderizar MDX.

    Configura autoría y edición: muestra Edit on GitHub links y posibilidad de autenticación si es contenido privado.

Por qué: Next.js + MDX te da contenido dinámico y render SEO-friendly. Mantener content en repo facilita CI/CD.
C.4) Autenticación y control de acceso (resumen práctico y seguro)

Para contenido privado (aulas, material restringido) implementa:

    Auth: Supabase Auth o NextAuth.js.

    Session cookies: HttpOnly, Secure, SameSite=Strict.

    Server-side authorization: proteger rutas en Next.js (API routes y pages) comprobando sesión.

    Row Level Security (RLS) si usas Postgres (Supabase): para aislar datos por institución.

    Firmed URLs para archivos (S3/Supabase Storage): generar URLs temporales firmadas para descargas.

Variables sensibles (API keys, service role keys) solo en Vercel env vars (o en Secret Manager).
C.5) Protección de datos personales (LOPDP + buenas prácticas)

    Consentimiento explícito: formulario con checkbox y link a política (ya incluido).

    Aviso de privacidad con DPO/contacto real.

    Minimización: solo recoger lo imprescindible (nombre, email, mensaje).

    Acceso limitado: solo DPO/admin pueden ver datos sensibles.

    Cifrado en tránsito (TLS) y cifrado en reposo (usar DB que soporte cifrado o cifrado a nivel de columna para datos sensibles).

    Backups y retención: definir plazos y borrado automático.

    Logs de acceso y auditoría (no almacenar el contenido de mensajes sin necesidad).

    Consentimiento retirable: permitir solicitar supresión o rectificación (vía endpoint o email del DPO).

C.6) Deploy y pipeline final (resumen de pasos)

    content/ ←– Obsidian edits → Obsidian Git push → GitHub repo updated.

    Vercel (plataforma) está conectado al repo y auto-deploya platform/ cuando detecta cambios.

    Para contenido privado, no incluirlo en la build pública: generar rutas que chequeen auth y sirvan contenido solo si la sesión es válida (SSR/API).

C.7) Checklist final de seguridad & QA antes de entregar a cliente

HTTPS activado y forzado (HSTS).

CSP y otras cabeceras configuradas (vercel.json).

Revisar logs: no exponer datos personales.

Variables de entorno en Vercel, no en repo.

Endpoint contact validado y límites anti-spam (rate limit).

Test de vulnerabilidades (npm audit, Dependabot/Snyk).

Pruebas de usabilidad móvil + Lighthouse > 90 donde sea posible.

    Política de privacidad visible y mecanismo para ejercer derechos.

¿Qué hago ahora? (acción inmediata)

Indica cómo quieres que avancemos en este momento (elige una opción):

    Te voy guiando en tiempo real (yo te doy cada comando / clic y esperas a que lo ejecutes — perfecto si quieres hacer B ahora).

    Yo produzco y pego aquí los comandos exactos y pequeñas configuraciones para C (Obsidian Git config, ejemplo next.config.js, snippet para getStaticProps, y los pasos para crear PAT).

    Ambos: hacemos B en este turno (guiado paso a paso) y luego en la siguiente iteración hago C con ejemplos de código y configuración (más largo y técnico).

Dime cuál eliges y dime también:

    ¿Tienes Node.js y Vercel account listos?

    ¿Prefieres que content/ esté dentro del mismo repo web-demostrativa o en un repo separado? (recomiendo mismo repo para empezar).