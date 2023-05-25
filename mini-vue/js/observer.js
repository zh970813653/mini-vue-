

class Observer {
    constructor(data){
        this.walk(data)

    }
    walk(data){
        if (!data || typeof data !== 'object') {
            return
        }
        if (Array.isArray(data)) {
             
        }else{
            Object.keys(data).forEach(key => {
                const value = data[key]
                this.defineReactive(data,key,value) 
            }) 
        }
    }
    defineReactive(target,key,val){
        const dep = new Dep()
        this.walk(val)
        Object.defineProperty(target,key,{
            get(){
                Dep.target && dep.addSub(Dep.target)
                return val
            },
            set:(newV) => {
                if (newV === target[key]) {
                    return
                }
                val = newV
                this.walk(newV)
                dep.notify()
            }
        })
    }
}