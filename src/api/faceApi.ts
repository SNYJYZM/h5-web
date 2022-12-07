import http  from "@/http/index"


export default{


    check:{
        name:"人脸校验",
        url:"/face-api/face/check",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)

        }
    },

}
