
var mersenne = require('mersennejs.min');
var seed = mersenne.seed;
var rand = mersenne.rand;
var random = mersenne.random;
var randint = mersenne.randint;

seed(s);
for (var i=0; i<10000; i++) {
    console.log(rand())
}

seed(+s);
var n = rand();
var f = n / 4294967296;
var u = Math.floor(f * 10);
seed(+s); if (rand() !== n) console.log("error");
seed(+s); if (random() !== f) console.log("error"); 
seed(+s); if (randint(10) !== u) console.log("error");
seed(+s); if (randint(10) === 10) console.log("error");



