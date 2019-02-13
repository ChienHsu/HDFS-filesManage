<template>
	<div id="directory">
		<h1>this is directory</h1>
	</div>
</template>

<script>
import {API} from '@/api/apiService'	
	export default {
		data() {
			return {
				
			};
		},
		methods:{
			getDirectory(){
				API('get','/webhdfs/v1/?op=LISTSTATUS',{}).then(res=>{
					console.log(res);
				});
			}
		},
		created() {
			this.getDirectory();
		}
	}
</script>

<style>

</style>
