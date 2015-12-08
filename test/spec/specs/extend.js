describe('测试 extend 方法', function() {
  it('传入对象后，原数据应该被改变', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    d.extend({a: 0, d: 4})
    
    var obj = d.out()
    expect(obj.a).toBe(0)
    expect(obj.b).toBe(2)
    expect(obj.d).toBe(4)
  })
  
  it('传入对象后，应该返回原 pick 对象', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p = d.extend({a: 0, d: 4})
    
    expect(p === d).toBe(true)
  })
  
  it('传入非对象时，应该返回原 pick 对象', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p1 = d.extend('123')
    var p2 = d.extend(123)
    var p3 = d.extend(null)
    var p4 = d.extend(function () {})
    var p5 = d.extend()
    
    expect(p1 === d).toBe(true)
    expect(p2 === d).toBe(true)
    expect(p3 === d).toBe(true)
    expect(p4 === d).toBe(true)
    expect(p5 === d).toBe(true)
  })
})