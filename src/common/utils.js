export function deBounce(func, delay){
  let timer = null
  return function (...args) {

    //清除定时
    if(timer) clearTimeout(timer)

    //设置定时
    timer = setTimeout(()=>{

      func.apply(this,args)

    },delay)
  }
}
