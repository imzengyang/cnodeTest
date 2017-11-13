@register
Feature: register function test
    注册不同场景的功能测试
    author:杜小磊
    date:2017-11-04
    Background:
    Given 进入首页

    Scenario: 点击注册按钮是否跳转到正确的注册页面
        When 点击注册按钮，跳转到注册页面，注册页面左上角有'注册'标签
    @register1    
    Scenario: 输入正确的注册信息，成功登录
        When 导航到注册页面
        Then 用户名输入'123457',密码输入'123',确认密码输入'123',邮箱输入'123456@qq.com',点击提交按钮，注册成功，提示,'欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
     
    @register2
    Scenario Outline: 注册失败，得到提示信息
        When 导航到注册页面
        Then 用户名输入'<username>',密码输入'<pass>',确认密码输入'<re_pass>',邮箱输入'<email>',点击注册的按钮，得到提示'<message>'
        Examples:
        |username|pass|re_pass|email|message|
        |123456|123|123|123456@qq.com|用户名或邮箱已被使用。|
        |      |123|123|123@123.com|信息不完整。|
        |1|1|1|1@1.com|用户名至少需要5个字符。|
        |11111|123|123|123qq.com|邮箱不合法。|
    @register3
    Scenario: 输入正确的注册信息，成功登录
        When 导航到注册页面
        Then 用户名输入'123457',密码输入'123123',确认密码输入'123123',邮箱输入'123456@qq.com',点击提交按钮，注册成功，提示,'欢迎加入 Nodeclub！我们已给您的注册邮箱发送了一封邮件，请点击里面的链接来激活您的帐号。'
        Then 链接数据库，激活邮箱
        Then 用刚才输出的密码'123123'可以成功登录
    

    