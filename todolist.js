const text = document.querySelector('.text');
const add = document.querySelector('.btn_add');
const list = document.querySelector('.list');
const totalItem = document.querySelector('p');
const tobBar = document.querySelector('.tab');
const bottom = document.querySelector('.list_footer')
let data = [];
const tabList = ['全部', '待完成', '已完成'];
let nowTab = tabList[0];

//generateTodoItem()
function generateTodoItem(item, index) {
    return ` 
        <li>
        <label class="checkbox" for="">
          <input type="checkbox" ${item.checked} data-num='${index}'/>
          <span>${item.content}</span>
        </label>
        <a href="#" data-num='${index}' class="delete"></a>
      </li>`
}

//初始渲染
function renderData() {
    let str = '';
    data.forEach(function (item, index) {
        str += generateTodoItem(item, index)
    })
    list.innerHTML = str
    totalItem.textContent = `共${data.length}個項目`
}
renderData()

//待完成渲染
function unfinishedData() {
    let str = '';
    let count = 0;
    data.forEach(function (item, index) {
        if (item.checked === '') {
            str += generateTodoItem(item, index);
            count++
        }
    })
    list.innerHTML = str
    totalItem.textContent = `${count}個待完成項目`
}

//已完成渲染
function completedData() {
    let str = '';
    let count = 0;
    data.forEach(function (item, index) {
        if (item.checked === 'checked') {
            str += generateTodoItem(item, index);
            count++
        }
    })
    list.innerHTML = str
    totalItem.textContent = `${count}個已完成項目`;
}

//渲染現在位置
function renderDataWithNowTab() {
    if (nowTab === tabList[0]) {
        renderData();
    } else if (nowTab === tabList[1]) {
        unfinishedData();
    } else if (nowTab === tabList[2]) {
        completedData();
    }
}

//新增代辦
add.addEventListener('click', function (e) {
    if (text.value === '') {
        alert('請輸入內容');
        return;
    }
    const obj = {};
    obj.content = text.value;
    obj.checked = '';
    data.push(obj);
    renderData();
    text.value = '';
})

//刪除代辦、checked
list.addEventListener('click', function (e) {
    e.preventDefault();
    const dataNum = e.target.getAttribute('data-num'); //取出索引值
    const dataNumToInt = parseInt(dataNum, 10); //索引值轉為整數
    if (e.target.getAttribute('class') === 'delete') {
        data.splice(dataNum, 1);
    } else {
        const item = data[dataNumToInt] //把物件用變數存起來
        if (item.checked === '') {
            item.checked = 'checked';
        } else {
            item.checked = '';
        }
    }
    renderData();
})


//篩選邏輯
tobBar.addEventListener('click', function (e) {
    let str = '';
    let tobBarLi = document.querySelectorAll('.tab li');
    tobBarLi.forEach(function (item) {
        item.setAttribute('class', '');
    })
    e.target.setAttribute('class', 'active');
    nowTab = e.target.textContent;
    renderDataWithNowTab();
})

//一鍵清除已完成項目
bottom.addEventListener('click', function (e) {
    if (e.target.nodeName === 'A') {
        data = data.filter(function (item) {
            return item.checked === ''
        })
    }
    renderDataWithNowTab();
})