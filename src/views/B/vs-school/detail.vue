<template>
    <div class="vs-school-detail">
        <div class="core-wrapper">
            <h3 class="project-title">U3D建筑模型九种</h3>

            <div class="prd-center-wrapper">
                <div class="prd-center-search">
                    <div class="prd-center-search_main">
                        <el-form label-width="90px">
                            <el-form-item :label="$lang('操作:')">
                                <el-button :type="item.checked?'sure':'dir'" v-for="(item, i) in operateTypes"
                                           @click="handleLabelClick(operateTypes,i)"
                                           :key="i">{{item.name}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>

            <div class="content-container">
                <video class="video-container"
                       width="100%"
                       src="http://pgccdn.v.baidu.com/1210560493_3087179974_20170419102015.mp4?authorization=bce-auth-v1%2Fc308a72e7b874edd9115e4614e1d62f6%2F2017-04-19T02%3A20%3A21Z%2F-1%2F%2F2ca5576a1e04e558cc8b5bb38cb7bbd7be04600a7088ab5d5ac5150f6f300340&responseCacheControl=max-age%3D8640000&responseExpires=Fri%2C+28+Jul+2017+10%3A20%3A21+GMT&xcode=48dd840cbde3b2d51a478385f648c4724e79ae8c0dcb2cf1&time=1524226647&_=1524140551361"
                       controls="controls">
                    您的浏览器不支持 video 标签。
                </video>

                <el-collapse v-model="activeCollapse">
                    <el-collapse-item name="1">
                        <template slot="title">
                            {{activeCollapse[0]&&(activeCollapse[0] === '1')?'收起':'展开'}}
                        </template>

                        <div class="describe">
                            你好，世界！就爱上咖啡就爱上了咖啡就爱上了咖啡就爱上了咖啡机撒可富举案说法举案说法就爱上了房间爱上了房间发生就开了房间爱上了咖啡就爱上房间卡萨规划是两个哈建设路口嘎斯建了个
                        </div>

                        <div class="describe">
                            你好，世界！就爱上咖啡就爱上了咖啡就爱上了咖啡就爱上了咖啡机撒可富举案说法举案说法就爱上了房间爱上了房间发生就开了房间爱上了咖啡就爱上房间卡萨规划是两个哈建设路口嘎斯建了个
                        </div>

                        <div class="describe">
                            你好，世界！就爱上咖啡就爱上了咖啡就爱上了咖啡就爱上了咖啡机撒可富举案说法举案说法就爱上了房间爱上了房间发生就开了房间爱上了咖啡就爱上房间卡萨规划是两个哈建设路口嘎斯建了个
                        </div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "vs-school-detail",
        data () {
            return {
                // 操作类型
                operateTypes: [],
                activeCollapse: ['1']
            }
        },
        mounted () {

            // 获取操作类型数据
            this.operateTypes = [
                {name: '操作一', checked: false},
                {name: '操作二', checked: false},
                {name: '操作三', checked: false},
                {name: '操作四', checked: false},
                {name: '操作五', checked: false}];

        },
        methods: {
            // 处理标签点击事件
            handleLabelClick (arr, i) {
                // 清楚其他所有项选中
                arr.forEach(item => (item.checked = false));
                // 选中当前项
                arr[i].checked = true;
            }
        }
    }
</script>

<style>
    .vs-school-detail .project-title {
        text-align: center;
        font-size: 26px;
        font-weight: 400;
        padding: 20px 0;
    }

    .vs-school-detail .content-container {
        width: 1200px;
        margin: auto;
    }

    .vs-school-detail .video-container {
        width: 100%;
        height: auto;
    }

    .vs-school-detail .el-collapse, .el-collapse-item__wrap, .el-collapse-item__header {
        border: none !important;
        background-color: #fff;
    }

    .vs-school-detail .describe {
        font-size: 16px;
        line-height: 30px;
        text-indent: 40px;
    }

    .vs-school-detail .el-collapse-item__header {
        padding-left: 56px;
    }
</style>