const vm = new Vue({
    el: '#app',
    directives: {
        focus(el, bindings) {
            if (bindings.value) {
                el.focus()
            }
        }
    },
    data: {
        todos: [
            {
                isSelected: false,
                title: '吃饭',
            },
            {
                isSelected: false,
                title: '睡觉',
            }
        ],
        title: '',
        cur: '',
        hash: '',
    },
    created() {
        this.todos = JSON.parse(localStorage.getItem('todos')) || this.todos
        this.hash = window.location.hash || '#/all'
        window.addEventListener('hashchange', () => {
            this.hash = window.location.hash
        }, false)
    },
    watch: {
        todos: {
            handler() {
                localStorage.setItem('todos', JSON.stringify(this.todos))
            },
            deep: true
        }
    },
    computed: {
        count() {
            return this.todos.filter(item => !item.isSelected).length
        },
        filterTodos() {
            if (this.hash == '#/all') {
                return this.todos
            } else if (this.hash == '#/finish') {
                return this.todos.filter(item => item.isSelected)
            } else if (this.hash == '#/unfinish') {
                return this.todos.filter(item => !item.isSelected)
            } else {
                return this.todos
            }
        }
    },
    methods: {
        add() {
            this.todos.push({
                isSelected: false,
                title: this.title
            })
            this.title = ''
        },
        remove(todo) {
            this.todos = this.todos.filter(item => item !== todo)
        },
        remember(todo) {
            this.cur = todo
        },
        cancel() {
            this.cur = ''
        }
    }
})
