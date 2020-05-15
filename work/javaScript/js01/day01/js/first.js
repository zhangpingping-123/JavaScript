console.log("hello 2020年你好");
let arr = [
  { name: "张三", age: 20, gender: "male" },
  { name: "李四", age: 18, gender: "female" }
];
console.table(arr);
console.error("我是红色的错误");

console.time("t1");
for (let i = 0; i < 10000; i++) {
  console.log("我在执行");
}
console.timeEnd("t1");
