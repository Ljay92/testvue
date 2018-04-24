<template>
    <div class="l_wrapper">
        <el-table :data="tableData" :border="true" @selection-change="handleSelectionChange" ref="multipleTable">
            <el-table-column type="selection" width="55" align="center"></el-table-column>
            <el-table-column prop="name" label="文件名" align="center"></el-table-column>
            <el-table-column prop="date" label="日期" align="center"></el-table-column>
            <el-table-column label="操作" align="center">
                <div slot-scope="scope">
                    <el-button size="mini">查看</el-button>
                    <el-button size="mini">下载</el-button>
                </div>
            </el-table-column>
        </el-table>
        <el-pagination class="l_page" background layout="prev, pager, next" :total="1">
        </el-pagination>
    </div>
</template>
<script>
    export default {
        name: "modocker",
        data() {
            return {
                tableData: [{
                    name: '测试',
                    date: '2018-04-23 00:00:00'
                }],
                multipleSelection: []
            }
        },
        methods: {
            toggleSelection(rows) {
                if (rows) {
                    rows.forEach(row => {
                        this.$refs.multipleTable.toggleRowSelection(row);
                    });
                } else {
                    this.$refs.multipleTable.clearSelection();
                }
            },
            handleSelectionChange(val) {
                this.multipleSelection = val;
            }
        }
    }
</script>

<style>
    .l_wrapper {
        width: 1100px;
        margin: 20px auto;
        padding: 50px;
        background: #fff;
        min-height: 300px;
    }

    .el-table--fit {
        border-bottom: 1px solid #dfe6ec;
    }

    .l_page {
        margin: 20px auto;
        text-align:center;
    }
</style>