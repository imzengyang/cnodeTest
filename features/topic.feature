@topic
Feature: posted  function test
    发帖功能测试
    author:杜小磊
    date:2017-11-05
    
    Background:用户登录
    Given 用户登录,用户名输入"abcduxiaolei",密码输入"abc4862556",成功登录

    Scenario: 验证是否正确跳转到发帖页面
        When 点击发布话题，跳转到发帖页面，左上角有'发布话题'标签
    @topic1
    Scenario Outline: 选择不同板块，发帖成功 
        When 导航到发帖页面
        Then  板块选择'<plate>',标题输入'<title>',点击照片输入路径'<path>' ，输入内容'<content>' 
        Then 点击提交按钮，跳转到首页，得到新的话题标题'<title>'
        Examples:
        |plate|title|path|content|title|
        |分享|今日是周末，大家学习了吗|E://01.png|明天要上班啦，你准备好了吗？|今日是周末，大家学习了吗|
        |问答|大家好，今天你学习了吗|E://01.png|大家好，今天你学习了吗？|大家好，今天你学习了吗|
        |招聘|招聘美女一枚，做饭洗衣服|E://01.png|招聘美女一枚，要求全能型人才|招聘美女一枚，做饭洗衣服|
    
    @topic2
    Scenario Outline: 发帖失败，异常场景
        When 导航到发帖页面
        Then 板块选择'<plate>',标题输入'<title>' ，输入内容'<content>'
        Then 点击提交按钮，得到错误提示'<message>'
        Examples:
        |plate|title|content|message|
        |分享|你好|11111111|标题字数太多或太少。|
        |分享||22222222|标题不能是空的。|
        |分享|12345678901||内容不可为空|

    @topic3
    Scenario: 板块默认请选择的情况
        When 导航到发帖页面
        Then 板块选择'请选择',标题输入'6666666666',输入内容'888888888'
        Then 点击提交按钮，跳出弹出框：'必须选择一个版块！'
    
    