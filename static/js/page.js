// 移动 selected 位置
const transformSelected = (box_page, condition) => {
    const select = e('.selected')
    select.classList.remove('selected')
    const nav = e('.nav')
    const list = nav.querySelectorAll('span')

    const index = box_page + (condition / 100)
    list[index].classList.add('selected')
}

const transformPage = (box_page, element, condition) => {
    const p = (box_page * 100) + condition
    const line = e('line')
    line.style = transformXPx(p)
    element.style = transformYPercent(-p)
    element.dataset.page = box_page + (condition / 100)
}

const changePage = () => {
    const box = e('.box')
    box.addEventListener('mousewheel', function(event) {
        var condition = event.deltaY
        var box_page = Number(box.dataset.page)
        if (condition == 100) {
            if (box_page == 3) {
                return
            }
            transformPage(box_page, box, condition)
            transformSelected(box_page, condition)
        } else if (condition == -100) {
            if (box_page == 0) {
                return
            }
            transformPage(box_page, box, condition)
            transformSelected(box_page, condition)
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
    line.style = transformXPx(value)
    box.style = transformYPercent(-value)
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
        const element = list[i]
        element.addEventListener('click', (event) => {
            const self = event.target
            goPage(self)
            changeSelected(self)
        })
    }
}