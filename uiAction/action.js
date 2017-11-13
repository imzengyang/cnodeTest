let assert = require('assert');
let loginPage=require('../comm/loginPage');
let registerPage=require('../comm/registerPage');
let forgetPage=require('../comm/forgetPage');
let { getImageFilesPath } = require('../uiAction/util')

let path = require('path');

let userRegister = async function (driver, username, pass, repass, email, message, status) {
    await driver.findElement(registerPage.pass).sendKeys(pass);
    await driver.findElement(registerPage.repass).sendKeys(repass);
    if (status == 'error') {
        await driver.findElement(registerPage.username).sendKeys(username);
        await driver.findElement(registerPage.email).sendKeys(email);
        driver.findElement(registerPage.registerBtn).click();
        let arrtip = await driver.findElement(registerPage.errorInfo).getText();
        return assert.deepEqual(message, arrtip);
    } else {
        await driver.findElement(registerPage.username).sendKeys(username);
        await driver.findElement(registerPage.email).sendKeys(email);
        driver.findElement(registerPage.registerBtn).click();
        let suc = await driver.findElement(registerPage.successInfo).getText();
        return assert.deepEqual(suc, message);

    }
}

let userLogin = async function (driver, username, password, message, status) {
    await driver.findElement(loginPage.username).sendKeys(username);
    await driver.findElement(loginPage.password).sendKeys(password);
    driver.findElement(loginPage.loginBtn).click();
    if (status == 'error') {
        let text2 = await driver.findElement(loginPage.errorInfo).getText();
        return assert.deepEqual(text2, message);
    } else {
        let text1 = await driver.findElement(loginPage.successInfo).getText();
        return assert.deepEqual(text1, message);
    }

}

let userForget=async function(driver,email,message){
    await driver.findElement({ id: 'email' }).sendKeys(email);
    driver.findElement({ css: '.span-primary' }).click();
    let text4 = await driver.findElement({ css: 'strong' }).getText();
    return assert.deepEqual(text4, message);
}



let postAtopic = async function(driver,tab,title,imageFileName,content,postState, errormsg){
    console.log("errormsg========",errormsg);
  
    switch (tab) {
        case "请选择":
            driver.findElement({ css: '#tab-value>option:nth-child(1)' }).click();
            break;
        case "分享":
            driver.findElement({ css: '#tab-value>option:nth-child(2)' }).click();
            break;
        case "问答":
            driver.findElement({ css: '#tab-value>option:nth-child(3)' }).click();
            break;
        case "招聘":
            driver.findElement({ css: '#tab-value>option:nth-child(4)' }).click();
            break;

        default:
            break;
    }

    await driver.findElement({id:'title'}).sendKeys(title);
    if(imageFileName !== "null"){
        let imagepath = path.join(getImageFilesPath(), imageFileName);
        await driver.findElement({ css: '.eicon-image' }).click();
        await driver.findElement({ name: 'file' }).sendKeys(imagepath);
        await driver.sleep(2 * 1000);
    }
    
    await driver.findElement({ css: '.CodeMirror-scroll' }).click();
    let text = await driver.findElement({ css: 'div.CodeMirror-scroll > div:nth-child(2)' });
    driver.actions().mouseMove(text).sendKeys(content).perform();

    await driver.findElement({css:".span-primary.submit_btn"}).click();

    if(postState === "success"){
        let asserttitle = await driver.findElement({ css: 'div.header.topic_header > span' }).getText();
        return assert.deepEqual(asserttitle, title);
    }else if(postState === "taberror"){
        let alert = await driver.switchTo().alert().getText();
        console.log("alert ==> ",alert,"errmsg--->",errormsg);
        return assert.deepEqual(alert, errormsg);
    }else {
        let assertErrMsg = await driver.findElement({ css: 'strong' }).getText();
        console.log("assertErrMsg",assertErrMsg);
        return assert.deepEqual(assertErrMsg, errormsg);
    }


}


exports.userRegister = userRegister;
exports.userLogin=userLogin;
exports.userForget=userForget;
exports.postAtopic = postAtopic;