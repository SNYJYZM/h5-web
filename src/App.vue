

<template>


  <router-view></router-view>

  <!-- <van-tabbar v-model="active">
    <van-tabbar-item name="home" to="/" icon="home-o">Home</van-tabbar-item>
    <van-tabbar-item icon="search" to="/login"  dot>登录</van-tabbar-item>
    <van-tabbar-item icon="friends-o" badge="5">标签</van-tabbar-item>
    <van-tabbar-item icon="setting-o" badge="20">标签</van-tabbar-item>
  </van-tabbar> -->
</template>


<script setup lang="ts">
import { ref } from 'vue'
const active = ref('home');
</script>
