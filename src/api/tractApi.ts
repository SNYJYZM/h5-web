import http  from "@/http/index"


export default{


    insert:{
        name:"人脸校验",
        url:"/yunji-api/track/insert",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)
        }
    },

}
