# coches-web-windows

# Descripcion

Coches-Web es una pagina web de una compraventa de coches hecha con Laravel, React, Docker y en base de datos MySql.

    · Gestion CRUD (creacion, lectura, actulizacion y eliminacion) de usuarios y vehiculos.

    · Sistema robusto de inicio de sesion y registro.

    · Los usuarios pueden comprar y vender coches de forma facil, rapida y segura.

    · Buena presentacion con efectos y animaciones.

# Como ejecutarla

  1. Clonar el repositorio en una carpeta o descargarlo en ZIP y extraerlo como carpeta.
    
  2. Tener XAMPP o Laragon instalado https://www.apachefriends.org/es/index.html , https://laragon.org/download .

  3. En el archivo de configuracion de Apache (httpd.conf) buscar la seccion <Directory "C:/laragon/www"> y poner AllowOverride All.
    
  4. Activar servicios de Apache y MySQL.
    
  5. Mover la carpeta dentro de la carpeta de Apache (C:/xampp/www o C:/laragon/www).

  6. En el terminal, ubicarse dentro del directorio del proyecto (coches-app) y escribir "rm -rf public/storage" (para bash) o "rmdir /s /q public\storage" (para cmd) y "php artisan storage:link"
    
  7. Tambien escribir "php artisan migrate:refresh --seed" y "npm run dev".
    
  8. En el navegador poner la URL: http://coches-web-windows.test/ o https://coches-web-windows.test/ .
