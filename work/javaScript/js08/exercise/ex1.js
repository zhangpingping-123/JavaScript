let n = [10, 20];     // new Array(10, 20)
let m = n;
let x = m;
m[0] = 100;
x = [30, 40];   // new Array[30, 40]
x[0] = 200;
m = x;
m[1] = 300;
n[2] = 400;
console.log(n);
console.log(m);
console.log(x); 