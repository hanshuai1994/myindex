const fs = require('fs')
var comment = require('./comment')


const blogFilePath = 'db/blog.json'


// 这是一个用来存储 Blog 数据的对象
class ModelBlog {
    constructor(form) {
        // || 是一种新的写法，在 js 圈子里太过流行，所以记住即可
        // a = b || c 意思是如果 b 会转成 false（比如 undefined, null），
        // 就把 c 赋值给 a, 否则就把 b 的值赋给 a
        this.title = form.title || ''
        this.author = form.author || ''
        this.content = form.content || ''
        // 生成一个 unix 时间，unix 时间是什么，上课会说
        this.created_time = Math.floor(new Date() / 1000)
    }
}

const loadBlogs = () => {
    // 确保文件有内容，这里就不用处理文件不存在或者内容错误的情况了
    var content = fs.readFileSync(blogFilePath, 'utf8')
    var blogs = JSON.parse(content)
    // console.log('load blogs', blogs)
    return blogs
}

/*
b 这个对象是我们要导出给别的代码用的对象
它有一个 data 属性用来存储所有的 blogs 对象
它有 all 方法返回一个包含所有 blog 的数组
它有 new 方法来在数据中插入一个新的 blog 并且返回
它有 save 方法来保存更改到文件中
*/

var b = {
    data: loadBlogs(),
}

b.all = function() {
    var blogs = this.data
    // 遍历 blog，插入 comments
    var comments = comment.all()
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        var cs = []
        for (var j = 0; j < comments.length; j++) {
            var c = comments[j]
            if (blog.id == c.blog_id) {
                cs.push(c)
            }
        }
        blog.comments = cs
    }
    return blogs
}

b.get = function(id) {
    var blogs = this.data
    var comments = comment.all()
    for (var i = 0; i < blogs.length; i++) {
        var b = blogs[i];
        if (b.id == id) {
            var cs = []
            for (var j = 0; j < comments.length; j++) {
                var c = comments[j]
                if (b.id == c.blog_id) {
                    cs.push(c)
                }
            }
            b.comments = cs
            return b
        }
    }
    // 循环结束都没有找到, 说明出错了, 那就返回一个空对象好了
    return {}
}

b.new = function(form) {
    var m = new ModelBlog(form)
    // console.log('new blog', form, m)
    // 设置新数据的 id
    var d = this.data[this.data.length - 1]
    if (d == undefined) {
        m.id = 1
    } else {
        m.id = d.id + 1
    }
    // 把数据加入 this.data 数组
    this.data.push(m)
    // 把最新数据保存到文件中
    this.save()
    // 返回新建的数据
    return m
}

/*
它能够删除指定 id 的数据
删除后保存修改到文件中
*/
b.delete = function(id) {
    var blogs = this.data
    var found = false
    for (var i = 0; i < blogs.length; i++) {
        var blog = blogs[i]
        if (blog.id == id) {
            found = true
            break
        }
    }
    // 用 splice 函数删除数组中的一个元素
    // 如果没有找到，i 的值就是无用值，删除也不会报错
    // 所以不用判断也可以
    blogs.splice(i, 1)
    // 不返回数据也行，但是还是返回一下好了
    return found
}

b.save = function() {
    var s = JSON.stringify(this.data, null, 2)
    fs.writeFile(blogFilePath, s, (error) => {
        if (error != null) {
            console.log('error', error)
        } else {
            console.log('保存成功')
        }
    })
}


// 导出一个对象的时候用 module.exports = 对象 的方式
// 这样引用的时候就可以直接把模块当这个对象来用了（具体看使用方法）
module.exports = b
