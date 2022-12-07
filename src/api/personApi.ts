import http  from "@/http/index"


export default{


    select:{
        name:"查询人员列表",
        url:"/yunji-api/person/select",
        call: async function (params:any ={}) {
            return await http.get(this.url,params)

        }
    },
    login:{
        name:"人员登记",
        url:"/yunji-api/person/login",
        call: async function (params:any ={}) {
            return await http.post(this.url,params)

        }
    },

}
