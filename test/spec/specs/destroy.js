describe('测试 destroy 方法', function() {
  it('调用后，pick 对象应该被删除所有方法', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    d.destroy()
    
    expect(d.out).not.toBeDefined()
    expect(d.get).not.toBeDefined()
  })
  
  it('调用后，应该返回 pick 对象的数据', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var b = d.destroy()
    
    expect(a === b).toBe(true)
  })
})