<template>


  <van-image image-size="100%" src="../images/bg.png" />

  <div class="qrcodewapper">
    <vue-qrcode class="qrcode" value="https://fengyuanchen.github.io/vue-qrcode"
                :options="{ color: { dark: logTrackOk.color, }, }">
    </vue-qrcode>
  </div>

  <div class="txt venue">场所: {{ logTrackOk.venueName }}</div>

  <div class="txt">姓名: {{ userInfo.name }}</div>

  <div class="txt">身份证: {{ userInfo.id }}</div>

  <div class="txt">登记时间: {{ logTrackOk.logTime }}</div>


</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { personApi, tractApi } from '@/api/index'
//使用路由
import { useRoute, useRouter } from 'vue-router'
import { appStore } from "@/store/appStore"
import { storeToRefs } from "pinia"
let { userInfo, tempVenueId } = storeToRefs(appStore())

const route = useRoute()  //获取当前路由信息
const router = useRouter() //负责跳转

const logTrackOk = reactive({
  color: "",
  venueName: "",
  logTime: ""

})

onMounted(() => {

  //为了获取手机扫码之后，获取url上面的参数场所id
  //http://123.57.206.19:8084?venueId=10
  if (route.query.venueId != undefined) {
    tempVenueId.value = Number(route.query.venueId)
  }

  //检查该人员是否登录过，没有登陆就跳转到登陆页面（人脸识别）
  if (userInfo.value.id === "") {

    router.push({ name: "login" })
  } else {
    //后续作接口操作
    callTrackApi()
  }



})

const callTrackApi = () => {
  tractApi.insert.call({ personId: userInfo.value.id, venueId: tempVenueId.value }).then((res: any) => {

    logTrackOk.color = res.color;
    logTrackOk.logTime = res.logTime;
    logTrackOk.venueName = res.venueName;
  })

}
</script>
<style scoped>
.qrcodewapper {

  position: relative;

}

.qrcode {

  position: absolute;

  top: -155px;
  left: 113px
}

.txt {
  color: rgb(51, 49, 49);
  text-align: center;
  font-size: 14px;
  padding-top: 20px;
}

.venue {
  font-size: 18px;
  color: tomato;
}
</style>
