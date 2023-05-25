class Watcher {
    constructor(vm,key,cb){
        this.vm = vm
        // data中的属性名称
        this.key = key
        // 回调函数更新最新视图
        this.cb = cb
        // 把watcher对象记录到Dep类的静态属性target中
        Dep.target = this
        // 触发一次属性的gett方法 在get方法中触发addsub
        this.oldValue = vm[key]
        Dep.target = null
    }
    update(){
        const newValue = this.vm[this.key]
        if (this.oldValue === newValue) {
            return
        }
        this.cb(newValue)
    }
}