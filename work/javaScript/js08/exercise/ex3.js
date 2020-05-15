let obj = {
  name: "laoma",
  arr: ["a", "b", "c"]
}

let obj2 = obj;
let arr = obj.arr;

obj2.arr = ["a", "b", "c", "d"];
obj2.name = "laohu"

console.log(arr)
console.log(obj.name)
console.log(obj === obj2)
console.log(obj.arr === obj2.arr)
console.log(obj.arr === arr)

//抽个同学分析一下