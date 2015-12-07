describe('测试 map 方法', function() {
  it('在谓词函数中修改值，检查返回数据', function() {
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
  
  it('在谓词函数中修改键，检查返回数据', function() {
    var a = {a: 1, b: 2, c: 3},
      b = {a: {b: {c: 1}}}
      
    var r1 = pick(a).map(function (v, k) {
      return k + '_string'
    }).out()
    
    var r2 = pick(b).map(function (v, k) {
      return k.toUpperCase()
    }).out()
    
    var item = '',
      i = 0,
      arr = ['a_string', 'b_string', 'c_string']
    for (item in r1) {
      expect(r1[item]).toBe(arr[i])
      i++
    }
    
    expect(r2.a).toBe('A')
  })
  
  it("when predicate function no return, test return", function() {
    var a = {a: 1, b: 2, c: 3}
      
    var r1 = pick(a).map(function (v, k) {
      v = k
    }).out()
    
    var item = ''
    for (item in r1) {
      expect(typeof r1[item]).toBe('number')
    }
  })
  
  it("when predicate function return or not, test origin data if changed", function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    var r1 = d.map(function (v, k) {
      v = k
    })
    var v = r1.out().a
    expect(v).toEqual(1)
    
    var r2 = d.map(function (v, k) {
      return v = k
    })
    v = r2.out().a
    expect(v).toEqual('a')
  })
})