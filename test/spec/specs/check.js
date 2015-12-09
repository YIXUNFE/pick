describe('测试 check 方法', function() {
  it('传入一个参数，check 方法返回数据中是否具有该属性', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var r1 = d.check('b')
    var r2 = d.check('d')
    
    expect(r1).toBe(true)
    expect(r2).toBe(false)
  })
  
  it("当参数并非字符串时，check 方法将转换参数为 string 类型后检查是否具有该属性", function() {
    var a = {'0': 1, '1': 2, '2': 3}
    var d = pick(a)
    var r1 = d.check(1)
    var r2 = d.check(3)
    var r3 = d.check(null)
    
    expect(r1).toBe(true)
    expect(r2).toBe(false)
    expect(r3).toBe(false)
  })
  
  it("当多个参数时，check 方法将检查数据中是否具有该层级属性", function() {
    var a = {a: {b: {c: 1}}, x: {y: {z: 2}}}
    var d = pick(a)
    var r1 = d.check('a', 'b', 'c')
    var r2 = d.check('x', 'y', 'z')
    var r3 = d.check('a', 'x')
    var r4 = d.check('a', 'b')
    var r5 = d.check('a', 'c')
    var r6 = d.check('a', 'b', 'c', 'd')
    
    expect(r1).toBe(true)
    expect(r2).toBe(true)
    expect(r3).toBe(false)
    expect(r4).toBe(true)
    expect(r5).toBe(false)
    expect(r6).toBe(false)
  })
  
  it("当数据中的属性值是 undefined 时，check 方法应该正常返回 true", function() {
    var a = {a: window.undefined}
    var d = pick(a)
    var r1 = d.check('a')
    
    expect(r1).toBe(true)
  })
  
  it("当传入参数是函数时，check 方法应该使用函数返回值进行查找", function() {
    var a = {a: 1, b: {c: {d: 100}}, 'undefined': 'string'}
    var d = pick(a)
    var r1 = d.check(function () {})
    expect(r1).toBe(true)
    
    r1 = d.check(function () {return 'b'}, function () {return 'c'})
    expect(r1).toBe(true)
    
    r1 = d.check(function () {return 'b'}, function () {return 'd'})
    expect(r1).toBe(false)
  })
})