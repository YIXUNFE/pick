# Pick

简单的对象处理工具。

<br />

## 用法

```javascript
var data = {x: 1, y: 0, z: null}
var pickData = pick(data)

pickData.check('z') // true

pickData.get('x') // 1
```

## `pick` 对象

将一个 `Object` 类型数据传递给 `pick` 方法，会返回一个 `pick` 对象。该对象具有一些简便实用的方法。

```javascript
var data = {x: 1, y: 0, z: null}
var pickData = pick(data) //返回的 pick 对象
```

<br />

### `pick` 对象的方法列表

`pick` 对象的一些方法

方法名 | 描述
---- | ----
out | 返回 `pick` 对象的数据
check | 返回数据中是否具有对应层级关系的属性
get | 返回数据中对应层级关系的属性值
set | 对数据中对应层级关系的属性赋值
copy | 返回 `pick` 对象数据的深复制
extend | 返回用参数数据扩展后的 `pick` 对象
extendTo | 返回用 `pick` 对象数据扩展后的基于参数数据的新 `pick` 对象
map | 遍历原数据后，返回一个新的 `pick` 对象
filter | 遍历原数据后，返回一个新的 `pick` 对象，其数据经过对原数据的过滤得到
length | 返回 `pick` 对象数据的属性个数
destroy | 销毁 `pick` 对象的所有方法

<br />

### `pick` 对象的方法说明

#### out

`out` 方法返回 `pick` 对象包含的数据。

```javascript
var data = {x: 1, y: 0, z: null}
var pickData = pick(data)
pickData.out()
// {x: 1, y: 0, z: null}

data.x = 2
pickData.out()
// {x: 2, y: 0, z: null}

pickData.out().x = 3
data
// {x: 3, y: 0, z: null}
```

<br />

#### check

`check` 方法返回一个布尔值，当数据中具有参数指定的属性时，返回 true，反之则返回 false。方法可以传递一个或多个参数，多参数之间表示数据的层级关系。

```javascript
var data = {x: 1, y: 0, a: {b: {c: 'v1'}, d: 'v2'}}
var pickData = pick(data)
pickData.check('x') // true
pickData.check('y') // true
pickData.check('x', 'y') // false, x 下面没有 y 属性
pickData.check('a', 'b') // true
pickData.check('a', 'd') // true
pickData.check('a', 'b', 'c') // true
pickData.check('a', 'b', 'd') // false, b 下面没有 d 属性
pickData.check('a', 'd', 'x') // false, d 下面没有 x 属性
```

当传入参数是一个函数时，取该函数的返回值作为一个属性字符串。

```javascript
var data = {a: {b: {c: 'v1'}, d: 'v2'}}
var pickData = pick(data)
pickData.check(function () {return 'a'}, function () {return 'b'}) // true
```

`check` 方法所传入的参数除函数类型外都会被转成字符串类型，函数参数的返回值也会被转成字符串类型。

```javascript
var data = {'undefined': 'get', 'null': 'get'}
var pickData = pick(data)
pickData.check(window.undefined) // true
pickData.check(function () {}) // true
pickData.check(null) // true
```

<br />

#### get

`get` 方法返回数据中对应属性的值，它的参数和 `check` 方法类似，多参数之间表示数据的层级关系。

```javascript
var data = {a: {b: {c: 'v1'}, d: 'v2'}}
var pickData = pick(data)

pickData.get('a') // {b: {c: 'v1'}, d: 'v2'}

pickData.get('a', 'b', 'c') // v1

pickData.get('a', 'c') // undefined
```

当传入参数是一个函数时，取该函数的返回值作为一个属性字符串。

```javascript
var data = {a: {b: {c: 'v1'}, d: 'v2'}}
var pickData = pick(data)
pickData.check(function () {return 'a'}, function () {return 'b'}) // {c: 'v1'}
```

方法中传入的参数除函数类型外都会被转成字符串类型，函数参数的返回值也会被转成字符串类型。

```javascript
var data = {'undefined': 'get udf', 'null': 'get null'}
var pickData = pick(data)
pickData.get(window.undefined) // 'get udf'
pickData.check(function () {}) // 'get udf'
pickData.check(null) // 'get null'
```

<br />

#### set

`set` 方法设置数据中对应属性的值，它的参数和 `check` 方法类似，多参数之间表示数据的层级关系，不同的是最后一个参数表示属性的赋值。

```javascript
var data = {a: {b: {c: 'v1'}, d: 'v2'}}
var pickData = pick(data)
pickData.set('x', 'value').out() // {a: {b: {c: 'v1'}, d: 'v2'}, x: 'value'}
pickData.set('a', 'b', {o: 1}).out() // {a: {b: {o: 1}, d: 'v2'}, x: 'value'}
```

`set` 方法的层级在没有对应关系或属性为简单类型时，会将属性改变为 `Object` 类型并赋予相应层级和值。

```javascript
var data = {a: 'v1'}
var pickData = pick(data)
pickData.set('x', 'y', 'z').out() // {a: 'v1', x: {y: 'z'}}

pickData.set('a', 'b', 'c', 'value').out() // {a: {b: {c: 'value'}}}
```

上面的示例中，`set('a', 'b', 'c', 'value')` 这种写法和 `set('a', {b: {c: 'value'}})` 效果是一样的。

`set` 方法会返回 pick 对象自身，所以示例中可以连接使用 `pick` 对象的 `out` 方法。

<br />

#### copy

`copy` 方法会返回一个新的 `pick` 对象，该对象的数据和原数据没有引用关系。

```javascript
var data = {a: 'v1'}
var pickData = pick(data)
var a = pickData.copy()

a.out() === pickData.out() // false
```

如果需要刻意打断引用且不改变数据的属性和值，`copy` 方法是最直接的。

<br />

#### extend

`extend` 方法可以为 `pick` 对象的数据合并新的内容。方法需要传入一个对象作为被合并的内容。

```javascript
var data = {a: 'v1'}
var pickData = pick(data)
pickData.extend({b: 2})

pickData.out() 
// {a: 'v1', b: 2}
```

`extend` 方法回返回 pick 对象自身，可以做链式调用。

```javascript
var data = {a: 'v1'}
var pickData = pick(data)
pickData.extend({b: 2}).out() 
// {a: 'v1', b: 2}
```

<br />

#### extendTo

`extendTo` 方法和 `extend` 方法类似，但是它并不会改变原数据，而是将原数据作为被合并内容，得到一个新的数据并返回处理该数据的 `pick` 对象。

```javascript
var data = {a: 'v1'}
var pickData = pick(data)
var newData = pickData.extendTo({b: 2})

newData.out()
// {a: 'v1', b: 2}

pickData.out() 
// {a: 'v1'}
```

<br />

#### map

`map` 方法会遍历 `pick` 对象的数据并返回一个新的 `pick` 对象。

```javascript
var data = {a: 'v1', b: 2}
var pickData = pick(data)

var newData = pickData.map(function (v, k) {
  return v + 'xxx'
})

newData.out()
// {a: 'v1xxx', b: '2xxx'}
pickData.out()
// {a: 'v1', b: 2}

```

`map` 方法会根据所传入的参数函数的返回值作为新 `pick` 对象的数据值。当函数没有返回值时，使用原数据的值。

```javascript
var data = {a: 'v1', b: 2}
var pickData = pick(data)

var newData = pickData.map(function (v, k) {
  v = v + 'xxx'
})

newData.out()
// {a: 'v1', b: '2'}
pickData.out()
// {a: 'v1', b: 2}
newData.out() === pickData.out()
//false
```

<br />

#### filter

`filter` 方法也会遍历数据，其返回一个新 `pick` 对象，对象的数据由 `filter` 方法所传入的参数决定。

```javascript
var data = {a: 'v1', b: 2}
var pickData = pick(data)

var newData = pickData.filter(function (v, k) {
  return v === 'v1'
})

newData.out()
// {a: 'v1'}
```

<br />

#### length

`length` 方法返回数据的子属性个数，但不包含子属性的属性个数（如果该属性的值是对象的话）。

```javascript
var data = {a: 'v1', b: 2}
var pickData = pick(data)

pickData.length()
// 2
```

<br />

#### destroy

`destroy` 方法会销毁 `pick` 对象的所有方法。

```javascript
pickData.destroy()

pickData
// {}
```

<br />

