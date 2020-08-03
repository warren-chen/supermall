import axios from 'axios'

export function request(config) {
    const instance = axios.create({
      baseURL: 'http://123.207.32.32:8000',
      timeout : 5000
    })

  instance.interceptors.request.use(config =>{
    return config
  }), err => {

  }

  instance.interceptors.response.use(res =>{
    return res.data
  }), err=>{
      console.log(err)
  }

  return instance(config)
}


export function request2(config) {
  const instance2 = axios.create({
    baseURL: 'http://152.136.185.210:8000',
    timeout : 6000
  })

  instance2.interceptors.request.use(config =>{
    return config
  }), err => {

  }

  instance2.interceptors.response.use(res =>{
    return res.data
  }), err=>{
    console.log(err)
  }

  return instance2(config)
}
