describe('测试 filter 方法', function() {
  it('在谓词函数中满足条件时返回 true，filter 方法返回的 pick 对象中应该有满足条件的数据', function() {
    var a = {a: 1, b: 2, c: 3}
      
    var r1 = pick(a).filter(function (v, k) {
      return v > 2
    }).out()
    
    expect(r1.a).not.toBeDefined()
    expect(r1.b).not.toBeDefined()
    expect(r1.c).toBeDefined()
  })
  
  it('在谓词函数中返回 1，filter 方法返回的 pick 对象的数据应该为空对象', function() {
    var a = {a: 1, b: 2, c: 3}
      
    var r1 = pick(a).filter(function (v, k) {
      return 1
    }).out()
    
    expect(r1.a).not.toBeDefined()
    expect(r1.b).not.toBeDefined()
    expect(r1.c).not.toBeDefined()
  })
  
  it('在谓词函数中无返回，filter 方法返回的 pick 对象的数据应该为空对象', function() {
    var a = {a: 1, b: 2, c: 3}
      
    var r1 = pick(a).filter(function (v, k) {
      v = v + 1
    }).out()
    
    expect(r1.a).not.toBeDefined()
    expect(r1.b).not.toBeDefined()
    expect(r1.c).not.toBeDefined()
  })
  
  it('在谓词函数中无返回，filter 方法返回的 pick 对象的数据应该为空对象', function() {
    var a = {a: 1, b: 2, c: 3}
      
    var r1 = pick(a).filter(function (v, k) {
      v = v + 1
    }).out()
    
    expect(r1.a).not.toBeDefined()
    expect(r1.b).not.toBeDefined()
    expect(r1.c).not.toBeDefined()
  })
  
  it("当参数并非函数时，filter 方法不执行任何操作", function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var r1 = d.filter()
    expect(r1).not.toBeDefined()
  })
})