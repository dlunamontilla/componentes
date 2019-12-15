CC = scss
CFLAGS = -w -t expanded
RUTAS = recursos/activos/sass:vista/css

main:
	${CC} ${CFLAGS} ${RUTAS}

html:
	php index.php > index.html