# <ins>Trabajo Práctico Integrador 2 
* **Alumno**: Cabezas Mateo Luciano
* **Materia**: Taller de Programación II
* **Profesores**: Centurión Agustín, Britos Diego, Franco Marcos

## <ins>Tecnologías Utilizadas
### Librería _React_ implementando:
  * **Hooks nativos**: `useState` / `useEffect` para el manejo de estados y efectos.
  * **Custom hooks**: `useFetch` / `useForm` para el manejo de estados en forms y peticiones al backend.
### Librería _React Router_ implementando **componentes nativos**:
  * `BrowserRouter` / `Routes` / `Route` para definición de rutas, paths y elementos a renderizar.
  * `Navigate` / `Outlet` para redireccionamiento automático y enrutamiento protegido mediante custom components.
  * `Link` para enlaces a páginas.
- Framework **Tailwind CSS** mediante el uso de clases utilitarias
- Herramienta de desarrollo y empaquetación **Vite** para entorno del proyecto 
- Aplicación de programación modular siguiendo el éstandar **ES Modules**
- Componentes funcionales escritos en **JSX** (_JavaScriptXML_)

## <ins>Como levantar el proyecto:
### 1er Paso: Preparación Inicial
- En una carpeta, clonar tanto front como back
- Abrir una terminal para cada carpeta (frontend/backend) e instalar dependencias respectivas (`npm i` o `npm install`)
### 2do Paso: Configurar variables de entorno
- En backend, crear archivo .env a partir del .env.example y rellenar datos correspondientes:
- Estructura a completar:
    * `DB_NAME=` Nombre de la BD a crear
    * `DB_USER=` Usuario de la BD (en entornos XAMPP o WAMP suele ser **"root"**)
    * `DB_PASS=` Contraseña de la BD (en entornos XAMPP o WAMP suele estar vacío)
    * `DB_HOST=` Host de la DB (en entornos XAMPP o WAMP suele ser **localhost**)
    * `DB_DIALECT=` Dialecto de la BD a usar (Ejemplo: **mysql**)
    * `JWT_SECRET=` Firma secreta para el token
    * `PORT=` Puerto en el que corre el servidor backend
### 3er Paso: Levantar servidores
- En cada terminal, ejecutar scripts `npm run dev` y acceder al link proporcionado por Vite en la terminal del front