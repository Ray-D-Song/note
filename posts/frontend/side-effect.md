# Side Effect

Vue 文档中有一段表述：

> 这个 update() 函数会产生一个副作用，或者就简称为作用 (effect)，因为它会更改程序里的状态。

这和我理解的副作用概念不太一样。  

React 中的副作用，指的其实是超过 「React 范畴」的逻辑。  
比如：

- 数据请求
- 订阅外部事件
- 手动更改 React 组件之外的状态

最典型的事例是修改 localStorage。

```js
localStorage.setItem('name', 'John');
```

这时候我开始思考「副作用」的定义。  

在计算机科学中，函数副作用（side effect）指当调用函数时，除了返回可能的函数值之外，还对主调用函数产生附加的影响。例如修改全局变量（函数外的变量），修改参数，向主调方的终端、管道输出字符或改变外部存储信息等。

所以，副作用，指的是在函数执行过程中，除了正常返回值之外，对外部环境产生的其他影响。而这个外部环境存在一个`scope(作用域)`的概念。

例如，在 React 中，scope 是除了 React 这个内部系统之外的任何事物。
在 Vue 中，作用域可以是某个响应式变量，或者是某个组件。

比如
```js
const name = ref('Ray')

const fullName = ref('')
watch(name, (val) => {
  fullName.value = `${val}-D-Song`
})
```

在这里，响应式变量 name 自身就是一个 scope，修改 name 时会同步更新 fullName，而这个更新操作就是`副作用`。