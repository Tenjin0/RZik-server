/**
 * Created by Hazerfox on 08/06/2017.
 */
'use strict';

var msg = {};
//attribute when error triggered ?
var message = {
    init : function (){
        msg = {};
    },
    error : function (err){
        if(!msg.error){
            msg.error = [];
        }
        msg.error.push(err);
    },
    success : function (val) {
        if(!msg.succes){
            msg.success = [];
        }
        msg.success.push(val);
    },
    send : function () {
        let _msg = msg;
        message.init();
        return _msg;
    }
};

module.exports = message;