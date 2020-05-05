# TRANSPILAR CÓDIGO SCSS:
TRANSPILADOR = scss
PARAMETROS = -w -t expanded

# Se deben establecer en FUENTE la ruta de los archivos SASS
# y en la SALIDA la ruta donde quedarán transpilados en archivos
# CSS:
FUENTE = recursos/activos/sass
SALIDA = vista/css

# FUENTE y SALIDA:
SOURCE = ${FUENTE}:${SALIDA}

# PREPARAR UN SERVIDOR CON PHP:
PHP = php
PUERTO = 7000
PARAMETROSPHP = -S localhost:${PUERTO}

# El nombre de los archivos los puedes cambiar aquí:
HTML = index.php > index.html

# PREDETERMINADO:
main:
	${TRANSPILADOR} ${PARAMETROS} ${SOURCE}

# Crear un archivo HTML a partir de un archivo PHP:
html:
	${PHP} ${HTML}

# Preparar un servidor Web con PHP:
servidor:
	${PHP} ${PARAMETROSPHP}

# Preparar un entorno de desarrollo con 
# SASS y PHP. Se requiere tener instalado 
# SASS y PHP:
entorno:
	${TRANSPILADOR} ${PARAMETROS} ${RUTAS} &
	${PHP} ${PARAMETROSPHP} && fg
