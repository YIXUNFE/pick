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
  
  it("当数据值未定义时，check 方法将返回 false", function() {
    var a = {a: window.undefined}
    var d = pick(a)
    var r1 = d.check('a')
    
    expect(r1).toBe(false)
  })
})
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
describe('测试 get 方法', function() {
  it('传入一个或多个字符串时，应该返回满足该层级关系的值，没有满足的返回 undefined', function() {
    var a = {a: 1, b: 2, c: 3, x: {y: {z: 0}}}
    var d = pick(a)
    
    expect(d.get('b')).toBe(2)
    expect(d.get('a', 'b')).not.toBeDefined()
    expect(d.get('x', 'y', 'z')).toBe(0)
    expect(d.get('x', 'y')).toEqual({z: 0})
  })
  
  it('未传入参数时，应该返回 undefined', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    
    expect(d.get()).not.toBeDefined()
  })
  
  it('传入非字符串参数时，应该会被转换成字符串类型', function() {
    var a = {'0': 1, 'null': 3}
    var d = pick(a)
    
    expect(d.get(0)).toBe(1)
    expect(d.get(null)).toBe(3)
  })
})
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
describe('测试 set 方法', function() {
  it('传入一个或多个字符串时，应该设置满足该层级关系的值', function() {
    var a = {a: 1, b: 2, c: 3, x: {y: {z: 0}}}
    var d = pick(a)
    d.set('a', 100)
    d.set('x', 'y', 'z', 99)
    expect(d.get('a')).toBe(100)
    expect(d.get('x', 'y', 'z')).toBe(99)
  })
  
  it('没有对应层级关系时，应该添加所指定的层级关系并赋值', function() {
    var a = {a: 1, b: 2, c: 3}
    var d = pick(a)
    d.set('a', 'd', 1)
    d.set('b', 'e', 2)
    expect(d.get('a', 'd')).toBe(1)
    expect(d.get('b', 'e')).toBe(2)
  })
  
  it('传入非字符串参数时，应该会被转换成字符串类型', function() {
    var a = {'0': 1, 'null': 3}
    var d = pick(a)
    d.set(0, 100)
    d.set(null, 100)
    expect(d.get('0')).toBe(100)
    expect(d.get('null')).toBe(100)
  })
})