<template>
    <div class="vs-school">
        <div class="core-wrapper">
            <div class="prd-center-wrapper">
                <div class="prd-center-search">
                    <div class="prd-center-search_main">
                        <div class="search-keyword">

                            <el-input class="input"
                                      placeholder="请输入项目名称"
                                      icon="search"
                                      v-model="searchKeyword">
                            </el-input>
                            <el-button class="button">检索</el-button>
                            <el-button class="button">全部</el-button>
                        </div>

                        <el-form label-width="90px">
                            <el-form-item :label="$lang('操作:')">
                                <el-button :type="item.checked?'sure':'dir'" v-for="(item, i) in operateTypes"
                                           @click="handleLabelClick(operateTypes,i)"
                                           :key="i">{{item.name}}
                                </el-button>
                            </el-form-item>

                            <el-form-item :label="$lang('技术:')">
                                <el-button :type="item.checked?'sure':'dir'" v-for="(item, i) in skillTypes"
                                           @click="handleLabelClick(skillTypes,i)"
                                           :key="i">{{item.name}}
                                </el-button>
                            </el-form-item>
                        </el-form>
                    </div>
                </div>
            </div>
        </div>

        <div class="project-container">
            <el-row :gutter="20">
                <el-col class="project-item" :span="8" v-for="(item,i) in projectList" :key="i">
                    <div class="project-name">{{item.name}}</div>
                    <div class="project-img" @click="$router.push({name:'B_VsSchool-detail'})"><img :src="item.imgSrc"
                                                                                                    alt=""></div>
                </el-col>
            </el-row>

            <div class="pagination">
                <el-pagination layout="prev, pager, next" :page-size="10" :total="100"
                               @current-change="handlePageChange"/>
            </div>

        </div>
    </div>
</template>

<script>
    export default {
        name: "vs-school-list",
        data () {
            return {
                // 技术类型
                skillTypes: [],
                // 操作类型
                operateTypes: [],
                // 项目数据
                projectList: [],
                // 搜索框关键字
                searchKeyword:''
            }
        },
        mounted () {
            // 获取技术类型数据
            this.skillTypes = [{name: 'angular', checked: false}, {name: 'ionic', checked: false}, {
                name: 'react',
                checked: false
            }, {name: 'vue', checked: false}];

            // 获取操作类型数据
            this.operateTypes = [{name: '操作一', checked: false}, {name: '操作二', checked: false}];

            this.projectList = [
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
                {name: 'U3D建筑模型9种', imgSrc: 'http://pic32.photophoto.cn/20140714/0022005854369630_b.jpg'},
            ];
        },
        methods: {
            // 处理标签点击事件
            handleLabelClick (arr, i) {
                // 清除其他所有项选中
                arr.forEach(item => (item.checked = false));
                // 选中当前项
                arr[i].checked = true;
            },
            // 处理分页改变
            handlePageChange () {

            }
        }
    }
</script>

<style>
    .vs-school .project-container {
        width: 1200px;
        margin: auto;
        padding-top: 20px;
    }

    /* 头部搜索框样式*/
    .vs-school .search-keyword {
        display: flex;
        margin: 20px 0;
    }

    .vs-school .search-keyword .input {
        width: calc(100% - 200px);
    }

    .vs-school .search-keyword .input input {
        padding-left: 30px;
        border-radius: 20px;
        background-color: #eee;
        border: none;
    }

    .vs-school .search-keyword .input .el-input__icon{
        left: 0;
    }

    .vs-school .search-keyword .button {
        width: 100px;
        margin-left: 20px;
        border-radius: 20px;
        color: #fff;
        background-color: #161f40;
    }

    .vs-school .project-container .project-item {
        margin-bottom: 20px;
        position: relative;
        cursor: pointer;
        overflow: hidden;
    }

    .vs-school .project-container .project-item .project-name {
        position: absolute;
        bottom: 0;
        width: calc(100% - 20px);
        height: 40px;
        line-height: 40px;
        text-indent: 20px;
        font-size: 1rem;
        font-weight: 800;
        color: #fff;
        background-color: rgba(0, 0, 0, 0.4);
    }

    .vs-school .project-container .project-img {
        width: 100%;
        height: 230px;
        background: #eee;
    }

    .vs-school .project-container .project-img img {
        width: 100%;
    }

    .vs-school .pagination {
        text-align: center;
        margin: 20px 0;
    }

    .vs-school .pagination .el-pager .active {
        background-color: #161f40;
    }

</style>