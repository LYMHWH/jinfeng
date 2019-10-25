import {get,post} from "@/utils/http";

export var getUserInfo = ()=>{
    return get("/index/getEcommerceManagerInfo")
}