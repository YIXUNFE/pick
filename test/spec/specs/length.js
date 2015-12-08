describe('测试 length 方法', function() {
  it('调用后，length 方法应该返回数据中子属性个数', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    
    expect(d.length()).toBe(3)
  })
  
  it('空数据时，length 方法应该返回 0', function() {
    var a = {}
    var d = pick(a)
    
    expect(d.length()).toBe(0)
  })
})