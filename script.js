const nav = document.getElementById('nav');

function show(id) {
    document.querySelectorAll('.screen').forEach(s =>
        s.classList.toggle('show', s.id === id)
    );

    document.querySelectorAll('nav button').forEach(b =>
        b.classList.toggle('active', b.dataset.target === id)
    );

    nav.classList.remove('open');
    window.scrollTo({top: 0, behavior: 'smooth'});
}

document.querySelectorAll('[data-target]').forEach(b =>
    b.onclick = () => show(b.dataset.target)
);

document.querySelectorAll('[data-jump]').forEach(b =>
    b.onclick = () => show(b.dataset.jump)
);

document.getElementById('menu').onclick = () =>
    nav.classList.toggle('open');

const qs = [
[
'¿En qué año comenzó la Revolución francesa?',
['1776','1789','1799'],
1,
'Comenzó en 1789.'
],
[
'¿Qué grupo era la mayoría de la población?',
['El clero','La nobleza','El Tercer Estado'],
2,
'El Tercer Estado reunía a la mayoría de la población.'
],
[
'¿Qué ocurrió el 14 de julio de 1789?',
['La toma de la Bastilla','La coronación de Napoleón','La proclamación del Directorio'],
0,
'La toma de la Bastilla se convirtió en símbolo de la revolución.'
],
[
'¿Qué documento se aprobó en agosto de 1789?',
['El Código Napoleónico','La Declaración de los Derechos del Hombre y del Ciudadano','La Constitución de 1795'],
1,
'La Declaración proclamó derechos y libertades.'
],
[
'¿Qué hecho marcó el final del ciclo revolucionario?',
['La toma de la Bastilla','El golpe de Estado de Napoleón en 1799','La reunión de los Estados Generales'],
1,
'El golpe del 18 de Brumario llevó a Napoleón al poder.'
]
];

let qi = 0;
let score = 0;
let locked = false;

const q = document.getElementById('question');
const a = document.getElementById('answers');
const f = document.getElementById('feedback');
const n = document.getElementById('next');

function draw() {
    locked = false;

    document.getElementById('qcount').textContent =
        `PREGUNTA ${qi + 1} DE 5`;

    q.textContent = qs[qi][0];
    a.innerHTML = '';
    f.textContent = '';
    n.disabled = true;

    n.textContent = qi === 4
        ? 'Ver resultado →'
        : 'Siguiente →';

    qs[qi][1].forEach((v, i) => {
        let b = document.createElement('button');
        b.className = 'answer';
        b.textContent = v;
        b.onclick = () => pick(i, b);
        a.append(b);
    });
}

function pick(i, btn) {
    if (locked) return;

    locked = true;

    let correct = qs[qi][2];

    [...a.children].forEach((b, j) => {
        b.disabled = true;

        if (j === correct) {
            b.classList.add('correct');
        }
    });

    if (i === correct) {
        score++;
    } else {
        btn.classList.add('wrong');
    }

    f.textContent = qs[qi][3];
    n.disabled = false;
}

n.onclick = () => {
    if (!locked) return;

    if (qi < 4) {
        qi++;
        draw();
    } else {
        q.textContent = `Resultado: ${score} de 5`;
        a.innerHTML = '';

        f.textContent = score >= 4
            ? '¡Muy bien! Has comprendido los puntos principales.'
            : 'Puedes revisar las secciones y volver a intentarlo.';

        n.textContent = 'Volver al inicio';

        n.onclick = () => {
            qi = 0;
            score = 0;
            n.onclick = null;
            show('inicio');
            draw();
        };
    }
};

draw();