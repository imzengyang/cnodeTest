let {defineSupportCode}=require('cucumber');
defineSupportCode(function({setDefaultTimeout}){
    console.log('set timeout');
    setDefaultTimeout(60*1000);
})