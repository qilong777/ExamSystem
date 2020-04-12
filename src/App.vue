<template>
  <div id="app">
    <keep-alive>
      <router-view />
    </keep-alive>

    <van-tabbar route class="tabbar">
      <van-tabbar-item replace to="/home" icon="wap-home">
        首页
      </van-tabbar-item>
      <van-tabbar-item replace to="/discuss" icon="comment">
        讨论
      </van-tabbar-item>
      <van-tabbar-item replace to="/message" icon="chat-o">
        消息
      </van-tabbar-item>

      <van-tabbar-item replace to="/profile" icon="manager">
        我的
      </van-tabbar-item>
    </van-tabbar>
  </div>
</template>

<style lang="scss">
html,body,#app{
  display: flex;
  flex-direction: column;
  height: 100%;
  width: 100%;
}
.tabbar{
  flex-shrink: 0;
  background-color: #eee;
  height: 60px;
  box-shadow: 0px 1px 2px #000;
  .van-tabbar-item__icon{
    font-size: 24px;
  }
}
</style>
