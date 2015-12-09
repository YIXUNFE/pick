describe('测试 out 方法', function() {
  it('调用后，应该返回原数据且引用关系存在', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    expect(d.out() === a).toBe(true)
  })
  
  it('对返回值进行修改后，pick 对象的数据应该是修改后的数据', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var p = d.out()
    p.a = 100
    expect(d.get('a') === 100).toBe(true)
  })
})