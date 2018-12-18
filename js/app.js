(function (window) {
	'use strict';

	const vm = new Vue({
		el: '.todoapp',
		data: {
			list: [],
			todoName: '',
			url: "http://localhost:3000/todos/",
			clickId: -1
		},
		created() {
			this.getTodoList()
		},
		methods: {
			getTodoList() {
				axios({
					url: this.url,
					method: 'get',
				}).then(res => {
					console.log(res);
					this.list = res.data
				})
			},
			changeState(id, state) {
				axios({
					url: this.url + id,
					method: 'patch',
					data: {
						completed: state
					}
				}).then(res => {
					this.getTodoList()
				})
			},
			addTodo() {
				axios({
					url: this.url,
					method: 'post',
					data: {
						name: this.todoName,
						completed: false
					}
				}).then(res => {
					this.getTodoList()
					this.todoName = ''
				})
			},
			delTodo(id) {
				axios({
					url: this.url + id,
					method: 'delete'
				}).then(res => {
					this.getTodoList()
				})
			},
			showEdit(id) {
				this.clickId = id
			},
			updataTodo(id, name) {
				axios({
					url: this.url + id,
					method: 'patch',
					data: {
						name
					}
				}).then(res => {
					this.getTodoList()
					this.clickId = -1
				})
			}
		},
		computed: {
			isShowFooter() {
				return this.list.length > 0
			},
			leftCount() {
				return this.list.filter(item => !item.completed).length
			},
			isShowClear() {
				return this.list.some(item => item.completed)
			}
		}
	})
	window.vm = vm
})(window);
