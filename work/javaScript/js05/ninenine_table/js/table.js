/**
 * 
 * @param {String} parentId 
 * @param {Number} size 
 */
function show(parentId, size) {
  let oUl = document.getElementById(parentId)
  let str = ""
  for (let i = 1; i <= size; i++) {
    str += `<li>`
    for (let j = 1; j <= i; j++) {
      // console.log(`${j} * ${i} = ${i * j}`)
      str += `<span>${j} * ${i} = ${i * j} </span>`
    }
    str += `</li>`
  }
  console.log(str)
  oUl.innerHTML = str;
}