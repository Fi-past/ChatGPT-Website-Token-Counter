### 这是什么

一款统计 https://chat.openai.com/ 网站上对话所消耗token数目，并计算出所需美元/人民币的chrome插件

通俗来讲就是，你想不想知道自己在开通了chatgpt plus或者免费版本中，究竟爆了openai多少的金币

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713528540106-311326f0-f8b3-41ec-8506-a50b4133efa4.png)

### 安装方式

直接Download ZIP

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713516682590-5d7759ed-8998-46a2-8275-5511be4a9c84.png)

或者下载提供的Releases包（请下载Lastest版本的，旧版本可能会携带bug）

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713526846785-c5622944-48b5-4cbe-8d82-be6f1e2c5e85.png)

后解压缩，确保ChatGPT-Website-Token-Counter-main目录下包含如图所示数据

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713526998500-702de7da-d3a6-4096-9e49-ceea970b67a4.png)

打开chrome浏览器，输入chrome://extensions/

确保开启开发者模式

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713527028240-0296d795-ca23-4c7e-9018-0258cae7e6ca.png)

选择加载已解压的扩展程序，选择ZIP解压后的目录

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713527055890-e579f9d7-639e-46b7-8192-050060540fcc.png)

出现如下标识则成功安装

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713527156757-d19a57c7-f7a6-409b-b75b-e80a9c9ed9fb.png)

### 如何使用

本插件只针对 https://chat.openai.com/ 网站生效，在chrome中进入该网址

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713528350475-9a0f8d2e-500d-406b-ba44-7fd674b7c1ab.png)

默认配置如下，注意无论是勾选启用插件还是修改刷新时间，均需要点击保存后，刷新 https://chat.openai.com/ 网站后才能生效

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713528398880-65184a7f-432a-4bf8-b966-f9e37595bdbd.png)

默认配置下等待10s，可以在正下方显示插件结果，随后每10s更新一次token统计

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713528540106-311326f0-f8b3-41ec-8506-a50b4133efa4.png)

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713528503374-29dd3098-4980-446a-bff5-36ffd2932f60.png)

### 一些问题

1. 由于缺失fs模块，gpt-3-encoder中的编码器无法通过webpack打包，在chrome扩展程序中无法直接使用，因此本项目的token估算方式存在一定的误差，但总体上误差不大
2. 本人不会前端，写的很粗糙，大佬有问题可以提issue，也可以提pull request完善这个项目

### 有关后续

不一定会一直维护，但如果有感兴趣的点或者志同道合的开发者可以一起完善这个项目，毕竟项目初衷是为了我的个人兴趣，网上也并没有相关统计chatgpt网站token数目和费用的插件，因此我便自己写了个

如果用的人多我可以注册一下Chrome 应用商店开发者，到时候更新和发布就会容易一些，不用自己手动安装了

如果觉得好用可以帮忙点个star（球球了），虽然是娱乐项目但有些star也会有成就感

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713529248313-101d4a67-0ba6-486d-8b15-99a139f4987f.png)

本着不能同时出钱和出力的原则，加上比较懒的折腾，因此开个众筹（认识我的人就别给我众筹了，太尴尬了，哥们真顶不住），如果钱够了我就去注册Chrome 应用商店开发者，每一笔到账也会记录在下方

![img](https://cdn.nlark.com/yuque/0/2024/png/40382789/1713529678191-d7cbba97-cb3b-49e8-b62d-e70c6e99c09f.png)