import service from './http'

export const API = (method,url,param)=>{
	return service({
		method:method,
		url:url,
		data:param
	})
}