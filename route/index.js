var fs = require('fs')

const sendHtml = (path, response) => {
    var options = {
        encoding: 'utf-8'
    }
    path = 'template/' + path
    fs.readFile(path, options, (error, data) => {
        // console.log(`读取的html文件 ${path} 内容是`, data)
        response.send(data)
    })
}

var index = {
    path: '/',
    method: 'get',
    func: (request, response) => {
        var path = 'index.html'
        sendHtml(path, response)
    }
}

var weather = {
    path: '/weather',
    method: 'get',
    func: (request, response) => {
        var path = 'weather.html'
        sendHtml(path, response)
    }
}

var resume = {
    path: '/resume',
    method: 'get',
    func: (request, response) => {
        var path = 'resume.html'
        sendHtml(path, response)
    }
}

var music = {
    path: '/music',
    method: 'get',
    func: (request, response) => {
        var path = 'music-player.html'
        sendHtml(path, response)
    }
}

var routes = [
    index,
    weather,
    resume,
    music,
]

module.exports.routes = routes
