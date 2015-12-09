"use strict"
;(function () {  
  var debugMode = true,
    log = function (str) {
      window.console && console.log(str)
    }

  var pick = function (data) {
    if (Object.prototype.toString.apply(data) !== '[object Object]') {
      data = {}
    }
    
    /**
     * check 方法会返回数据中是否具有对应的属性
     * @type {Function} 
     * @param {String|Function [, String|Function, ...]} 一个或多个字符串参数，表示对应的层级关系。该方法支持参数以函数形式传入。
     * @return {Boolean} 返回一个布尔值
     **/
    function check () {
      var i = 0,
        l = arguments.length,
        temp = data,
        num = 0,
        path = ''
      for (i; i < l; i++) {
        path = (typeof arguments[i] !== 'function' ? arguments[i] : arguments[i]()) + ''
        if (!temp.hasOwnProperty || !temp.hasOwnProperty(path)) break
        temp = temp[path]
        num++
      }
      
      return num === l
    }
    
    /**
     * length 方法返回数据
     * @type {Function} 
     * @return {Number} 返回一个 pick 对象的数据中子属性个数
     **/
    function length () {
      var length = 0, item
      for (item in data) {
        length++
      }
      return length
    }
    
    /**
     * map 方法会遍历数据并返回一个新的 pick 对象
     * @type {Function} 
     * @param {Function} 遍历过程中执行的函数，返回值会被赋值给新数据，没有返回值则使用原数据值
     * @return {Object} 返回一个新的 pick 对象
     **/
    function map (fn) {
      if (typeof fn !== 'function') {log('filter 方法中参数类型错误，期望是一个函数'); return}
      var item, v, temp = {}
      for (item in data) {
        v = fn(data[item], item)
        //如果不存在返回值则使用原数据的值
        temp[item] = (typeof v === 'undefined' ? data[item] : v)
      }
      return pick(temp)
    }
    
    /**
     * filter 方法会遍历数据并返回一个满足参数函数（即一个谓词函数）的 pick 对象
     * @type {Function} 
     * @param {Function} 遍历过程中执行的函数，返回值为 true 时的数据会赋值给新数据
     * @return {Object} 返回一个 pick 对象
     **/
    function filter (fn) {
      if (typeof fn !== 'function') {log('filter 方法中参数类型错误，期望是一个函数'); return}
      var item, temp = {}
      for (item in data) {
        if (fn(data[item], item) === true) {
          temp[item] = data[item]
        }
      }
      return pick(temp)
    }
    
    /**
     * extend 方法会将参数合并到原数据中，并返回调用该方法的 pick 对象；pick 对象的原数据会发生修改
     * @type {Function} 
     * @param {Object} 需要被合并的对象
     * @return {Object} 返回自身 pick 对象
     **/
    function extend (obj) {
      if (Object.prototype.toString.apply(obj) !== '[object Object]') {
        log('extend 方法只接收对象类型数据')
        return this
      }
      
      var item
      for (item in obj) {
        data[item] = obj[item]
      }
      
      return this
    }
    
    /**
     * extendTo 方法会将原数据合并到新数据中，并返回新数据的 pick 对象；调用该方法的 pick 对象的原数据不会发生修改
     * @type {Function} 
     * @param {Object} 新数据
     * @return {Object} 返回一个新数据的 pick 对象
     **/
    function extendTo (obj) {
      if (Object.prototype.toString.apply(obj) !== '[object Object]') {
        log('extendTo 方法只接收对象类型数据')
        return pick()
      }
      
      var item
      for (item in data) {
        obj[item] = data[item]
      }
      
      return pick(obj)
    }
    
    /**
     * copy 方法返回一个新的 pick 对象，其数据和原数据一致且无引用关系
     * @type {Function} 
     * @return {Object} 返回一个新数据的 pick 对象
     **/
    function copy () {
      var item, obj = {}
      for (item in data) {
        obj[item] = data[item]
      }
      return pick(obj)
    }
    
    /**
     * destroy 方法会删除 pick 对象的所有方法
     * @type {Function} 
     * @return {Object} 返回 pick 对象的数据
     **/
    function destroy () {
      var item
      for (item in this) {
        delete this[item]
      }
      return data
    }
    
    /**
     * get 方法会去查找 pick 对象数据中的值
     * @type {Function} 
     * @param {String|Function [, String|Function, ...]} 一个或多个字符串参数，表示对应的层级关系。该方法支持参数以函数形式传入。
     * @return {*} 返回满足条件的值，没有满足的返回 undefined
     **/
    function get () {
      if (!arguments.length) {log('get 方法需要传入对应的子属性的键'); return}
      var i = 0,
        l = arguments.length,
        temp = data,
        path = '',
        result
      for (i; i < l; i++) {
        path = (typeof arguments[i] !== 'function' ? arguments[i] : arguments[i]()) + ''
        temp = temp[path]
      }
      return temp
    }
    
    /**
     * set 方法可以给 pick 对象的数据设置对应层级关系的值
     * @type {Function} 
     * @param {String|Function, [String|Function, ...,] *} 一个或多个字符串参数，表示对应的层级关系，最后一个参数表示需要设置的值。该方法支持参数以函数形式传入。
     * @return {Object} 返回调用 set 方法的 pick 对象自身
     * @notice 如果设置的层级属性的某个中间属性并非 Object 类型，该属性会被设置为 Object 类型，并继续尝试对其建立子层级
     * 比如 
     * var data = {a: {b: 1}}
     * var p = pick(data)
     * p.set('a', 'b', 'c', 'd', 2).out()
     * 返回 {a: {b: {c: {d: 2}}}}
     **/
    function set () {
      var i = 0,
        l = arguments.length - 2,
        obj = null,
        temp = data,
        result,
        f = false,
        path = '',
        value = ''
      for (i; i < l; i++) {
        path = (typeof arguments[i] !== 'function' ? arguments[i] : arguments[i]()) + ''
        Object.prototype.toString.apply(temp[path]) !== '[object Object]' && (temp[path] = {})
        temp = temp[path]
      }
      path = (typeof arguments[i] !== 'function' ? arguments[i] : arguments[i]()) + ''
      value = typeof arguments[i + 1] !== 'function' ? arguments[i + 1] : arguments[i + 1]()
      temp[path] = value
      return this
    }
    
    /**
     * out 方法返回 pick 对象的数据
     * @type {Function} 
     * @return {Object} 返回 pick 对象的数据
     **/
    function out () {
      return data
    }
    
    return {
      out: out,
      check: check,
      get: get,
      set: set,
      destroy: destroy,
      copy: copy,
      extend: extend,
      extendTo: extendTo,
      map: map,
      filter: filter,
      length: length
    }
  }
  
  if(typeof define === 'function' && define.amd) {
		define([], function () {
			return pick
		})
	} else if (typeof module !== 'undefined' && module.exports) {
		module.exports = pick
	} else {
		window.pick = pick
	}
}())
