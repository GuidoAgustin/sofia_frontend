# QUARTZ Admin Panel

## Pasos para iniciar proyecto en modo desarrollo
```
// Instalamos dependencias
npm install 

// copiamos archivo de variables de entorno
cp .env.example .env.local 

// editamos las variables de entorno en .env.local

// compilamos y corremos hot-reload 
npm start 
```

## Pasos para deploy en produccion
```
// Instalamos dependencias
npm install 

// copiamos archivo de variables de entorno
cp .env.example .env.local 

// editamos las variables de entorno en .env.local

// compilamos archivos y creamos carpeta dist para produccion
npm run build 

// seteamos apache o nginx para que tome el 
// proyecto desde la carpeta /dist como carpeta raiz
```