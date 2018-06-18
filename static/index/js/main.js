const bindEvents = function() {
    // 绑定发切换页面事件
    changePage()

    // 绑定翻页事件
    bindGoPage()

    bindSwitchSection()

    goSection()

    // bindEventSlide()
    // bindEventIndicator()
}

const __main = function() {
    // 绑定事件
    bindEvents()

    autoPlay()

    // getWeather()

    // loadSlide()
}

__main()
