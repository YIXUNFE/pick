describe('测试 copy 方法', function() {
  it('调用后，应该返回一个新的 pick 对象且和原数据没有引用关系', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p = d.copy()
    
    expect(d.out() === p.out()).toBe(false)
    expect(d.out().a === p.out().a).toBe(true)
  })
  
  it('调用后，返回的应该是一个新的 pick 对象', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p = d.copy()
    
    expect(d === p).toBe(false)
  })
})