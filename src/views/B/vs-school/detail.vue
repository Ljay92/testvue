<template>
    <div class="vs-school-detail">
        <div class="core-wrapper">
            <h3 class="project-title">U3D建筑模型九种</h3>

            <div class="prd-center-wrapper">
                <div class="prd-center-search">
                    <div class="prd-center-search_main">
                        <el-form label-width="90px">
                            <el-form-item :label="$lang('操作:')">
                                <el-button type="dir" v-for="(item, i) in operateTypes"
                                           :key="i">{{item.valueExp}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>

            <div class="content-container">
                <video class="video-container"
                       width="100%"
                       :src="currentData.url"
                       controls="controls">
                    您的浏览器不支持 video 标签。
                </video>

                <el-collapse v-model="activeCollapse">
                    <el-collapse-item name="1">
                        <template slot="title">
                            {{activeCollapse[0]&&(activeCollapse[0] === '1')?'收起':'展开'}}
                        </template>

                        <div v-html="currentData.info"></div>
                    </el-collapse-item>
                </el-collapse>
            </div>
        </div>
    </div>
</template>

<script>
    import {vsSchoolDetail} from '@/apis/vsSchool';

    export default {
        name: "vs-school-detail",
        data () {
            return {
                // 操作类型
                operateTypes: [],
                activeCollapse: ['1'],
                currentData: {}
            }
        },
        async mounted () {
            let data = await vsSchoolDetail(this.$route.query.id);

            console.log('data', data);

            // 获取操作类型数据
            this.operateTypes = data.data.label;
            this.currentData = data.data.vssschool;

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