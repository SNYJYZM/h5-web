import { createApp } from 'vue'

//加入路由组件
import router from '@/router/index';
import App from '@/App.vue'
import VueQrcode from '@chenfengyuan/vue-qrcode';
//全局使用vant
import 'vant/lib/index.css';
import vant from 'vant'

//////////////导入人脸识别插件
import "tracking";
import "tracking/build/data/face";
import "@/asset/trackingX.js"
/////////////////

//导入store
import store from '@/store/Index'

const app = createApp(App)

//使用路由组件
app.use(router)
//使用vant
app.use(vant);
//使用store
app.use(store)
//使用二维码插件
app.component(VueQrcode.name, VueQrcode);
app.mount('#app')


