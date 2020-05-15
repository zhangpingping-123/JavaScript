/**
 * 该方法用来生成小彩旗
 * @param {String} parentID 请给我父标签的id
 * @param {Number} size 您期望生成多少条小彩旗
 * @param {Array} colorBox 颜色数组
 */
function show(parentID, size, colorBox) {
  let oUl = document.getElementById(parentID);
  for (var i = 0; i < size; i++) {
    oUl.innerHTML += `<li style="background-color: ${colorBox[i % colorBox.length]}"></li>`
  }
  let aLi = oUl.getElementsByTagName("li")
  for (let i = 0; i < aLi.length; i++) {
    aLi[i].onmouseover = function () {
      aLi[i].style.backgroundColor = "green"
    }
    aLi[i].onmouseout = function () {
      aLi[i].style.backgroundColor = `${colorBox[i % colorBox.length]}`
    }
  }
}