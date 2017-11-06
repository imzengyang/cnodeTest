let { defineSupportCode } = require('cucumber');
let UserAction = require('../UIAction/UserAction');
let assert = require('assert');
defineSupportCode(function ({ Given, When, Then }) {
    When('点击登录按钮，跳转到登录页面，登录页面左上角有{string}标签', async function (string) {
        this.driver.findElement({ css: ' li:nth-child(6) > a' }).click();
        let text = await this.driver.findElement({ css: 'li.active' }).getText();
        console.log(text);
        return assert.deepEqual(text, string);
    });
    When('导航到登录页面', function () {
        return this.driver.findElement({ css: ' li:nth-child(6) > a' }).click();
    });
    Then('用户名输入{string},密码输入{string},点击登录按钮，登录成功，跳转首页，页面有{string}个人信息', async function (string, string2, string3) {
        return await UserAction.userLogin(this.driver, string, string2, string3);
    });

    Then('用户名输入{string},密码输入{string},点击登录按钮，得到错误提示{string}',async function (string, string2, string3) {
        return await UserAction.userLogin(this.driver, string, string2, string3, "error");
    });
    // Then('用户名输入{string},密码输入{string}', function (string, string2) {
    //     this.driver.findElement({ id: 'name' }).sendKeys(string);
    //     return this.driver.findElement({ id: 'pass' }).sendKeys(string2);
    // });
    // Then('点击登录按钮，登录成功，跳转首页，页面有{string}个人信息', async function (string) {
    //     this.driver.findElement({ css: '.span-primary' }).click();
    //     let text1 = await this.driver.findElement({ css: 'div > span.user_name > a' }).getText();
    //     return assert.deepEqual(text1, string);
    // });
    Then('点击登录按钮，得到错误提示{string}', async function (string) {
        this.driver.findElement({ css: '.span-primary' }).click();
        let text2 = await this.driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(text2, string);
    });

    Then('点击忘记密码按钮，跳转的页面是否有{string}标签', async function (string) {
        this.driver.findElement({ id: 'forgot_password' }).click();
        let text3 = await this.driver.findElement({ css: '.active' }).getText();
        return assert.deepEqual(text3, string);
    });
    Then('点击忘记密码按钮，跳转到找回密码页面', function () {
        return this.driver.findElement({ id: 'forgot_password' }).click();
    });
    Then('邮箱输入{string}', function (string) {
        return this.driver.findElement({ id: 'email' }).sendKeys(string);
    });

    Then('点击提交按钮，得到提示信息{string}', async function (string) {
        this.driver.findElement({ css: '.span-primary' }).click();
        let text4 = await this.driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(text4, string);
    });
})
