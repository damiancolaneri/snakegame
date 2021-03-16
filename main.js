// configuracion de canvas
const board = document.querySelector('canvas');
const boardCtx = board.getContext('2d');

// variables
const direction = {
	s: [0, 1],
	w: [0, -1],
	d: [1, 0],
	a: [-1, 0],
	S: [0, 1],
	W: [0, -1],
	D: [1, 0],
	A: [-1, 0],
	ArrowDown: [0, 1],
	ArrowUp: [0, -1],
	ArrowRight: [1, 0],
	ArrowLeft: [-1, 0],
};

// Variables del tablero
const boardWidth = 636;
const boardHeight = 368;

// TODO: Cambiar speed segun dificultad elegida
const speed = 10;

let keyPress;
const intervalo = 80;

const controls = {
	direction: { x: 1, y: 0 },
	serpiente: [{ x: 318, y: 184 }],
	alimento: { x: 100, y: 100 },
	start: false,
};

// Obtener pulsaciones de teclas
document.onkeydown = (ev) => {
	let keyPress = direction[ev.key];
	const [x, y] = keyPress;
	if (-x !== controls.direction.x && -y !== controls.direction.y) {
		controls.direction.x = x * speed;
		controls.direction.y = y * speed;
	}
};

// Dibujar objetos
const draw = () => {
	boardCtx.clearRect(0, 0, 636, 368);
	const head = controls.serpiente[0];
	const alimento = controls.alimento;
	drawFigures('#18181a', head.x, head.y);
	drawFigures('red', alimento.x, alimento.y);
};

const drawFigures = (color, x, y) => {
	boardCtx.fillStyle = color;
	boardCtx.fillRect(x, y, 10, 10);
};

// funcion start
const start = () => {
	const head = controls.serpiente[0];
	let dx = controls.direction.x;
	let dy = controls.direction.y;
	head.x += dx;
	head.y += dy;
	requestAnimationFrame(draw);
	setTimeout(start, intervalo);
};

const randomPosition = () => {
	let d = Object.values(direction);
	return {
		x: parseInt(Math.random() * boardWidth) / speed,
		y: parseInt(Math.random() * boardHeight) / speed,
		d: d[parseInt(Math.random() * 11)],
	};
};

/**
 * Inicia el juego al cargar la patalla
 *  TODO: iniciar con boton start
 */
window.onload = () => {
	let position = randomPosition();
	let alimentoPosition = randomPosition();
	let head = controls.serpiente[0];
	head.x = position.x;
	head.y = position.y;
	controls.direction.x = position.d[0] * speed;
	controls.direction.y = position.d[1] * speed;
	controls.alimento.x = alimentoPosition.x;
	controls.alimento.y = alimentoPosition.y;
	start();
};
