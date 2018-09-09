(function () {
    var encode = function(val){
        return encodeURIComponent(val);
    }
    
    var decode = function(val){
        return decodeURIComponent(val);
    }

    exports.encode = encode;
    exports.decode = decode;
})();