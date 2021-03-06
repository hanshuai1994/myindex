var log = console.log.bind(console)

var ajax = function(request) {
    var r = new XMLHttpRequest()
    r.open(request.method, request.url, true)
    if (request.contentType != undefined) {
        r.setRequestHeader('Content-Type', request.contentType)
    }
    r.onreadystatechange = function() {
        if (r.readyState == 4) {
            request.callback(r.response)
        }
    }
    if (request.method == 'GET') {
        r.send()
    } else {
        r.send(request.data)
    }
}

var templateBlog = function(blog) {
    var id = blog.id
    var title = blog.title
    var author = blog.author
    var d = new Date(blog.created_time * 1000)
    var time = d.toLocaleString()
    var t = `
        <div class="gua-blog-cell">
            <div class="">
                <a class="blog-title" href="/blog/${id}" data-id="${id}">
                    ${title}
                </a>
            </div>
            <div class="info">
                 <time>${time}</time>
                 <span class="author">@${author}</span>
            </div>
        </div>
    `
    return t
}

var insertBlogAll = function(blogs) {
    var html = ''
    for (var i = blogs.length - 1; i >= 0 ; i--) {
        var b = blogs[i]
        var t = templateBlog(b)
        html += t
    }
    // 把数据写入 .gua-blogs 中，直接用覆盖式写入
    var div = document.querySelector('.gua-blogs')
    div.innerHTML = html
}

var blogAll = function() {
    var request = {
        method: 'GET',
        url: '/api/blog/all',
        contentType: 'application/json',
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var blogs = JSON.parse(response)
            insertBlogAll(blogs)
        }
    }
    ajax(request)
}

var blogNew = function(form) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/blog/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var res = JSON.parse(response)
            var blog = templateBlog(res)
            var div = document.querySelector('.gua-blogs')
            div.insertAdjacentHTML('afterBegin', blog)
        }
    }
    ajax(request)
}

var commentNew = function(form, callback) {
    var data = JSON.stringify(form)
    var request = {
        method: 'POST',
        url: '/api/comment/add',
        contentType: 'application/json',
        data: data,
        callback: function(response) {
            // 不考虑错误情况（断网、服务器返回错误等等）
            console.log('响应', response)
            var c = JSON.parse(response)
            callback(c)
        }
    }
    ajax(request)
}


var e = (selector) => document.querySelector(selector)

var actionCommentAdd = (event) => {
    var self = event.target
    var form = self.closest('.new-comment')
    // <input class="comment-blog-id" type=hidden value="${id}">
    // <input class="comment-author" value="">
    // <input class="comment-content" value="">
    var blogId = form.querySelector('.comment-blog-id').value
    var author = form.querySelector('.comment-author').value
    var content = form.querySelector('.comment-content').value
    var data = {
        blog_id: blogId,
        author: author,
        content: content,
    }
    commentNew(data, function(comment) {
        log('新评论', comment)
    })
}

var bindEvents = function() {
    // 绑定发表新博客事件
    var button = e('#id-button-submit')
    button.addEventListener('click', function(event) {
        console.log('click new')
        // 得到用户填写的数据
        var form = {
            title: e('#id-input-title').value,
            author: e('#id-input-author').value,
            content: e('#id-input-content').value,
            // mima: e('#id-input-mima').value,
        }
        if (!form.author) {
            alert('作者不能为空，请输入作者')
        } else if (!form.title) {
            alert('标题不能为空，请输入标题')
        } else if (!form.content) {
            alert('内容不能为空，请输入内容')
        } else {
            // 用这个数据调用 blogNew 来创建一篇新博客
            blogNew(form)
        }
    })

    // 绑定发表评论功能
    document.body.addEventListener('click', function(event) {
        log('click comment new')
        var self = event.target
        if (self.classList.contains('comment-add')) {
            actionCommentAdd(event)
        }
    })
}

var __main = function() {
    // 载入博客列表
    blogAll()
    // 绑定事件
    bindEvents()
}

__main()
