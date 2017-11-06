@delete
Feature: delete function test
    删除帖子功能测试
    author:杜小磊
    date:2017-11-05
    
    Background:用户登录
    Given 用户登录,用户名输入"abcduxiaolei",密码输入"abc4862556",成功登录

    Scenario: 删除发帖功能
        When 导航到要删除的帖子页面
        Then 点击删除按钮，弹出二次确定框，确定后删除成功
    Scenario: 取消删除发帖功能
        When 导航到要删除的帖子页面
        Then 点击删除按钮，弹出二次确定框，取消后删除失败

    @delete1
    Scenario: 取消删除回帖功能
        When 导航到要删除的帖子页面
        Then 点击回帖的删除按钮，弹出二次确定框，取消后删除失败
    Scenario: 删除回帖功能
        When 导航到要删除的帖子页面
        Then 点击回帖的删除按钮，弹出二次确定框，确定后删除成功
        
    
    