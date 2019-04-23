var net = require('net');


function checkHost(host, callback) {
    for (port = 1; port <= 10000; port++) { 

        (function(){ portCheck(host, port, callback)})();
    }
}

function portCheck(host, port, callback)
{
    var socket = new net.Socket(), status = null;
    socket.on('connect', function() {status = 'open';socket.end();});
    socket.setTimeout(1500);
    socket.on('timeout', function() {status = 'closed';socket.destroy();});
    socket.on('error', function(exception) {status = 'closed';});
    socket.on('close', function(exception) {callback(null, status,host,port);});
    socket.connect(port, host);
}


function scanCallback(error, status, host, port){
    if(status == "open"){
        console.log("Reader found: ", host, port, status);
    }
}


function singleHost() {
    checkHost('10.1.1.1', scanCallback);
}


function multiHost() {
    var list = ['10.1.1.1','10.1.1.2'];

    for(var i in list){
        checkHost(list[i], scanCallback);
    }
}

//Single host - returns ports ok - if others commented out
setTimeout(singleHost, 100);

// List with two hosts -- they both return nil
setTimeout(multiHost, 5000);
