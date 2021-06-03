# Rutas

NOTA: Para que el proyecto funcione, es necesario:

- Clonar o descargar el repositorio
- Ejecutar yarn install en la carpeta raíz y correr con yarn start. 

Ademas, se deberá ingresar los datos correspondientes a la respectiva conexión de MySQL en el archivo .env en la raíz.

[Link para instalar Yarn](https://classic.yarnpkg.com/en/docs/install)

## VIEW Routes

/tablenames

Regresa una tabla con los nombres de las tablas

/tests/:queryID

Regresa de manera gráfica una tabla con los queries de prueba hardcodeados

/tests/dynamic/:queryID

Muestra un formulario para generar queries de prueba con parametros arbitrarios

/:table/

Regresa los datos de una tabla llamada "table"

/:table/create

Muestra formulario para agregar datos en la tabla create




## API Routes

/api/info  

Regresa los nombres de las tablas


/api/tests/:queryNo

Regresa los resultados de las querys hardcodeadas

GET

/api/:table/

Regresa las filas presentes en la tabla de nombre table

/api/:table/info

Regresa la información de las columnas en la tabla de nombre table

/api/:table/references

Regresa la información de las llaves foráneas en la tabla de nombre table


POST

/api/:table/

Inserta en la base de datos una fila con la información presente en el cuerpo de la solicitud (!CUIDADO, si se realiza esta solicitud, el cuerpo no es parseado/verificado)

/api/:table/form

Inserta los datos presentes en el cuerpo de la solicitud, que vienen a partir de un formulario presentado en la página, aquí si se parsean



