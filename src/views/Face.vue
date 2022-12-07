<template>

  <div class="wrapp">
    <div class="status" :style="{ color: msg === '校验成功' ? 'green' : 'red' }">
      {{ msg }}
    </div>
    <div class="videoWrapp">
      <video id="myVideo" preload="preload" autoplay loop muted></video>
      <canvas ref="myCanvas" id="myCanvas" width="200" height="200"></canvas>
    </div>

  </div>

</template>

<script setup lang="ts">
import { onMounted, ref } from 'vue'
import { faceApi,personApi } from '@/api/index'

//使用路由
import { useRoute, useRouter } from 'vue-router'
import { appStore } from "@/store/appStore"
import { storeToRefs } from "pinia"
let { tempVenueId,userInfo } = storeToRefs(appStore())

const route = useRoute()  //获取当前路由信息
const router = useRouter() //负责跳转

const msg = ref('识别中...')

onMounted(() => {

  init()


})

let trackerTask: any = null;

// 标识用的画布
const myCanvas = ref<any>(null);

// 实例颜色检查器
const myTracker: any = new tracking.ObjectTracker("face");
myTracker.setInitialScale(4);
myTracker.setStepSize(2);
myTracker.setEdgesDensity(0.1);


const init = () => {
  // 触发颜色检查器
  trackerTask = tracking.track("#myVideo", myTracker, { camera: true });
  // 监听颜色检查器
  myTracker.on("track", (event: any) => {
    const context = myCanvas.value?.getContext("2d") as CanvasRenderingContext2D;
    if (myCanvas.value) {
      context.clearRect(0, 0, myCanvas.value.width, myCanvas.value.height);
    }
    if (event.data.length === 0) {

      return
    }

    trackerTask.stop();
    msg.value = "识别到人脸...";


    const myVideo = document.querySelector("#myVideo") as HTMLVideoElement;
    context.drawImage(myVideo, 0, 0, myCanvas.value.width, myCanvas.value.height);

    let faceBase64 = myCanvas.value.toDataURL("image/png")

    faceApi.check.call({ venueId: tempVenueId.value, faceImg: faceBase64 }).then((id: any) => {



      if (id != "nobody") {


        msg.value = "校验成功";

        personApi.select.call({id:id}).then((res:any)=>{
          let {id,name} = res.list[0]

          userInfo.value.id = id
          userInfo.value.name = name

          router.push({name:"home"})
        })



      } else {

        msg.value = "查无此人";

      }
    })



  })
}
</script>

<style  scoped>
.wrapp {
  height: 300px;
  background: url('/images/bg.jpeg') no-repeat;
  background-size: 100% 100%;
  padding-top: 10px;

}

.videoWrapp {
  width: 200px;
  height: 200px;
  margin: auto;
  margin-top: 30px;
  position: relative;

}

#myCanvas {
  position: absolute;
  top: 0px;
  left: 0px;
  border-radius: 50%;
  width: 100%;
  height: 100%;
}

#myVideo {
  width: 100%;
  height: 100%;
  border-radius: 50%;
  object-fit: cover;
}

.status {

  text-align: center;
}



.rect {
  border: 2px solid #081797;
  left: -1000px;
  position: absolute;
  top: -1000px;
}
</style>
