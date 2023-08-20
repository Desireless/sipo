# Sipo App

Clon de twitter desarrollado con Nextjs.

### Stack
- Nextjs (App) + Typescript
- Supabase (Auth + Base de datos)

## Instalación y ejecución
Este proyecto hace uso de los servicios de supabase para el inicio de sesion y la base de datos. Para el inicio de sesion es necesario configurar Google y/o Github OAuth. La base de datos necesita especificar las Row Level Security para que supabase no retorne un arreglo vacio.

TODO: Pronto dejaré los scripts del modelo de datos y las RLS de supabase en este mismo repositorio.

### Requisitos
- Git
- Node >= v18.17.1
- Cuenta en supabase

### Variables de entorno
El proyecto necesita el archivo .env.local con lo siguientes datos de supabase:

- NEXT_PUBLIC_SUPABASE_URL=
- NEXT_PUBLIC_SUPABASE_ANON_KEY=

### Ejecutar
En la terminal ejecutar los siguientes comandos:
```bash
git clone git@github.com:Desireless/sipo.git
cd sipo
npm run dev
```


Abrir [http://localhost:3000](http://localhost:3000) en el navegador.

