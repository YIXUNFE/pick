describe('测试 set 方法', function() {
  it('传入一个或多个字符串时，应该设置满足该层级关系的值', function() {
    var a = {a: 1, b: 2, c: 3, x: {y: {z: 0}}}
    var d = pick(a)
    d.set('a', 100)
    d.set('x', 'y', 'z', 99)
    expect(d.get('a')).toBe(100)
    expect(d.get('x', 'y', 'z')).toBe(99)
  })
  
  it('没有对应层级关系时，应该添加所指定的层级关系并赋值', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    d.set('a', 'd', 1)
    d.set('b', 'e', 2)
    expect(d.get('a', 'd')).toBe(1)
    expect(d.get('b', 'e')).toBe(2)
  })
  
  it('传入函数参数时，应该通过函数返回值获取路径', function() {
    var a = {a: 1, b: 2, c: 3, x: {y: {z: 0}}, 'undefined': 'undefined'}
    var d = pick(a)
    
    expect(d.set(function () {}, 'seted').get('undefined')).toBe('seted')
    expect(d.set(function () {return 'a'}, 100).get('a')).toBe(100)
  })
  
  it('传入即非字符串，也非函数参数时，应该会被转换成字符串类型', function() {
    var a = {'0': 1, 'null': 3}
    var d = pick(a)
    d.set(0, 100)
    d.set(null, 100)
    expect(d.get('0')).toBe(100)
    expect(d.get('null')).toBe(100)
  })
})