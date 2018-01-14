const transform = (y) => {
    var t = `transform:translateY(${y}%)`
    return t
}

const transformPage = (box_page, element, condition) => {
    var p = (box_page * 100) + condition
    element.style = transform(-p)
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
        } else if (condition == -100) {
            if (box_page == 0) {
                return
            }
            transformPage(box_page, box, condition)
        }
    })
}
