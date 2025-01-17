# TODO-list App

## Descripción

La aplicación **TODO-list** es una herramienta diseñada para gestionar tareas y recordatorios de manera sencilla. Su principal objetivo es mostrar mis conocimientos y habilidades como desarrollador Frontend. La mayoria de sus componentes son creados desde cero, implementando lógicas complejas para integrar sus funcionalidades a la API de FormModels que provee Angular. Utilizo los últimos estándares de Angular: Standalone components, Zoneless change detection, Signals, HTML ```@``` syntax...

## Tecnologías Utilizadas

- **Frontend:**
  - [Angular 18](https://angular.io/) - Un marco de trabajo para construir aplicaciones web.
  - [TypeScript](https://www.typescriptlang.org/) - Un superconjunto de JavaScript que agrega tipos estáticos.
  - [ECMAScript 6+](https://www.ecma-international.org/ecma-262/6.0/) - La última versión de JavaScript que proporciona nuevas características y mejoras.
  - [Angular Material](https://material.angular.io/) - Un conjunto de componentes UI que siguen las directrices de Material Design.
  - [SCSS](https://sass-lang.com/) - Un preprocesador CSS que permite un estilo más limpio y estructurado.
  - [RxJS](https://rxjs.dev/) - Una biblioteca para programación reactiva que permite gestionar eventos asincrónicos.

- **Backend:**
  - [Node.js 22](https://nodejs.org/) - Un entorno de ejecución de JavaScript del lado del servidor.
  - [Firebase](https://firebase.google.com/) - Plataforma de Google que proporciona bases de datos en tiempo real, autenticación y hosting.

## Características 📝

- **Gestión de Tareas:** Visualizar, crear, editar y eliminar tareas.
- **Interfaz Amigable:** Utiliza Angular Material para una experiencia de usuario atractiva.
- ~**Autenticación:** Permite a los usuarios registrarse y acceder a sus tareas de forma segura.~ (⚠️ EN PROGRESO)
- **Sincronización en Tiempo Real:** Los cambios se reflejan instantáneamente gracias a Firebase.
- **Responsive Design:** Accesible desde dispositivos móviles y de escritorio.
- **Componentes personalizados:** Utiliza componentes creados desde 0, hechos a medida para los requisitos de la aplicación.

## Instalación ⚙️

Para ejecutar la aplicación localmente, sigue estos pasos:

1. **Clona el repositorio:**
   ```bash
   git clone https://github.com/ArielFalcon/TODO-list.git
   cd TODO-list
   ```

2. **Instala las dependencias:**
   ```bash
   npm install
   ```

3. **Configura Firebase:**
   - Crea un proyecto en [Firebase Console](https://console.firebase.google.com/).
   - Añade tu configuración de Firebase en el archivo `src/environments/environment.ts`.

4. **Ejecuta la aplicación:**
   ```bash
   ng serve
   ```
   > **Importante**: Requiere Node v22

5. Abre tu navegador y accede a `http://localhost:4200`
    > **Importante**: Verifica el puerto, puede variar.


## Contribuciones

Las contribuciones son bienvenidas. Si deseas contribuir, por favor sigue estos pasos:

1. Haz un fork del repositorio.
2. Crea una nueva rama (`git checkout -b feature/nueva-caracteristica`).
3. Realiza tus cambios y haz un commit (`git commit -m 'Añadir nueva característica'`).
4. Haz un push a la rama (`git push origin feature/nueva-caracteristica`).
5. Abre un pull request.

## Licencia

Este proyecto está bajo la [MIT License](LICENSE).

## Contacto

Si tienes alguna pregunta o sugerencia, no dudes en contactarme a través de [falconyumn@gmail.com](mailto:tu-email@ejemplo.com).
