# 错误和异常
错误和异常是实践中诞生的概念，目的都是为了处理「程序无法正常运行的情况」。  

## 错误
从代码形式上讲，错误倾向于精确的手动处理。  
比如 fnA 方法调用了 fnB 和 fnC。这两个方法都有可能发生错误，处理代码大概就是下面这样：
```js
function fnA() {
  const { err: bErr, res: bRes } = fnB()
  if (bErr) {
    // ...
    // 错误处理
  }

  const { err: cErr, res: cRes } = fnC()
  if (cErr) {
    // ...
    // 错误处理
  }
  // 正常逻辑
}
```

「错误」的关键在于将函数的返回值设为对象或数组，其中一个字段代表「发生错误」。只要这个字段不为空，程序员就知道正常的流程被中断了。

同时，JavaScript 存在一个内置`Error`对象和构造方法，但代表错误的字段并不强制要求是Error对象。Error对象反而更多用在异常处理中。

## 异常
既然已经有了错误，为什么还需要异常？  

想象这样一个场景，你的软件有一个按钮，点击按钮会触发 function A，经过层层调用（也许是 10 层），在 function X 报错。你并不想提示用户"未知错误"，而是想具体的告知到底是哪里发生了什么错。

用错误可以实现这种效果，但是你要写十次这种代码：
```js
function fnA() {
  const { err, res } = fnB()
  if (err) {
    // 向用户展示错误
    showErr(err)
  }
}

function fnB() {
  const { err, res } = fnC()
  if (err)
    // 向上传递
    return { err, null }
}

// ... 经过 10 个类似的传递

function fnY() {
  const { err, res } = fnX()
  if (err)
    // 向上传递
    return { err, null }
}
```

这种层层传递的样板代码非常低效，更好的方法就是使用`异常（exception）`。

你要做的就只是在 fnY 发生错误时 throw，在顶层 catch 即可。

```js
function fnA() {
  try {
    fnB()
  } catch (e) {
    showErr(e)
  }
}

// ...

function fnY() {
  const { err, res } = fnX()
  if (err)
    // 抛出
    throw err
}
```
这样不管在哪层发生了错误，都可以在顶层捕捉，其他层的代码不受影响。  
避免了某处错误对整个代码结构的"污染"。  

## 为什么要区别两者？
刚刚解释了为什么有了错误还得有异常，似乎异常是错误的上位替代，错误显得有些多余。

但最佳实践是严格区分两者，不需要层层向上传递的，应该在本层直接处理。比如 fnC 的错误，如果不需要在 fnA 层用到，就应该在 B 层作为错误直接处理掉，而不是向上抛出。  

假设所有的错误都在顶层处理，那逻辑全都堆在顶层的 catch 中，难以维护

```js
function main() {
  try {
    task1()
    task2()
    task3()
  } catch(e) {
    switch(e) {
      case "type A":
        //...
        break;
      case "type B":
        //...
        break;
      case "type C":
        //...
        break;
    }
  }
}
```