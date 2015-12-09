describe('测试 get 方法', function() {
  it('传入一个或多个字符串时，应该返回满足该层级关系的值，没有满足的返回 undefined', function() {
    var a = {a: 1, b: 2, c: 3, x: {y: {z: 0}}}
    var d = pick(a)
    
    expect(d.get('b')).toBe(2)
    expect(d.get('a', 'b')).not.toBeDefined()
    expect(d.get('x', 'y', 'z')).toBe(0)
    expect(d.get('x', 'y')).toEqual({z: 0})
  })
  
  it('未传入参数时，应该返回 undefined', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    
    expect(d.get()).not.toBeDefined()
  })
  
  it('传入函数参数时，应该通过函数返回值获取路径', function() {
    var a = {a: 1, b: 2, c: 3, x: {y: {z: 0}}, 'undefined': 'undefined'}
    var d = pick(a)
    
    expect(d.get(function () {})).toBe('undefined')
    expect(d.get(function () {return 'a'})).toBe(1)
  })
  
  it('传入即非字符串，也非函数参数时，应该会被转换成字符串类型', function() {
    var a = {'0': 1, 'null': 3}
    var d = pick(a)
    
    expect(d.get(0)).toBe(1)
    expect(d.get(null)).toBe(3)
  })
})