let { defineSupportCode } = require('cucumber');
let assert = require('assert');
defineSupportCode(function ({ Given, When, Then }) {
    When('导航到要删除的帖子页面', function () {
        return this.driver.findElement({ css: '#topic_list > div:nth-child(1) > div > a' }).click();
    });
    Then('点击删除按钮，弹出二次确定框，确定后删除成功', function () {
        this.driver.findElement({ css: '.fa-lg.fa-trash' }).click();
        return this.driver.switchTo().alert().accept();
        // let alert = await this.driver.switchTo().alert().getText();
    });
    Then('点击删除按钮，弹出二次确定框，取消后删除失败', function () {
        this.driver.findElement({ css: '.fa-lg.fa-trash' }).click();
        return this.driver.switchTo().alert().dismiss(); 
      });
      Then('点击回帖的删除按钮，弹出二次确定框，取消后删除失败', function () {
        this.driver.findElement({ css: 'div.user_action > a.delete_reply_btn' }).click();
        return this.driver.switchTo().alert().dismiss();
      });
      Then('点击回帖的删除按钮，弹出二次确定框，确定后删除成功', function () {
        this.driver.findElement({ css: 'div.user_action > a.delete_reply_btn' }).click();
        return this.driver.switchTo().alert().accept();
      });
})