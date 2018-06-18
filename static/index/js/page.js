// 移动 selected 位置
const transformSelected = (box_page, condition) => {
    const select = e('.selected')
    select.classList.remove('selected')
    const nav = e('.nav')
    const list = nav.querySelectorAll('span')

    const index = box_page + 1*condition
    list[index].classList.add('selected')
}

const transformPage = (box_page, element, condition) => {
    const p = (box_page * 100) + 100*condition
    const line = e('line')
    line.style.transform = transformXPx(p)
    element.style.transform  = transformYPercent(-p)
    element.dataset.page = box_page + 1*condition  
}

const changePage = () => {
    const box = e('.box')
    var mouse = 'mousewheel'
    if (isFirefox()) {
        mouse = 'DOMMouseScroll'
    }
    box.addEventListener(mouse, function(event) {        
        var condition = event.deltaY
        if (isFirefox()) {
            condition = event.detail * 100 / 3
        }
        var box_page = Number(box.dataset.page)
        
        if (condition > 0) {
            if (box_page == 3) {
                return
            }
            transformPage(box_page, box, 1)
            transformSelected(box_page, 1)
        } else if (condition < 0) {
            if (box_page == 0) {
                return
            }
            transformPage(box_page, box, -1)
            transformSelected(box_page, -1)
        }
    })
}

// 翻到 self 所绑定的页面
const goPage = (self) => {
    const box = e('.box')
    const index = self.dataset.index
    box.dataset.page = index
    const value = index * 100
    const line = e('line')
    line.style.transform  = transformXPx(value)
    box.style.transform  = transformYPercent(-value)
}

// 改变选中状态
const changeSelected = (self) => {
    const select = e('.selected')
    select.classList.remove('selected')
    self.classList.add('selected')
}

// 给 nav 绑定翻页事件
const bindGoPage = () => {
    const nav = e('.nav')
    const list = nav.querySelectorAll('span')
    for (var i = 0; i < list.length; i++) {
        var element = list[i]
        element.addEventListener('click', (event) => {
            const self = event.target
            goPage(self)
            changeSelected(self)
        })
    }
}
