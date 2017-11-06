

let assert = require('assert');
let userLogin = async function(driver, username,password,assertVal,userstatus){
    await driver.findElement({ id: 'name' }).sendKeys(username);
    await driver.findElement({ id: 'pass' }).sendKeys(password)
    await driver.findElement({ css: '.span-primary' }).click();
    
    if (userstatus == "error"){
        let text2 = await driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(text2, assertVal);
    }else{
        let text1 = await driver.findElement({ css: 'div > span.user_name > a' }).getText();
        return assert.deepEqual(text1, assertVal);
    }
}

let userRegister = async function(driver,username,pass,repass,email,assertVal,userstatus){
    let now = new Date().valueOf();
   
    await driver.findElement({ id: 'pass' }).sendKeys(pass);
    await driver.findElement({ id: 're_pass' }).sendKeys(repass);

    if (userstatus == "error"){
        await driver.findElement({ id: 'loginname' }).sendKeys(username);
        await driver.findElement({ id: 'email' }).sendKeys(email);
        driver.findElement({ css: '.span-primary' }).click();
        let arrtip = await driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(assertVal, arrtip);
    }else{
        await driver.findElement({ id: 'loginname' }).sendKeys(username+now);
        await driver.findElement({ id: 'email' }).sendKeys(now+email);
        driver.findElement({ css: '.span-primary' }).click();
        let suc = await driver.findElement({ css: 'strong' }).getText();
        
        return assert.deepEqual(suc, assertVal);
    }
    
}


exports.userLogin = userLogin;
exports.userRegister = userRegister;