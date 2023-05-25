import {init} from 'snabbdom/build/package/init.js'
import {h} from 'snabbdom/build/package/h.js'

const patch = init([])

// 第一个参数: 标签+选择器
// 第二个参数: 如果是字符串就是标签中的文本内容
let vnode = h('div#container.cls','Hellow word')

let app = document.querySelector('#app')
// 第一个参数: 旧的vnode 可以是dom元素
// 第二个参数: 新的vnode
// 返回新的vnode
const oldVnode = patch(app,vnode)