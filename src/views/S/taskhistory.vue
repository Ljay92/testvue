<template>
    <div class="history-download">
        <div style="padding: 0 50px">
            <h1>{{$lang('查看记录')}}</h1>
        </div>
        <el-row style="margin:20px 0;">
            操作：
            <el-radio-group v-model="cur">
                <el-radio-button v-for="(item,index) in buttonarr" :label="index">操作{{index+1}}</el-radio-button>
            </el-radio-group>
        </el-row>
        <el-row v-for="(item,index) in fileData">
            <el-table :data="item" tooltip-effect="dark" v-show="cur==index">
                <el-table-column type="selection" width="60"></el-table-column>
                <el-table-column prop="fileName" :label="$lang('文件名')" width="300"></el-table-column>
                <el-table-column :label="$lang('缩略图')" width="300">
                    <template slot-scope="scope">
                        <img width="80px" :src="scope.row.url" alt="" v-if="getFileType(scope.row.fileName) != 'zip'"
                             style="margin:10px auto 0;">
                        <p v-else>{{scope.row.fileName.split('.')[1]}}</p>
                    </template>
                </el-table-column>
                <el-table-column prop="createTime" :label="$lang('日期')" width="300"></el-table-column>
                <el-table-column :label="$lang('操作')">
                    <template slot-scope="scope">
                        <el-button size="small" @click="viewImage(scope.row.url)"
                                   v-if="getFileType(scope.row.fileName) != 'zip'">{{$lang('预览')}}
                        </el-button>
                        <el-button size="small" @click="upload(scope.row.url)" v-else>{{$lang('下载')}}</el-button>
                    </template>
                </el-table-column>
            </el-table>
        </el-row>
        <el-dialog title="预览" :visible.sync="showstatus" width="30%" center>
            <div class="dialog-img-preview">
                <img :src="currentImage" alt="">
            </div>
        </el-dialog>
    </div>
</template>

<script>
    import {getAllFile} from "@/apis/files";
    import moment from "moment";

    export default {
        name: "taskhistory",
        data() {
            return {
                cur: 0,
                fileData: [],
                currentImage: '',
                showstatus: false,
                buttonarr: [],
            }
        },
        async mounted() {
            const id = this.$route.query.id;
            let res = await getAllFile(
                'supplement',
                id
            );
            if (res.success) {
                let arr = {};
                // 通过updatetime将文件记录分组
                res.data.forEach(item => {
                    if (arr[item.updateTime]) {
                        arr[item.updateTime].push(item);
                    }
                    else {
                        arr[item.updateTime] = [item];
                    }
                })
                for (const item in arr) {
                    this.buttonarr.push(moment(new Date(item)).format("YYYY-MM-DD HH"))
                    this.fileData.push(arr[item]);
                }
                if (res.data.length === 0) {
                    this.$message.warning($lang("暂无文件记录数据！"))
                }
            }
        },
        methods: {
            getFileType(str) {
                let type = str.substring(str.lastIndexOf("\.") + 1, str.length);
                return type;
            },
            viewImage(url) {
                this.currentImage = url;
                this.showstatus = true;
            },
            upload(url) {
                window.location.href = url;
            }
        }
    }
</script>

<style scoped>

</style>