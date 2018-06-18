const switchSection = (self) => {
    const slide = e('.slide')
    const index = Number(slide.dataset.index)
    const section = Number(slide.dataset.section)
    log('index', index)

    if (self.classList.contains('slide-left')) {
        log('slide-left')
        if (index == 0) {
            slide.dataset.index = section
            var n = section * 100 / (section + 1)
            log('n', n)
        } else {
            slide.dataset.index = index - 1
            var n = slide.dataset.index * 100 / (section + 1)
        }
    } else if (self.classList.contains('slide-right')) {
        log('slide-right')
        if (index == section) {
            slide.dataset.index = 0
            var n = 0
        } else {
            slide.dataset.index = index + 1
            var n = slide.dataset.index * 100 / (section + 1)
        }
    }
    switchActive(slide)
    slide.style.transform  = transformXPercent(-n)
}

const bindSwitchSection = () => {
    bindAll('.slide-button', 'click', (event) => {
        var self = event.target
        switchSection(self)
    })
}

const switchActive = (slide) => {
    const indi_active = e('.indi-active')
    indi_active.classList.remove('indi-active')

    const idModel = '#id-indi-'
    const index_now = slide.dataset.index
    const id = idModel + index_now
    const active = e(id)
    active.classList.add('indi-active')
}

const nextSection = () => {
    const slide = e('.slide')
    const index = Number(slide.dataset.index)
    const section = Number(slide.dataset.section)

    if (index == section) {
        slide.dataset.index = 0
        var n = 0
    } else {
        slide.dataset.index = index + 1
        var n = slide.dataset.index * 100 / (section + 1)
    }
    slide.style.transform  = transformXPercent(-n)

    switchActive(slide)
}

const autoPlay = () => {
    setInterval(() => {nextSection()}, 10000)
}

const goSection = () => {
    bindAll('.slide-indi', 'click', (event) => {
        const self = event.target
        const slide = e('.slide')
        const index = self.dataset.index
        const section = Number(slide.dataset.section)

        slide.dataset.index = index
        const n = index * 100 / (section + 1)
        slide.style.transform  = transformXPercent(-n)

        switchActive(slide)
    })
}
