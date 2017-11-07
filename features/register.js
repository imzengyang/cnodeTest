let { defineSupportCode } = require('cucumber');
let assert = require('assert');

let UserAction = require('../UIAction/UserAction');


var MongoClient = require('mongodb').MongoClient;

const url = "mongodb://118.31.19.120:27017/node_club_dev";

defineSupportCode(function ({ Given, When, Then }) {
    Given('进入首页', function () {
        return this.driver.get('http://118.31.19.120:3000/');
    });
    When('点击注册按钮，跳转到注册页面，注册页面左上角有{string}标签', async function (string) {
        this.driver.findElement({ css: ' div.navbar > div > div > ul > li:nth-child(5) > a' }).click();
        let text = await this.driver.findElement({ css: 'li.active' }).getText();
        console.log(text);
        return assert.deepEqual(text, string);
    });
    When('导航到注册页面', function () {
        return this.driver.findElement({ css: 'body > div.navbar > div > div > ul > li:nth-child(5) > a' }).click();
    });
    let registerUserName,registerUserEmail;
    Then('用户名输入{string},密码输入{string},确认密码输入{string},邮箱输入{string}点击提交按钮，注册成功，提示,{string}', async function (string, string2, string3, string4, string5) {
        let nowtime = new Date().valueOf();
        registerUserName = string+nowtime;
        registerUserEmail = nowtime+string4;
        return UserAction.userRegister(this.driver, registerUserName, string2, string3, registerUserEmail, string5)
    });

    When('用户名输入{string},密码输入{string},确认密码输入{string},邮箱输入{string}点击注册的按钮，得到提示{string}', async function (string, string2, string3, string4, string5) {
        return UserAction.userRegister(this.driver, string, string2, string3, string4, string5, "error");
    });

    Then('修改数据库,激活用户', async function () {
        MongoClient.connect(url, function (err, db) {
            assert.equal(null, err);
            console.log("Connected correctly to server");
            let collection = db.collection("users")
            collection.updateOne({ name: `${registerUserName}` }, { $set: { "active": true } }, function (err, docs) {
                assert.equal(null, err);
                //console.log(docs)
            })
            db.close();
        });
    });

    Then('使用刚才注册的用户密码为{string}应该可以正确登录', async function (password) {
        await this.driver.get("http://118.31.19.120:3000/signin");
        return UserAction.userLogin(this.driver,`${registerUserName}`,password,`${registerUserName}`);
    });

})
