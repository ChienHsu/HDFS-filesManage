<template>
	<div id="directory">
		<Table 
			:columns="columns" 
			:data="fileStatus"
			:disabled-hover="true"
			size='small'
		></Table>
		<Modal
			v-model="showModal"
			title="Message Box"
			@on-ok="ok"
			@on-cancel="cancel">
			<p>确认删除此目录或文件吗？</p>
		</Modal>
	</div>
</template>

<script>
import {API} from '@/api/apiService'
import moment from 'moment'
import axios from 'axios'	
	export default {
		data() {
			return {
				fileStatus:[],//目录
				filePath:'',//文件路径
				currFilePath:'',//当前显示文件路径
				preFilePath:'',//上一步的文件路径
				showModal:false,//显示对话框
				columns:[
					{
						title:'Name',
						key:'pathSuffix',
						render:(h,params)=>{
							if(params.row.type === 'DIRECTORY'){
								return h('div',{
									style:{
										cursor:'pointer'
									},
									on:{
										click:()=>{
											this.filePath = params.row.pathSuffix;
										}
									}
									},[
										h('Icon',{
											props:{
												type:'ios-folder'
											}
										}),
										h('span',{
											style:{
												'margin-left':'5px'
											}
										},params.row.pathSuffix)
								]);
							}else if(params.row.type === 'FILE'){
								return h('div',{},[
										h('Icon',{
											props:{
												type:'ios-paper'
											}
										}),
										h('span',{
											style:{
												'margin-left':'5px'
											}
										},params.row.pathSuffix)
								]);
							}else{
								return h('div',{
									style:{
										cursor:'pointer',
										'font-weight':'bold'
									},
									on:{
										click:()=>{
											//返回上一级
											this.pre();
										}
									}
								},[
									h('Icon',{
										props:{
											type:'md-arrow-back'
										}
									}),
									h('span',{
										style:{
											'margin-left':'5px'
										}
									},this.currFilePath)
								]);
							}
						}
					},
					{
						title:'Date Modify',
						key:'modificationTime',
						render:(h,params)=>{
							if(params.row.modificationTime !== undefined){
								return h('span',moment(params.row.modificationTime).format('YYYY/MM/DD'));
							}
						}
					},
					{
						title:'File Size',
						key:'length',
						render:(h,params)=>{
							if(params.row.length !== undefined){
								if(params.row.length>0 && params.row.length<1024){
									return h('span',`${params.row.length} B`);
								}else if(params.row.length>=1024 && params.row.length<1048576){
									return h('span',`${(params.row.length/1024).toFixed(2)} KB`);
								}else if(params.row.length>=1048576){
									return h('span',`${(params.row.length/1024/1024).toFixed(2)} MB`);
								}else{
									return h('span','-');
								}
							}
						}
					},
					{
						title:'Action',
						render:(h,params)=>{
							if(params.row.type === 'FILE'){
								return h('div',{},[
									h('a',{
										style:{
											color:'#515A6E'
										},
										domProps:{
											title:'download',
											href:`/api/webhdfs/v1/${this.currFilePath.substr(1)}/${params.row.pathSuffix}?op=OPEN`
										}
									},[h('Icon',{
										props:{
											type:'ios-cloud-download'
										},
										style:{
											'font-size':'16px'
										}
									})]),
									h('Icon',{
										style:{
											'margin-left':'10px',
											cursor:'pointer',
											'font-size':'16px'
										},
										props:{
											type:'md-trash'
										},
										on:{
											click:()=>{
												this.showModal = true;
											}
										},
										domProps:{
											title:'delete'
										}
									})
								]);
							}else if(params.row.type === 'DIRECTORY'){
								return 	h('Icon',{
											style:{
												cursor:'pointer',
												'font-size':'16px'
											},								
											props:{
												type:'md-trash'
											},
											on:{
												click:()=>{
													this.showModal = true;
												}
											}
										});
							}
						}
					}
				]
			};
		},
		watch:{
			//不应该使用箭头函数来定义watcher函数,否则this 将不会按照期望指向Vue实例
			filePath:{
				handler:function(v,oV){
					this.currFilePath = `${this.currFilePath}/${v}`; 
					if(this.currFilePath === '/'){
						this.currFilePath = '';
					}
				}
			},
			currFilePath:{
				handler:function(v,oV){
					this.getDirectory(v);
				}
			}
		},
		methods:{
			//对话框确认
			ok(){
				
			},
			//对话框取消
			cancel(){
				
			},
			//返回上一级
			pre(){
				var arr = this.currFilePath.split('/');
				arr.length = arr.length - 1;
				this.currFilePath = '';
				this.filePath = arr.join(',').replace(/,/g,'');// /g正则 代替全部
			},
			//获取文件内容
			getDirectory(pathSuffix){
				var filePath = '';
				this.fileStatus = [];
				if(pathSuffix !== undefined && pathSuffix !== ''){
					filePath = pathSuffix;
					this.fileStatus=[
						{
							pathSuffix:'',
							type:'headBar'
						}
					]
				}
				API('get',`/webhdfs/v1/${filePath}?op=LISTSTATUS`,{}).then(res=>{
					res.FileStatuses.FileStatus.forEach((item)=>{
						this.fileStatus.push(item);
					});
				});
			}
		},
		mounted() {
			this.$nextTick(()=>{
				this.getDirectory();
			});
		}
	}
</script>
