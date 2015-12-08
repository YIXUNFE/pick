describe('测试 extendTo 方法', function() {
  it('传入对象后，原数据应该不变', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    d.extendTo({a: 0, d: 4})
    
    var obj = d.out()
    expect(obj.a).toBe(1)
    expect(obj.b).toBe(2)
    expect(obj.d).not.toBeDefined()
  })
  
  it('传入对象后，应该返回一个新 pick 对象且数据应该是合并的数据', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p = d.extendTo({a: 0, d: 4})
    
    var obj = p.out()
    expect(p === d).toBe(false)
    expect(obj.a).toBe(1)
    expect(obj.b).toBe(2)
    expect(obj.d).toBe(4)
  })
  
  it('传入非对象时，应该返回空数据的 pick 对象', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p1 = d.extendTo('123')
    var p2 = d.extendTo(123)
    var p3 = d.extendTo(null)
    var p4 = d.extendTo(function () {})
    var p5 = d.extendTo()
    
    expect(p1.length()).toBe(0)
    expect(p2.length()).toBe(0)
    expect(p3.length()).toBe(0)
    expect(p4.length()).toBe(0)
    expect(p5.length()).toBe(0)
  })
})