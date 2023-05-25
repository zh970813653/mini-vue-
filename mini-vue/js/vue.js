class Vue {
    constructor(options){
        // 初始化属性
        this.$options = options || {}
        this.$data = options.data || {}
        this.$el = typeof options.el === 'string' ? document.querySelector(options.el) : options.el
        // 将数据注入vue实例中 添加get set
        this._proxyData(options.data)
        // 将data中的数据设置响应式
        new Observer(this.$data)
        // 编译指令
        new Compiler(this)
    }
    _proxyData(data){
        Object.keys(data).forEach(key => {
            Object.defineProperty(this,key,{
                enumerable: true,
                configurable: true,
                get(){
                    return data[key]
                },
                set(newV){
                    if (data[key] === newV) {
                        return
                    }
                    data[key] = newV
                }
            })
        })
    }
}