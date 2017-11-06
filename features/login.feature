@login
Feature: login function test
    登录功能测试
    author:杜小磊
    date：2017-11-04

    Background:
    Given 进入首页
    Scenario: 点击登录是否跳转到登录页面
        When 点击登录按钮，跳转到登录页面，登录页面左上角有'登录'标签
    @login1    
    Scenario: 输入有效的用户名和密码成功登录
        When 导航到登录页面
        Then 用户名输入'abcduxiaolei',密码输入'abc4862556',点击登录按钮，登录成功，跳转首页，页面有'abcduxiaolei'个人信息
    @login2
    Scenario Outline: 不同场景的登录失败，得到提示信息
        When 导航到登录页面
        Then 用户名输入'<username>',密码输入'<pass>',点击登录按钮，得到错误提示'<message>'
        Examples:
        |username|pass|message|
        ||123|信息不完整。|
        |123|123|用户名或密码错误|

    @forget
    Scenario: 点击忘记密码跳转的页面是否正确
        When 导航到登录页面
        Then 点击忘记密码按钮，跳转的页面是否有'找回密码'标签
    
    @forget1    
    Scenario Outline: 忘记密码功能
        When 导航到登录页面
        Then 点击忘记密码按钮，跳转到找回密码页面
        Then 邮箱输入'<email>'
        Then 点击提交按钮，得到提示信息'<message>'
        Examples:
        |email|message|
        |506615839@qq.com|我们已给您填写的电子邮箱发送了一封邮件，请在24小时内点击里面的链接来重置密码。|
        ||邮箱不合法|
        |123.com|邮箱不合法|
        |123@123.com|没有这个电子邮箱。|
        
    
    
    

    