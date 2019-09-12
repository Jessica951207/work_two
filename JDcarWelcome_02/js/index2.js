var nameE2 = document.getElementById('picker2');
console.log(nameE2);
var first2 = []; /* 省，直辖市 */
var second2 = []; /* 市 */
var third2 = []; /* 镇 */

var selectedIndex = [0, 0, 0]; /* 默认选中的地区 */

var checked = [0, 0, 0]; /* 已选选项 */

function creatList(obj, list){
  obj.forEach(function(item, index, arr){
  var temp = new Object();
  temp.text = item.name;
  temp.value = index;
  list.push(temp);
  })
}

creatList(city1, first2);

if (city1[selectedIndex[0]].hasOwnProperty('sub')) {
  creatList(city1[selectedIndex[0]].sub, second2);
} else {
  second2 = [{text: '', value: 0}];
}

if (city1[selectedIndex[0]].sub[selectedIndex[1]].hasOwnProperty('sub')) {
  creatList(city1[selectedIndex[0]].sub[selectedIndex[1]].sub, third2);
} else {
  third2 = [{text: '', value: 0}];
}

var picker2 = new Picker2({
	data: [first2, second2, third2],
  selectedIndex: selectedIndex,
	title: '地址选择'
});

picker2.on('picker2.select', function (selectedVal, selectedIndex) {
  var text1 = first2[selectedIndex[0]].text;
  var text2 = second2[selectedIndex[1]].text;
  var text3 = third2[selectedIndex[2]] ? third2[selectedIndex[2]].text : '';
    nameE2.value = text1 + ' ' + text2 + ' ' + text3;
});

picker2.on('picker2.change', function (index, selectedIndex) {
  if (index === 0){
    firstChange();
  } else if (index === 1) {
    secondChange();
  }

  function firstChange() {
    second2 = [];
    third2 = [];
    checked[0] = selectedIndex;
    var firstCity = city1[selectedIndex];
    if (firstCity.hasOwnProperty('sub')) {
      creatList(firstCity.sub, second2);

      var secondCity = city1[selectedIndex].sub[0]
      if (secondCity.hasOwnProperty('sub')) {
        creatList(secondCity.sub, third2);
      } else {
        third2 = [{text: '', value: 0}];
        checked[2] = 0;
      }
    } else {
      second2 = [{text: '', value: 0}];
      third2 = [{text: '', value: 0}];
      checked[1] = 0;
      checked[2] = 0;
    }

      picker2.refillColumn(1, second2);
      picker2.refillColumn(2, third2);
      picker2.scrollColumn(1, 0)
      picker2.scrollColumn(2, 0)
  }

  function secondChange() {
    third2 = [];
    checked[1] = selectedIndex;
    var first_index = checked[0];
    if (city1[first_index].sub[selectedIndex].hasOwnProperty('sub')) {
      var secondCity = city[first_index].sub[selectedIndex];
      creatList(secondCity.sub, third2);
        picker2.refillColumn(2, third2);
        picker2.scrollColumn(2, 0)
    } else {
      third2 = [{text: '', value: 0}];
      checked[2] = 0;
        picker2.refillColumn(2, third2);
        picker2.scrollColumn(2, 0)
    }
  }

});

picker2.on('picker2.valuechange', function (selectedVal, selectedIndex) {
  // console.log(selectedVal);
  // console.log(selectedIndex);
  remark11 = city1[selectedVal[0]]['code'];
  remark22 = city1[selectedVal[0]]['sub'][selectedVal[1]]['code'];
});

nameE2.addEventListener('click', function () {

    picker2.show();
});



