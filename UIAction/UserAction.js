
let LoginPage = require('../compants/loginPage')
let RegisterPage = require('../compants/registerPage')
let assert = require('assert');
let userLogin = async function(driver, username,password,assertVal,userstatus){
    await driver.findElement(LoginPage.userName).sendKeys(username);
    await driver.findElement(LoginPage.password).sendKeys(password)
    await driver.findElement(LoginPage.LoginBtn).click();
    
    if (userstatus == "error"){
        let text2 = await driver.findElement(LoginPage.errorInfo).getText();
        return assert.deepEqual(text2, assertVal);
    }else{
        let text1 = await driver.findElement(LoginPage.sucessInfo).getText();
        return assert.deepEqual(text1, assertVal);
    }
}

let userRegister = async function(driver,username,pass,repass,email,assertVal,userstatus){

    await driver.findElement(RegisterPage.pass).sendKeys(pass);
    await driver.findElement(RegisterPage.repass).sendKeys(repass);

    if (userstatus == "error"){
        await driver.findElement(RegisterPage.username).sendKeys(username);
        await driver.findElement(RegisterPage.email).sendKeys(email);
        driver.findElement(RegisterPage.registerBtn).click();
        let arrtip = await driver.findElement(RegisterPage.errorInfo).getText();
        return assert.deepEqual(assertVal, arrtip);
    }else{
        await driver.findElement(RegisterPage.username).sendKeys(username);
        await driver.findElement(RegisterPage.email).sendKeys(email);
        driver.findElement(RegisterPage.registerBtn).click();
        let suc = await driver.findElement(RegisterPage.sucessInfo).getText();
        
        return assert.deepEqual(suc, assertVal);
    }
    
}


exports.userLogin = userLogin;
exports.userRegister = userRegister;