class Compiler {
    constructor(vm){
        this.vm = vm
        this.el = vm.$el
        this.compiler(this.el)
    }

    // 编译模版 处理文本节点和元素节点
    compiler(el){
        const childNodes = [...el.childNodes]
        childNodes.forEach(node => {
            if (this.isTextNode(node)) {
                this.compilerText(node )
                
            }else if (this.isElementNode(node)){
                this.compilerElement(node)
            }
            node.childNodes && node.childNodes.length && this.compiler(node)
        })
    }
    // 编译元素节点 处理指令
    compilerElement(node) {
        // 拿到元素的所有属性 返回的也是夜歌伪数组，需要转换数组
        const attributes = [...node.attributes]
        attributes.forEach(attrItem => {
            // 属性名称
            let attrName = attrItem.name
            // 判断属性是否是一个指令
            if (this.isDirective(attrName)) {
                // 拿到属性值
                const key = attrItem.value
                // v-text => text 去掉v-
                attrName = attrName.substring(2)
                this.update(node, attrName, key)
            }
        })
    }

    // 编译文本节点 处理文本
    compilerText(node) {
        // 通过正则匹配插值表达式
        const reg = /\{\{(.+?)\}\}/
        // 获取文本节点内容
        const value = node.textContent
        if (!!value.match(reg)) {
            const key = value.match(reg)[1].trim()
            node.textContent = this.vm[key]
            // 创建watcher对象 当数据改变 更新试图
            new Watcher(this.vm,key,(newV) => {
                node.textContent = newV
            })
        }
    }
    
    // 判断是否是指令
    isDirective(attrName){
        return attrName.startsWith('v-')
    }

    // 判断节点是否是文本节点
    isTextNode(node){
        return node.nodeType === 3
    }
    // 判断节点是否是元素节点
    isElementNode(node){
        return node.nodeType === 1
    }
    update(node,attrName,key){
        let updateFn = this[attrName+'Updater']
        updateFn && updateFn.call(this,node,this.vm[key],key)
    }
    textUpdater(node,value,key){
        node.textContent = value
        new Watcher(this.vm,key,(newV) => {
            node.textContent = newV
        })
    }
    modelUpdater(node,value,key){
        node.value = value
        new Watcher(this.vm,key,newValue => {
            node.value = newValue
        })
        node.addEventListener('input',(e) => {
            this.vm[key] = node.value
        })
    }
}

