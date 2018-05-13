<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
            <div class="box-flex-media-box">
                <div class="flex1 chart-left-title">
                    <h3>{{subTask.projectName}}</h3>
                </div>
                <el-button type="sure" @click="$router.push({name:'B_ChatT', query: $route.query})">&lt;{{$lang('返回总任务')}}</el-button>
                <el-button type="sure" @click="$router.push({name:'B_TaskChildDetail',query: { id: $route.query.id }})">
                    {{$lang('查看任务')}}&gt;
                </el-button>
            </div>
            <div class="chart-left-list">
                <ul class="chart-left-ul">
                    <li class="chart-left-li" v-for="(item,i) in taskStage" :key="i">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{i + 1}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{item.stageName}}</h4>
                            </a>
                            <!--<el-button size="small"  type="info" style="z-index: 1" >{{$lang('查看聊天记录')}}</el-button>-->
                            <el-button size="small" type="info"
                                       @click="$router.push({name:'B_History',query: { id: item.id, index: i }})">
                                {{$lang('查看历史')}}
                            </el-button>
                        </div>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('截止时间')}}：</dt>
                            <dd class="flex1">{{item.stageEndTime}}</dd>
                        </dl>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('阶段详情')}}：</dt>
                            <dd class="flex1">
                                <div v-html="item.stageRemarks"></div>
                            </dd>
                        </dl>
                    </li>
                    <li class="chart-left-li" v-if="['5','6','7','8'].includes(subTask.state)">
                        <div class="box-flex-media-box cl-top">
                            <p class="num">
                                <em>{{taskStage.length + 1}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{statemsg}}</h4>
                                <p>{{$lang('截止时间')}}：{{subTask.taskEndTime}}</p>
                            </a>
                            <el-button size="small" type="info"
                                       @click="$router.push({name:'B_TaskCheck',query: { id: subTask.id }})"
                                       v-if="$route.query.state==6">{{$lang('去验收')}}
                            </el-button>
                            <el-button size="small" type="info"
                                       @click="$router.push({name:'B_DTaskCheck',query: { id: subTask.id }})" v-else>
                                {{$lang('预览')}}
                            </el-button>
                            <el-button size="small" type="info"
                                       @click="$router.push({name:'B_History',query: { id: subTask.id, index: -1 }})">
                                {{$lang('查看历史')}}
                            </el-button>
                        </div>
                        <dl class="box-flex cl-info">
                            <dt>{{$lang('阶段详情')}}：</dt>
                            <dd class="flex1">
                                <div v-html="subTask.remarks"></div>
                            </dd>
                        </dl>
                    </li>

                    <!--最终文件-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top"
                             style="border-left: 0;padding-left: 20px;border-top: 5px solid #161f40;">
                            <p class="num">
                                <em>{{taskStage.length + 2}}</em>
                            </p>
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('最终文件')}}</h4>
                            </a>
                            <!--<el-button type="info" size="small" @click="downloadLastFile()" v-if="!isOnlyChat">-->
                            <!--{{$lang('下载')}}-->
                            <!--</el-button>-->
                            <el-button type="info" size="small" @click="toRedirect('S_History', '-1')">
                                {{$lang('查看记录')}}
                            </el-button>
                        </div>
                        <div style="padding:0 30px;">
                            <div class="box-flex-media-box cl-top"
                                 style="padding:0;border-left: 0;border-top: 2px solid #161f40;">
                                <p class="num" style="width:26px;">
                                    <em></em>
                                </p>
                                <a href="javascript:;" class="title flex1">
                                    <h4>{{$lang('预览文件')}}</h4>
                                </a>
                                <el-button type="info" size="small" @click="proview" v-if="subTask.state>=5">
                                    {{$lang('预览')}}
                                </el-button>
                                <!-- <el-button type="info" size="small" @click="toSubmit" v-if="!isOnlyChat&&uploaded">{{$lang('提交验收')}}</el-button> -->
                                <el-button type="info" size="small" @click="toRedirect('S_History', '-2')"
                                           style="margin-right:-12px">
                                    {{$lang('查看记录')}}
                                </el-button>
                            </div>
                            <dl class="box-flex cl-info">
                                <dt>{{$lang('截止时间：')}}</dt>
                                <dd class="flex1">{{subTask.taskEndTime}}</dd>
                            </dl>
                            <dl class="box-flex cl-info">
                                <dt>{{$lang('上次意见：')}}</dt>
                                <dd class="flex1">
                                    <div v-html="subTask.remarks"></div>
                                </dd>
                            </dl>
                            <div class="box-flex-media-box cl-top"
                                 style="padding:0;border-left: 0;border-top: 2px solid #161f40;">
                                <p class="num" style="width:26px;">
                                    <em></em>
                                </p>
                                <a href="javascript:;" class="title flex1">
                                    <h4>{{$lang('提交验收')}}</h4>
                                </a>
                                <el-button type="info" size="small" @click="changefile" v-if="subTask.state>=5"
                                           style="position:relative;">
                                    {{$lang('选择文件')}}<i :class="changestate?'el-icon-caret-bottom':'el-icon-caret-top'"
                                                        style="margin-left:10px;"></i>
                                    <div style="position:absolute;width:80px;text-align:center;background:#fff;z-index:9999;font-size:12px;color:#666666;top:25px;"
                                         v-show="changestate">
                                        <div style="line-height:40px;" @click="selectfile">预览文件</div>
                                        <hr width="60" style="border-top:1px solid #666666;margin:0 auto;">
                                        <div style="line-height:40px;" @click="selectfile">最终文件</div>
                                    </div>
                                </el-button>
                            </div>
                        </div>
                    </li>
                    <!--最终文件-->

                    <!--<li class="chart-left-li" v-if="['7','8'].includes(subTask.state)">-->
                    <!--<div class="box-flex-media-box cl-top">-->
                    <!--<p class="num">-->
                    <!--<em>{{taskStage.length + 2}}</em>-->
                    <!--</p>-->
                    <!--<a href="javascript:;" class="title flex1">-->
                    <!--<h4>{{$lang('最终文件')}}</h4>-->
                    <!--</a>-->
                    <!--<el-button type="info" size="small" @click="downloadLastFile()" v-if="!isOnlyChat">-->
                    <!--{{$lang('下载')}}-->
                    <!--</el-button>-->
                    <!--<el-button size="small" type="info"-->
                    <!--@click="$router.push({name:'B_History',query: { id: subTask.id, index: -2 }})">-->
                    <!--{{$lang('查看历史')}}-->
                    <!--</el-button>-->
                    <!--</div>-->
                    <!--</li>-->
                </ul>
            </div>
        </div>
        <div v-if="Object.keys(chatConfig).length>0">
            <Chat :chatConfig="chatConfig" :isHistory="true" :isReserve="false"></Chat>
        </div>
        <div v-else class="chart-right" style="background: none">
            <div class="chart-msg">{{msg}}</div>
        </div>
        <SlideBtns :type="'back'"></SlideBtns>
    </div>
</template>
<style>
    .undelete .el-icon-close {
        display: none !important;
    }
</style>
<script>
    import Chat from "@/components/Chat";
    import SlideBtns from "@/components/SlideBtns";
    import {ChildTaskInfo, AcceptanceTask, getTalkByGroupId} from "@/apis/task";
    import {getFile, downloaded} from "@/apis/files";

    export default {
        components: {Chat, SlideBtns},
        data() {
            return {
                changestate: false,
                statemsg: '',
                subTask: {},
                taskStage: [],
                chatConfig: {},
                msg: $lang("正在加载中...")
            };
        },
        async mounted() {
            const me = this;
            const id = this.$route.query.id;

            const qq = await getTalkByGroupId(id);
            console.log(id + $lang("获取聊天组信息"), qq);
            if (qq.success) {
                if (
                    qq.data &&
                    qq.data.groupDetails &&
                    qq.data.groupDetails.data &&
                    qq.data.sChatUser &&
                    qq.data.sChatUser.entities
                ) {
                    this.chatConfig = {
                        groupid: qq.data.groupDetails.data[0].id,
                        userid: qq.data.sChatUser.entities[0].username,
                        userimg: qq.data.sUser.info.headUrl,
                        username: qq.data.sUser.info.nickName || qq.data.sUser.phone,
                        userRole: "S",
                        youname: qq.data.targetUser.info.nickName || qq.data.targetUser.phone,
                        youimg: qq.data.targetUser.info.headUrl,
                        youRole: "V"
                    };
                } else {
                    this.msg = $lang("聊天相关数据出现异常");
                }
            } else {
                this.msg = qq.msg;
            }

            // const id = this.$route.query.id;

            const res = await ChildTaskInfo(id);
            if (res.success) {
                this.subTask = res.data.subTask;
                this.taskStage = res.data.taskStage;
                if (this.subTask.sSubmitAcceptance == 0) {
                    this.statemsg = $lang('制作中')
                } else if (this.subTask.sSubmitAcceptance == 1) {
                    this.statemsg = $lang('验收中')
                } else {
                    this.statemsg = $lang('验收中')
                }
            } else {
                this.$message.warning(res.msg);
            }
        },
        methods: {
            changefile() {
                this.changestate = !this.changestate;
            },
            async selectfile(){
                this.changestate = this.changestate;
                let res = await getFile("checked", this.$route.query.id);
                this.$router.push({
                    name: "S_Proview",
                    query: {fileVersion: res.data.fileVersion, url: res.data.url}
                });
            },
            async proview() {
                let res = await getFile("checked", this.$route.query.id);
                this.$router.push({
                    name: "B_Proview",
                    query: {fileVersion: res.data.fileVersion, url: res.data.url}
                });
            },
            async downloadLastFile() {
                let res = await getFile("final", this.$route.query.id);
                var a = document.createElement("a");
                a.href = res.data.url;
                a.download = res.data.fileName;
                var ev = document.createEvent("MouseEvents");
                ev.initEvent("click", false, true);
                a.dispatchEvent(ev);
                await downloaded(this.$route.query.id);
            }
        }
    };
</script>
