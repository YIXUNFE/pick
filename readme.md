# Pick

简单的对象处理工具。

<br />

## 用法

```javascript
var data = {x: 1, y: 0, z: null}
var pickData = pick(data)

pickData.check('x', 'y', 'z') // true

pickData.check('x', 'a') // false
```

<br />

## 方法

`pick` 对象的一些方法

方法名 | 参数 | 描述
---- | ---- | ----
out | - | 返回 `pick` 对象的数据
check | key, key, key ... | 返回数据中是否具有所有 key
get | key | 返回数据中该 key 的值
set | key, value | 将数据中的 key 设置为 value
copy | - | 返回 `pick` 对象数据的深复制
extend | object | 返回用参数 `object` 扩展后的 `pick` 对象数据
extendTo | object | 返回用 `pick` 对象数据扩展后的 `object`
destroy | - | 销毁 `pick` 对象

<br />

## 用例

```javascript
var data = {x: 1, y: 0, z: null}
var pickData = pick(data)
```

<br />

### out

```javascript
pickData.out()
// {x: 1, y: 0, z: null}
```

### check

```javascript
pickData.check('x', 'y', 'z') // true

pickData.check('x', 'a') // false
```

### get

```javascript
pickData.get('x') // 1

pickData.get('a') // undefined
```

### set

```javascript
pickData.set('x', {})

pickData.get('x') // {}

pickData.set('new_path', 'new_path', 'new_value')

pickData.get('new_key') // 'new_value'

```

### copy

```javascript
var a = pickData.copy()

a === pickData.out() // false
```

### extend

```javascript
pickData.extend({a: 'string'})

pickData.out() 
// {x: 1, y: 0, z: null, a: 'string'}
```

### extendTo

```javascript
pickData.extendTo({a: 'string'})
// {x: 1, y: 0, z: null, a: 'string'}

pickData.out() 
// {x: 1, y: 0, z: null}
```

### destroy

```javascript
pickData.destroy()

pickData
// {}
```

<br />

