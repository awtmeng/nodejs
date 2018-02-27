var fs = require('fs')

fs.readdir(__dirname, function(err, files){
    console.log(files)
})

/*标准输出*/
process.stdout.write('abc')

/*标准输入*/
process.stdin.write('bca')

/*标准错误*/
process.stderr.write('cab')

fs.readdir(process.cwd(), function(err, files){
    console.log('  ')

    if(!files.length) {
        return console.log('\033[31m no files to show! \033[39m\n')
    }

    console.log('select which file or directory you want to see \n')

    var fs = require('fs'),
    stdin = process.stdin,
    stdout = process.stdout,
    stats = [];

    function file(i){
        var filename = files[i];
        fs.stat(__dirname + '/' + filename, function(err, stat){
            stats[i] = stat;
            if(stat.isDirectory()){
                console.log(i+ filename)
            }else{
                console.log(i + filename)
            }

            if(++i == files.length){
                read();
            }else{
                file(i);
            }
        })
    }

    function read(){
        console.log('')
        stdout.write('enter your choice:')
        stdin.resume();
        stdin.setEncoding('utf8');
        stdin.on('data', option)
    }

    function option(data) {
        var filename = files[Number(data)]
        if(!filename){
            stdout.write('enter your choice:')
        }else{
            stdin.pause();
            if(stats[Number(data)].isDirectory()) {
                fs.readdir(__dirname + '/' + filename, function(err, files){
                    console.log('');
                    console.log('   (' + files.length + ' files)')
                    files.forEach(function(file){
                        console.log('  -  ' + file);
                    })
                    console.log('')
                })
            }else{
                fs.readFile(__dirname + '/' + filename, 'utf8', function(err, data){
                    console.log('');
                    console.log(data.replace(/(.*)/g, '    $1'))
                })
            }
        }
    }


    file(0)
})

//var stream = fs.createReadStream('my-file.txt');
var fs = require('fs');

var files = fs.readdirSync(process.cwd());
files.forEach(function(file){
    if(/\.css/.test(file)){
        fs.watchFile(process.cwd() + '/' +file, function(){
            console.log(' - ' +file+ ' changed! ')
        })
    }
})
