Este proyecto Mern se trata sobre como empezar una aplicación full-stack de videos juegos, crear el api y como crear el back end y front end

[IMPORTANTE] no se les olvide correr una instancia de mongod si estan usando mongodb localmente. 

[Create React App](https://github.com/exehsandoval).


# Comandos de deploy a Node/React app.

# instalar nodejs
curl -sL https://deb.nodesource.com/setup_10.x -o nodesource_setup.sh

# ejecutar el bash script
sudo bash nodesource_setup.sh

# ejecturar el comando y fijarse que sure node js este instalado
sudo apt-get install -y nodejs

# instalar nginx para el server
sudo apt-get install nginx

# setup for sites available
cd /etc/nginx/sites-available/

# setup the proxy
sudo vim default

# fijarse ’server_name _;’ copiar:

      location /api {
                proxy_pass http://localhost:5000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

        location / {
                proxy_pass http://localhost:3000;
                proxy_http_version 1.1;
                proxy_set_header Upgrade $http_upgrade;
                proxy_set_header Connection 'upgrade';
                proxy_set_header Host $host;
                proxy_cache_bypass $http_upgrade;
        }

# testiar el nginx en running properly
sudo nginx -t

# reiniciar nginx system
sudo systemctl restart nginx

# instalar pm2
sudo npm i pm2 -g

# instalar mongodb
sudo apt install -y mongodb

# check mongoldb status
sudo systemctl status mongodb

# instalar el git del proyecto en el server

# check .env file on backend
/127.0.0.1/ instead of localhost

# checkear on frontend
Just leave “/api”

Server setup for the react file
# filename: server.js

const express = require('express');
const compression = require('compression');
const path = require('path');
const app = express();

app.use(compression());
app.use(express.static(path.join(__dirname, 'build')));
 
app.get('*', function(req, res) {
    res.sendFile(path.join(__dirname, 'build', 'index.html'));
});
 
const PORT = process.env.PORT || 3000;
 
app.listen(PORT, () => {
    console.log(`App is running on port ${PORT}`);
});

#npm install both

#npm run build react prod

#pm2 both

#DONE
