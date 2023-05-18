class Observer {
    constructor(){}
    walk(data){
        if (Array.isArray(data)) {
            
        }else{
            Object.keys(data).forEach(key => {
                const value = data[key]
                this.defineReactive(data,key,value)
            }) 
        }
    }
    defineReactive(target,key,val){
        Object.defineProperty()
    }
}