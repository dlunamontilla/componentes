TRANSPILADOR = scss
PARAMETROS = -w -t expanded
RUTA = recursos/activos/sass:vista/css

main:
	${TRANSPILADOR} ${PARAMETROS} ${RUTA}

server:
	php -S localhost:1100

all:
	${TRANSPILADOR} ${PARAMETROS} ${RUTA} & php -S localhost:1100

kill:
	killall -9 scss
