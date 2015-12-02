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
    
    function get (key) {
      return data[key]
    }
    
    function set (k, v) {
      data[k] = v
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
      extendTo: extendTo
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