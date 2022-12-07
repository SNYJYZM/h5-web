<template>
  <van-nav-bar title="提交个人信息" />
  <van-form @submit="onSubmit">
    <van-cell-group inset>
      <van-field v-model="formData.name" name="姓名" label="姓名" placeholder="姓名"
                 :rules="[{ required: true, message: '请填写姓名' }]" />
      <van-field v-model="formData.phone" name="手机号" label="手机号" placeholder="手机号"
                 :rules="[{ required: true, message: '请填写手机号' }]" />
      <van-field v-model="formData.id" name="身份证" label="身份证" placeholder="身份证"
                 :rules="[{ required: true, message: '请填写身份证' }]" />
    </van-cell-group>
    <div style="margin: 16px;">
      <van-button round block type="primary" native-type="submit">
        提交
      </van-button>
    </div>
  </van-form>

  <van-cell  icon="aim" title="人脸校验" is-link value="去刷脸"  to="/face"/>

</template>

<script setup lang="ts">
import { onMounted, ref, reactive } from 'vue'
import { personApi } from '@/api/index'
import { showToast } from 'vant';
import { appStore } from "@/store/appStore"
import { storeToRefs } from "pinia"
import { useRouter } from 'vue-router'
const router = useRouter()
let { userInfo } = storeToRefs(appStore())
const formData = reactive({
  id: "",
  name: "",
  phone: "",

})

const onSubmit = (values: any) => {
  personApi.login.call(formData).then((response: any) => {

    if (response.id  != "nobody") {
      userInfo.value.id = response.id

      userInfo.value.name = response.name

      showToast('提交成功');

      router.push({name:"home"})
    } else {

      showToast('用户不存在');
    }


  })
};


</script>


