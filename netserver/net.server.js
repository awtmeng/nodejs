var net = require('net')

var count = 0,
    users = {};

var server = net.createServer(function(conn){
    conn.write(
        '\n > welcome to node-chat'
        + '\n > ' +count+'other people are connected at this time'
        + '\n > please write your name and press enter:'
    )
    count++;
    console.log('new connection')


    conn.setEncoding('utf8');

    var nickname;

    conn.on('close', function(){
        count--;
        broadcast( nickname + ' left the room' )
    })

    function broadcast(msg, exceptMyself){
        for(var i in users){
            if(!exceptMyself || i != nickname){
                users[i].write(msg)
            }
        }
    }


    conn.on('data', function(data){
        //删除回车符
        data = data.replace('\r\n', '');
        if(!nickname){
            if(users[data]){
                conn.write('nickname already in use, try again:')
                return;
            }else{
                nickname = data;
                users[nickname] = conn;

                for(var i in users){
                    users[i].write(nickname + 'joined the room')
                    if(i != nickname){
                        users[i].write(nickname + ':' + data)
                    }
                }
            }
        }

        broadcast(nickname + ' joined the room')
    })
})

server.listen(3000, function(){
    console.log('server listening on 3000')
})