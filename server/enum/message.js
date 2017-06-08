/**
 * Created by Hazerfox on 08/06/2017.
 */
'use strict';

var msg = {error:[],success:[]};
//attribute when error triggered ?
var message = {
    init : function (){
        msg = {};
    },
    error : function(err){
        msg.error += err;
    },
    success : function (val) {
        msg.success += val;
    },
    send : function () {
        return msg;
    }
};

module.exports = message;