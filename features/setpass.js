let { defineSupportCode } = require('cucumber');
let assert = require('assert');
defineSupportCode(function ({ Given, When, Then }) {
    When('导航到更改密码页面', function () {
        this.driver.findElement({ css: 'li:nth-child(6) > a' }).click();
    });
    Then('当前密码输入{string},新密码输入{string}', function (string, string2) {
        this.driver.findElement({ id: 'old_pass' }).sendKeys(string);
        this.driver.findElement({ id: 'new_pass' }).sendKeys(string2);
    });
    Then('点击更改密码按钮，得到提示{string}', async function (string) {
        this.driver.findElement({ css: '#change_pass_form > div.form-actions > input' }).click();
        let text = await this.driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(text, string);
    });
    Then('点击更改密码按钮，得到错误提示{string}',async function (string) {
        this.driver.findElement({ css: '#change_pass_form > div.form-actions > input' }).click();
        let text1 = await this.driver.findElement({ css: 'body' }).getText();
        return assert.deepEqual(text1, string);
      });
})