let a = {
  n: 1
}
let b = a;
a.x = a = {
  n: 2
}
console.log(a.x)
console.log(b)

//A = B = C
//A = B
//B = C