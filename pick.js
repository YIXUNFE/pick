"use strict"
;(function () {  
  var pick = function (data) {
    if (Object.prototype.toString.apply(data) !== '[object Object]') {
      data = {}
    }
    
    function check () {
      var i = 0,
        l = arguments.length,
        result = true
      for (i; i < l; i++) {
        if (typeof data[arguments[i]] === 'undefined') {
          result = false
          break
        }
      }
      return result
    }
    
    function length () {
      var length = 0, item
      for (item in data) {
        length++
      }
      return length
    }
    
    function map (fn) {
      var item, v
      for (item in data) {
        v = fn(data[item], item)
        data[item] = (typeof v === 'undefined' ? data[item] : v)
      }
      return this
    }
    
    function filter (fn) {
      var item, temp = {}
      for (item in data) {
        if (fn(data[item], item)) {
          temp[item] = data[item]
        }
      }
      return pick(temp)
    }
    
    function extend (obj) {
      if (Object.prototype.toString.apply(obj) !== '[object Object]') {
        return data
      }
      
      var item
      for (item in obj) {
        data[item] = obj[item]
      }
      
      return data
    }
    
    function extendTo (obj) {
      if (Object.prototype.toString.apply(obj) !== '[object Object]') {
        return {}
      }
      
      var item
      for (item in data) {
        obj[item] = data[item]
      }
      
      return obj
    }
    
    function copy () {
      var item, obj = {}
      for (item in data) {
        obj[item] = data[item]
      }
      return obj
    }
    
    function destroy () {
      var item
      for (item in this) {
        delete this[item]
      }
      data = null
    }
    
    function get () {
      var i = 0,
        l = arguments.length,
        temp = {},
        result
      for (i; i < l; i++) {
        temp = temp[arguments[i]] || data[arguments[i]]
      }
      return temp
    }
    
    function set () {
      var i = 0,
        l = arguments.length - 2,
        obj = null,
        temp = {},
        result,
        f = false,
        path = ''
      for (i; i < l; i++) {
        path = arguments[i]
        if (i === 0) {
          !data[path] && (data[path] = {})
          temp = data[path]
        } else {
          !temp[path] && (temp[path] = {})
          temp = temp[path]
        }
      }
      temp[arguments[i]] = arguments[i + 1]
      return data
    }
    
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
