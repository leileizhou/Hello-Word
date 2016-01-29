define(['jssha'],function(jsSHA){
	var sign = {};
  var deferred = $.Deferred();
  sign['getSigned'] = function(jsapi_ticket, url){
    var ret = {
      jsapi_ticket: jsapi_ticket,
      nonceStr: createNonceStr(),
      timestamp: createTimestamp(),
      url: url
    };
    var string = raw(ret);

      jsSHA = require('jssha');
      shaObj = new jsSHA(string, 'TEXT');
      ret.signature = shaObj.getHash('SHA-1', 'HEX');
    return ret;
  }
  sign['ret'] = sign['getSigned']('jsapi_ticket', 'http://example.com');
  deferred.resolve(sign);
	return deferred;
});
