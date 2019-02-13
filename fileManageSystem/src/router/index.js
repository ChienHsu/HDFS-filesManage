import Vue from 'vue'
import Router from 'vue-router'
import Home from '@/components/Home'
import Directory from '@/components/Directory'
import Upload from '@/components/Upload'

Vue.use(Router)

export default new Router({
  routes: [
		{
			path:'/',
			redirect:{name:'Home'}
		},
    {
      path: '/home',
      name: 'Home',
      component: Home,
			redirect: {path:'/home/directory'},
			children:[
				{
					path: 'directory',
					name: 'Directory',
					component: Directory
				},
				{
					path: 'upload',
					name: 'Upload',
					component: Upload
				},				
			]
    }
  ]
})
