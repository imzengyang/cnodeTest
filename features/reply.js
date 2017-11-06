let { defineSupportCode } = require('cucumber');
let assert = require('assert');
defineSupportCode(function ({ Given, When, Then }) {
    When('导航到回帖页面', function () {
        return this.driver.findElement({ css: '#topic_list > div:nth-child(1) > div > a' }).click();
    });
    Then('点击照片输入路径{string} ，输入内容{string}', async function (string, string2) {
        this.driver.findElement({ css: '.eicon-image' }).click();
        this.driver.findElement({ name: 'file' }).sendKeys(string);
        this.driver.sleep(2 * 1000);
        this.driver.findElement({ css: '.CodeMirror-scroll' }).click();
        let text = await this.driver.findElement({ css: 'div.CodeMirror-scroll > div:nth-child(2)' });
        return this.driver.actions().mouseMove(text).sendKeys(string2).perform();

    });
    Then('直接点击回帖按钮，得到提示信息{string}', async function (string) {
        this.driver.findElement({ css: '.submit_btn' }).click();
        let text3 = await this.driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(text3, string);
    });
    Then('回帖成功，跳转的页面含有{string}', async function (string) {
        this.driver.findElement({ css: '.submit_btn' }).click();
        let text2 = await this.driver.findElement({ xpath: '//*[@id="content"]/div[2]/div[1] ' }).getText();
        console.log(text2);
        return assert.deepEqual(text2, string);
    });

})