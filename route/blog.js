// ../ 表示上一级目录
const blog = require('../model/blog')

const all = {
    path: '/api/blog/all',
    method: 'get',
    func: (request, response) => {
        var blogs = blog.all()
        var r = JSON.stringify(blogs, null, 2)
        response.send(r)
    }
}

const add = {
    path: '/api/blog/add',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var form = request.body
        // 插入新数据并返回
        // 验证密码
        var b = blog.new(form)
        var r = JSON.stringify(b)
        response.send(r)
    }
}

/*
请求 POST /api/blog/delete 来删除一个博客
ajax 传的参数是下面这个对象的 JSON 字符串
{
    id: 1
}
*/

// 用 deleteBlog 而不是 delete 是因为 delete 是一个 js 关键字（就像是 function 一样）
var deleteBlog = {
    path: '/api/blog/delete',
    method: 'post',
    func: (request, response) => {
        // 浏览器发过来的数据我们一般称之为 form（表单）
        var form = request.body
        // 删除数据并返回结果
        var success = blog.delete(form.id)
        var result = {
            success: success,
        }
        var r = JSON.stringify(result)
        response.send(r)
    }
}

var detailBlog = {
    path: '/api/blog/:id',
    method: 'get',
    func: (request, response) => {
        var id = Number(request.params.id)
        console.log('b', id)
        var b = blog.get(id)
        var r = JSON.stringify(b, null, 2)
        response.send(r)
    }
}

var routes = [
    all,
    add,
    deleteBlog,
    detailBlog,
]

// 通常, module.exports 和 exports 是同一个东西
// 所以 module.exports.routes = routes 与
// exports.routes = routes 等价
module.exports.routes = routes