let _Vue = null;

export default class VueRouter {
  // install接收两个参数 第一个是vue的构造函数 第二个可选的选项对象
  static install(Vue) {
    // 1. 判断当前插件是否安装
    if (VueRouter.install.installed) {
      return;
    }
    VueRouter.install.installed = true;
    // 2. 把vue构造函数记录到全局变量中 （为什么记录？ 因为需要在实力方法中使用这个构造函数）
    _Vue = Vue;
    // 3. 把创建Vue实例的时候传入的router对象注入到Vue实力上
    // _Vue.prototype.$router new Vue
    _Vue.mixin({
      beforeCreate() {
        if (this.$options.router) {
          _Vue.prototype.$router = this.$options.router;
          this.$options.router.init();
        }
      },
    });
  }
  constructor(options) {
    this.options = options;
    // 这个对象的对象的作用是把options中传入的routes解析出来存入  值存储的就是路由组件
    this.routeMap = {};
    // data是一个响应式对象， 里面有一个current记录的是当前路由的地址
    this.data = _Vue.observable({
      current: "/",
    });
  }
  init() {
    this.createRouteMap();
    this.initComponents(_Vue);
    this.initEvent()
  }
  // 这个函数的作用是把routes中的信息转成健值对 存入routerMap中
  createRouteMap() {
    this.options.routes.forEach((route) => {
      this.routeMap[route.path] = route.component;
    });
  }
  // 创建router-link标签和router-view标签
  initComponents(Vue) {
    Vue.component("router-link", {
      props: {
        to: String,
      },
      template: '<a :href="to" @click="clickHandle"><slot></slot></a>',
      methods: {
        clickHandle(e) {
          // 1. 阻止a链接的默认行为，使其不再像服务器发送请求
          e.preventDefault();
          // 当我们点击a链接的时候要做两件事
          // 2. 调用history.pushState方法,并将需要跳转或者跳转后的连接给到路由对象的data属性上的current属性上
          history.pushState({}, "", this.to)
          this.$router.data.current = this.to;
        },
      },
    });
    Vue.component("router-view", {
      render: (h) => {
        const currentComponents = this.routeMap[this.data.current];
        return h(currentComponents);
      },
    });
  }
  initEvent(){
    window.addEventListener('popstate',(e) => {
        this.data.current = window.location.pathname
    })
  }
}
