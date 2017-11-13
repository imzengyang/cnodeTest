let { defineSupportCode } = require('cucumber');
let assert = require('assert');

let {postAtopic} =require('../uiAction/action')
defineSupportCode(function ({ Given, When, Then }) {
    Given('用户登录,用户名输入{string},密码输入{string},成功登录', function (string, string2) {
        this.driver.get('http://118.31.19.120:3000/');
        this.driver.findElement({ css: 'ul > li:nth-child(6) > a' }).click();
        this.driver.findElement({ id: 'name' }).sendKeys(string);
        this.driver.findElement({ id: 'pass' }).sendKeys(string2);
        return this.driver.findElement({ css: ".span-primary" }).click();
    });
    When('点击发布话题，跳转到发帖页面，左上角有{string}标签', async function (string) {
        this.driver.findElement({ css: '#create_topic_btn > span' }).click();
        let text = await this.driver.findElement({ css: 'li.active' }).getText();
        console.log(text);
        return assert.deepEqual(text, string);
    });
    When('导航到发帖页面', function () {
        return this.driver.findElement({ css: '#create_topic_btn > span' }).click();
    });

    let tab,title,imageFileName,content;
    Then('板块选择{string},标题输入{string},点击照片输入路径{string} ，输入内容{string}', async function (string, string2, string3, string4) {
        tab = string;
        title =string2;
        imageFileName = string3;
        content = string4;
      
        // let tab = string;
        // switch (tab) {
        //     case "请选择":
        //         this.driver.findElement({ css: '#tab-value>option:nth-child(1)' }).click();
        //         break;
        //     case "分享":
        //         this.driver.findElement({ css: '#tab-value>option:nth-child(2)' }).click();
        //         break;
        //     case "问答":
        //         this.driver.findElement({ css: '#tab-value>option:nth-child(3)' }).click();
        //         break;
        //     case "招聘":
        //         this.driver.findElement({ css: '#tab-value>option:nth-child(4)' }).click();
        //         break;

        //     default:
        //         break;
        // }
        // this.driver.findElement({ id: 'title' }).sendKeys(string2);
        // this.driver.findElement({ css: '.eicon-image' }).click();
        // this.driver.findElement({ name: 'file' }).sendKeys(string3);
        // this.driver.sleep(2 * 1000);
        // this.driver.findElement({ css: '.CodeMirror-scroll' }).click();
        // let text = await this.driver.findElement({ css: 'div.CodeMirror-scroll > div:nth-child(2)' });
        // return this.driver.actions().mouseMove(text).sendKeys(string4).perform();
    });
    Then('点击提交按钮，跳转到首页，得到新的话题标题{string}', async function (string) {
        this.driver.findElement({ css: '.submit_btn' }).submit();
        let title = await this.driver.findElement({ css: 'div.header.topic_header > span' }).getText();
        return assert.deepEqual(title, string);
    });
    Then('板块选择{string},标题输入{string} ，输入内容{string}', async function (string, string2, string3) {
        let tab = string;
        switch (tab) {
            case "请选择":
                this.driver.findElement({ css: '#tab-value>option:nth-child(1)' }).click();
                break;
            case "分享":
                this.driver.findElement({ css: '#tab-value>option:nth-child(2)' }).click();
                break;
            case "问答":
                this.driver.findElement({ css: '#tab-value>option:nth-child(3)' }).click();
                break;
            case "招聘":
                this.driver.findElement({ css: '#tab-value>option:nth-child(4)' }).click();
                break;

            default:
                break;
        }
        this.driver.findElement({ id: 'title' }).sendKeys(string2);
        let text = await this.driver.findElement({ css: '.CodeMirror-scroll' });
        text.click();
        return this.driver.actions().mouseMove(text).sendKeys(string3).perform();
    });
    Then('点击提交按钮，得到错误提示{string}', async function (string) {
        this.driver.findElement({ css: '.submit_btn' }).submit();
        let text1 = await this.driver.findElement({ css: 'strong' }).getText();
        return assert.deepEqual(text1, string);
    });
    Then('板块选择{string},标题输入{string},输入内容{string}', async function (string, string2, string3) {
        let tab = string;
        switch (tab) {
            case "请选择":
                this.driver.findElement({ css: '#tab-value>option:nth-child(1)' }).click();
                break;
            case "分享":
                this.driver.findElement({ css: '#tab-value>option:nth-child(2)' }).click();
                break;
            case "问答":
                this.driver.findElement({ css: '#tab-value>option:nth-child(3)' }).click();
                break;
            case "招聘":
                this.driver.findElement({ css: '#tab-value>option:nth-child(4)' }).click();
                break;

            default:
                break;
        }
        this.driver.findElement({ id: 'title' }).sendKeys(string2);
        let text = await this.driver.findElement({ css: '.CodeMirror-scroll' });
        text.click();
        return this.driver.actions().mouseMove(text).sendKeys(string3).perform();
    });
    Then('点击提交按钮，跳出弹出框：{string}', async function (string) {
        this.driver.findElement({ css: '.submit_btn' }).submit();
        let alert = await this.driver.switchTo().alert().getText();
        console.log(alert);
        return assert.deepEqual(alert, string);
    });

    Then('点击提交按钮，成功或失败{string}，成功跳转到首页，得到新的话题标题, 失败得到失败信息{string}', async function (postState,assertErromsg) {
     
        return await postAtopic(this.driver,tab,title,imageFileName,content,postState,assertErromsg)
    });
})