

var app = document.getElementById('app1');


var typewriter = new Typewriter(app, {
    loop: true,
    delay: 25,
    deleteSpeed:10
});

typewriter.typeString('Hover On <h2><i>Innovating to grow</i></h2>')
    .pauseFor(1500)
    .deleteChars(18)
    .typeString('<h2><i>Growing to learn</i></h2>')
    .pauseFor(1500)
    .deleteChars(16)
    .typeString('<h2><i>Learning to Innovate</i></h2>')
    .pauseFor(1500)
    .deleteAll()
    .typeString('Embedded Systems')
    .pauseFor(1500)
    .deleteAll()
    .typeString('Student Internship Programs')
    .pauseFor(1500)
    .deleteAll()
    .typeString('Artificial Intelligence')
    .pauseFor(1500)
    .deleteAll()
    .start();




