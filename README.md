# Gerstión de Tareas

Rest API para la gestión de tareas. El objetivo principal es crear un  
backend funcional para la gestión de tareas.

Para utilizar de la mejor manera el API Rest puede visitar la siguiente documentación [API Documentation](https://documenter.getpostman.com/view/28450211/2s9YC8xBKE).
# Despliegue del API Rest

Configuración de la instancia de sistema operativo Ubuntu 20.04 en ***AWS***
### Prerrequisitos
Antes de proceder con las instalaciones se debe actualizar los repositorios `apt` con el siguiente comando:

    sudo apt update

## Instalación de NodeJs

Para instalar NodeJs se puede utilizar `apt` o el gestor de versiones de node `nvm`, en este caso se utiliza el segundo.

Primero se instala `nvm` para lo cual se descarga el archivo bash y se procede a ejecutar con las siguientes lineas de código.

    curl -o- https://raw.githubusercontent.com/nvm-sh/nvm/v0.39.1/install.sh | bash
    source ~/.bashrc
Luego se procede a instalar la versión que se va a utilizar

    nvm install v18.17.1
Para validar si la instalación se lo puede realizar lo siguiente:

    node -v

## Instalación y configuración de PostgreSQL

Para la instalación de PostgreSQL se va a utilizar `apt` con el siguiente comando:

    sudo apt install postgresql postgresql-contrib
Luego de la instalación se procese a la creación del rol y la base de datos que se utilizará en la aplicación de ***NodeJs***. 
Primero se ingresa al `prompt` de Postgres:

    sudo -i -u postgres
Luego se crea el rol 

    createuser --interactive
Luego se ingresa el nombre del nuevo rol y se le concede privilegios

    Output
    Enter name of role to add: test
    Shall the new role be a superuser? (y/n) y
A continuación, se crea la base de datos para el nuevo rol:

    createdb sammy
    exit
Finalmente, se crea el usuario linux y se ingresa al `prompt` con el nuevo rol y se crea la base de datos que se utilizará en la aplicación

    sudo adduser test
    sudo -i -u test psql
    \conninfo  //para ver la información de la conección
    ALTER USER test WITH PASSWORD 'test123';
    \q
    exit

 
## Instalación y configuración de Nginx

Para la instalación de Nginx se va a utilizar `apt` con el siguiente comando:

    sudo apt install nginx
Luego se procede a configurar el Firewall

    sudo ufw allow 'Nginx HTTP'
    sudo ufw allow 'OpenSSH'
    sudo ufw enable
    sudo ufw status
Para verificar el web service

    systemctl status nginx
Luego se modifica el archo default de nginx para que redireccione el puerto 3000 al puerto 80

    sudo nano /etc/nginx/sites-available/default
En `location` se escribe lo siguiente

    location / {
          proxy_pass http://localhost:3000;
          proxy_http_version 1.1;
          proxy_set_header Upgrade $http_upgrade;
          proxy_set_header Connection 'upgrade';
          proxy_set_header Host $host;
          proxy_cache_bypass $http_upgrade;
    }
Para verificar que no hay errores en el archivo se puede utilizar

    sudo nginx -t
Si no hay errores se procede a reiniciar el servicio de nginx

    sudo systemctl restart nginx

## Clonar y desplegar el proyecto

Una vez con todo listo, se procede a clonar el proyecto desde el repositorio de **GitHub**

    git clone https://github.com/xavy26/management-tasks.git
Una vez clonado el proyecto se ingresa la carpeta

    cd management-tasks
Luego se procede a instalar las dependencias del proyecto

    npm install
Finalmente se ejecuta el proyecto

    npm run start

