<template>
    <div class="layout">
        <Layout>
            <Sider breakpoint="md" collapsible :collapsed-width="78" v-model="isCollapsed">
                <Menu active-name="1-1" theme="dark" width="auto" :class="menuitemClasses">
                    <MenuItem name="1-1" @click.native="directory">
											<Icon type="ios-folder" />
											<span>directory</span>
                    </MenuItem>
                    <MenuItem name="1-2" @click.native="upload">
											<Icon type="ios-cloud-upload" />
											<span>upload</span>
                    </MenuItem>
                </Menu>
                <div slot="trigger"></div>
            </Sider>
            <Layout>
                <Header class="layout-header-bar">
									<h1 v-if="show">this is your directory of files...</h1>
									<h1 v-else>upload something...</h1>
								</Header>
                <Content :style="{margin: '20px', background: '#fff', minHeight: '220px'}">
                    <router-view/>
                </Content>
            </Layout>
        </Layout>
    </div>
</template>

<script>
    export default {
        data () {
            return {
                isCollapsed: false,
								show:true
            };
        },
        computed: {
            menuitemClasses: function () {
                return [
                    'menu-item',
                    this.isCollapsed ? 'collapsed-menu' : ''
                ]
            }
        },
				methods:{
					directory(){
						this.show = true;
						this.$router.push({path:'/home/directory'});
					},
					upload(){
						this.show = false;
						this.$router.push({path:'/home/upload'});
					}
				}
    }
</script>

<style scoped>
	.layout{
			border: 1px solid #d7dde4;
			background: #f5f7f9;
			position: relative;
			border-radius: 4px;
			overflow: hidden;
			width: 100%;
			height: 100%;
	}
	.layout-header-bar{
			background: #fff;
			box-shadow: 0 1px 1px rgba(0,0,0,.1);
	}
	.menu-item span{
			display: inline-block;
			overflow: hidden;
			width: 69px;
			text-overflow: ellipsis;
			white-space: nowrap;
			vertical-align: bottom;
			transition: width .2s ease .2s;
	}
	.menu-item i{
			transform: translateX(0px);
			transition: font-size .2s ease, transform .2s ease;
			vertical-align: middle;
			font-size: 16px;
	}
	.collapsed-menu span{
			width: 0px;
			transition: width .2s ease;
	}
	.collapsed-menu i{
			transform: translateX(5px);
			transition: font-size .2s ease .2s, transform .2s ease .2s;
			vertical-align: middle;
			font-size: 22px;
	}
</style>