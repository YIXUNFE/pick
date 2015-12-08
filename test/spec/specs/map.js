describe('测试 map 方法', function() {
  it('在参数函数中修改值，map 方法返回的 pick 对象的数据应该是修改后的', function() {
    var a = {a: 1, b: 2, c: 3},
      b = {a: {b: {c: 1}}}
      
    var r1 = pick(a).map(function (v, k) {
      return v + '_number'
    }).out()
    
    var r2 = pick(b).map(function (v, k) {
      return typeof v
    }).out()
    
    var item = '',
      i = 0,
      arr = ['1_number', '2_number', '3_number']
    for (item in r1) {
      expect(r1[item]).toBe(arr[i])
      i++
    }
    
    expect(r2.a).toBe('object')
  })
  
  it('当参数函数没有返回, map 方法返回的 pick 对象的数据值应该和原数据一致且无引用关系', function() {
    var a = {a: 1, b: 2, c: 3}
      
    var r1 = pick(a).map(function (v, k) {
      v = k
    }).out()
    
    var item = ''
    for (item in r1) {
      expect(typeof r1[item]).toBe('number')
    }
    
    expect(pick(a).out() === a).toBe(true)
    expect(r1 === a).toBe(false)
    expect(r1).toEqual(a)
  })
  
  it('当参数函数有返回时，map 方法返回的 pick 对象的数据值应该是返回值', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var v
    var r1 = d.map(function (v, k) {
      return v = k
    })
    v = r1.out().a
    expect(v).toBe('a')
    v = d.out().a
    expect(v).toBe(1)
  })
  
  it('当参数并非函数时，map 方法不执行任何操作', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var r1 = d.map()
    expect(r1).not.toBeDefined()
  })
  
  it('当参数并非函数时，map 方法不执行任何操作', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var r1 = d.map()
    expect(r1).not.toBeDefined()
  })
})