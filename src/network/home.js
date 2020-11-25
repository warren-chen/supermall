import {request,request2} from "./request";

export function getHomeMultidata() {
    return request({
      url :'/home/multidata'
    })
}

export function getHomeGoods(type,page) {
    return request2({
      url : '/api/z8/home/data',
      params:{
        type,
        page
      }
    })
}