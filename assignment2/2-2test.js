const fs = require('fs');
const path = require('path');

function readFiles(dirPath){
    fs.readdir(dirPath, (err, files) => {
        if(err){
            console.error('Error reading directory:', err);
            return;
        }
        files.forEach(file => {
            const fullPath = path.join(dirPath, file);
            
            fs.stat(fullPath, (err, stats) => {
                if(err) throw err;
                if(stats.isDirectory()){
                    readFiles(fullPath);
                }
                else if(stats.isFile()){
                    if(path.extname(file) == '.js'){
                        const relativePath = path.relative('/Users/byungjuchoi/Desktop/3-1/KWEB', fullPath);
                        console.log(relativePath);
                    }
                    
                }
            });
        });
    });
}

readFiles('/Users/byungjuchoi/Desktop/3-1/KWEB/test');