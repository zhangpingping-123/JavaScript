let show = function () {
  let str = ""
  for (let i = 1; i <= 9; i++) {
    for (let j = 1; j <= i; j++) {
      str += `${j} * ${i} = ${i * j} `
      // str += "*"
    }
    str += "\n"
  }
  console.log(str)
}