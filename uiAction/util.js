
let path = require('path');
let fs = require('fs');

let getImageFilesPath = function(){
    return getrootPath() +"/imagefiles"
}

let getrootPath = function (){
    let rootpath = path.resolve(__dirname);
    while (rootpath) {
        if(fs.existsSync(rootpath+'/package.json')){
            break;
        }
        rootpath = rootpath.substring(0,rootpath.lastIndexOf(path.sep));
    }
    return rootpath;
}

let getScreenshotsDir = function(){
    let rootpath = getrootPath();
    let screenShotDir = rootpath+"/screenshots";
    if(! fs.existsSync(screenShotDir)){
        fs.mkdirSync(screenShotDir)
    }
    return screenShotDir;
}


console.log(getImageFilesPath())

module.exports.getrootPath = getrootPath;
module.exports.getScreenshotsDir = getScreenshotsDir;
module.exports.getImageFilesPath = getImageFilesPath;