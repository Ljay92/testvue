<template>
    <div class="chart-wrpaper clearfix">
        <div class="chart-left">
            <div class="box-flex-media-box">
                <div class="flex1 chart-left-title">
                    <h3>{{taskInfo.projectName}}</h3>
                </div>
                <el-button type="sure" @click="$router.push({name:'toEdit',query:$route.query})">{{$lang('编辑任务')}}
                </el-button>
                <el-button type="sure" @click="toRedirectT">{{$lang('查看任务')}}&gt;</el-button>
            </div>
            <div class="chart-left-list">
                <ul class="chart-left-ul">
                    <!--补充资料-->
                    <!--<li class="chart-left-li">-->
                        <!--<div class="box-flex-media-box cl-top">-->
                            <!--<a href="javascript:;" class="title flex1">-->
                                <!--<h4>{{$lang('待补充资料')}}</h4>-->
                            <!--</a>-->
                        <!--</div>-->
                        <!--<ul class="chose-people-ul" v-if="getChilds(0).length">-->
                            <!--<li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(0)" :key="i">-->
                                <!--<div class="flex1">-->
                                    <!--<div class="box-flex-media-box">-->
                                        <!--<p class="user-header">-->
                                            <!--<img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>-->
                                        <!--</p>-->
                                        <!--<p class="name">{{m.projectName}}</p>-->
                                    <!--</div>-->
                                <!--</div>-->
                                <!--&lt;!&ndash;<a href="javascript:;" class="more" @click="changStateToPay(m.id)">{{$lang('确认')}}&gt;</a>&nbsp;&nbsp;&nbsp;&ndash;&gt;-->
                                <!--<a href="javascript:;" class="more"-->
                                   <!--@click="$router.push({name:'S_SonTaskInfo',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>-->
                            <!--</li>-->
                        <!--</ul>-->
                    <!--</li>-->

                    <!--待确认-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('待确认')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(0).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(0)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="changStateToPay(m.id)">{{$lang('确认')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_SonTaskInfo',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--待支付-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4 class="height70">{{$lang('待支付')}}</h4>
                            </a>

                            <el-button :disabled="getChilds(1).length === 0" type="sure" @click="openOfferFormDialog(getChilds(1),'待支付')">报价单</el-button>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(1).length">
                            <el-checkbox-group v-model="zhifuIds">
                                <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(1)" :key="i">
                                    <div class="flex1">
                                        <div class="box-flex-media-box">
                                            <p class="user-header">
                                                <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                            </p>
                                            <p class="name" style="width:50px;">{{m.projectName}}</p>
                                            <p style="text-align:center;width:120px;"><CountDown :time="m.payEndTime" type="pay" :id="m.id"></CountDown></p>
                                        </div>
                                    </div>
                                    <div class="moey">
                                        <p>{{'￥' + m.total}}</p>
                                    </div>
                                    <a href="javascript:;" class="more"
                                       @click="$router.push({name:'S_SonTaskInfo',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>
                                </li>
                            </el-checkbox-group>
                        </ul>
                    </li>
                    <!--征集中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('征集中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(2).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(2)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name" style="width:50px;">{{m.projectName}}</p>
                                        <p style="text-align:center;width:120px;"><CountDown :time="m.entryEndTime" type="entry" :id="m.id"></CountDown></p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'toFenPei',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more"
                                   @click="openApplyRefund(m.id)">{{$lang('申请退款')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--制作中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('制作中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(3).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(3)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>

                                <el-button  type="sure" @click="openModifyEndTimeDialog(m.id)">申请修改结束时间</el-button>


                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'toFenPei',query: { id: m.id, state: 5 }})">{{$lang('重新指派')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more"
                                   @click="openApplyRefund(m.id)">{{$lang('申请退款')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--S验收中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('S验收中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(4).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(4)" :key="i" v-show="m.sSubmitAcceptance==1">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_TaskCheck',query: { id: m.id, taskId:m.taskId }})">{{$lang('去验收')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>
                    <!--B验收中-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('B验收中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(4).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(4)" :key="i" v-show="m.sSubmitAcceptance==0">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_TaskCheck',query: { id: m.id, taskId:m.taskId }})">{{$lang('去验收')}}&gt;</a>&nbsp;&nbsp;&nbsp;
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--完成-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('完成')}}</h4>
                            </a>

                            <el-button :disabled="getChilds(5).length === 0" type="sure" @click="openOfferFormDialog(getChilds(5),'已完成')">报价单</el-button>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(5).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(5)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <div class="moey">
                                    <p>{{'￥' + m.total }}</p>
                                </div>
                                <a href="javascript:;" class="more" @click="toShowPay(i)" style="margin-right:20px">{{$lang('去打款')}}</a>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>

                    <!--已打款-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('已打款')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(6).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(6)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>
                    <!--"退款申请中"-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('退款申请中')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(7).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(7)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>
                    <!--已关闭-->
                    <li class="chart-left-li">
                        <div class="box-flex-media-box cl-top">
                            <a href="javascript:;" class="title flex1">
                                <h4>{{$lang('已关闭')}}</h4>
                            </a>
                        </div>
                        <ul class="chose-people-ul" v-if="getChilds(8).length">
                            <li class="chose-people-li box-flex-media-box" v-for="(m,i) in getChilds(8)" :key="i">
                                <div class="flex1">
                                    <div class="box-flex-media-box">
                                        <p class="user-header">
                                            <img :src="`${m.url}?x-oss-process=image/resize,w_50,h_50`"/>
                                        </p>
                                        <p class="name">{{m.projectName}}</p>
                                    </div>
                                </div>
                                <a href="javascript:;" class="more"
                                   @click="$router.push({name:'S_ChatD',query: { id: m.id,isOnlyChat:true }})">{{$lang('查看')}}&gt;</a>
                            </li>
                        </ul>
                    </li>
                </ul>
            </div>
        </div>
        <div v-if="Object.keys(chatConfig).length>0">
            <Chat ref="chat" :chatConfig="chatConfig" :isReserve="true"></Chat>
        </div>
        <div v-else class="chart-right" style="background: none">
            <div class="chart-msg">{{msg}}</div>
        </div>
        <!--去支付弹层-->
        <el-dialog :title="$lang('支付')" :visible.sync="dialogVisible" size="tiny" :before-close="handleClose">
            <div class="pay-dialog-wrap">
                <!--申请支付-->
                <div class="apply-payment-wrap" style="display:none;">
                    <div class="apply-people-wrap">
                        <h4 class="title-h4-dig">{{$lang('确定任务：')}}</h4>
                        <div class="apply-pay-people">
                            <div class="box-flex-media-box" v-for="(m,i) in getChilds(5)" :key="i">
                                <p class="user-header">
                                    <img :src="m.vUserInfo ? m.vUserInfo.headUrl : ''"/>
                                </p>
                                <p class="name">{{m.projectName}}</p>
                            </div>
                            <!--<div class="box-flex-media-box">-->
                            <!--<p class="user-header"><img src="../../assets/images/user-header.png"/></p>-->
                            <!--<p class="name">{{$lang('呵呵哈哈')}}</p>-->
                            <!--</div>-->
                        </div>
                    </div>
                    <div class="money-num">
                        <p>{{$lang('付款金额')}}：
                            <em>2000</em>元</p>
                    </div>

                    <!--申请付款 和 已发起付款 两种选择-->
                    <div class="fqfk-wrap">
                        <span>{{$lang('已发起付款')}}</span>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure">{{$lang('申请支付')}}</el-button>
                    </div>
                </div>

                <!--点击申请支付后 付款-->
                <div class="payment-method-wrap">
                    <div class="box-flex-media-box">
                        <p class="flex1">{{$lang('付款金额')}}：
                            <em>{{toPayMoney}}</em>{{$lang('元')}}</p>
                        <div class="pm-cz-btn">
                            <div class="box-flex-media-box">
                                <el-button type="sure">{{$lang('充值')}}</el-button>
                                <p class="marg-left-10">{{$lang('余额：400 元')}}</p>
                            </div>
                        </div>
                    </div>
                    <p class="yebz-tips">*{{$lang('余额不足请充值。')}}</p>
                    <div class="zffs-div">
                        <ul class="clearfix">
                            <li class="zffs-li active">
                                <span class="zf-zfb">
                                    <i></i>
                                </span>
                                <p>{{$lang('支付宝支付')}}</p>
                            </li>
                            <li class="zffs-li">
                                <span class="zf-wx">
                                    <i></i>
                                </span>
                                <p>{{$lang('微信支付')}}</p>
                            </li>
                            <li class="zffs-li">
                                <span class="zf-ye">
                                    <i></i>
                                </span>
                                <p>{{$lang('余额支付')}}</p>
                            </li>
                        </ul>
                    </div>
                    <div class="payment-btn-wrap">
                        <el-button type="sure" @click="toPay">{{$lang('付款')}}</el-button>
                    </div>
                </div>
            </div>
        </el-dialog>
        <SlideBtns :type="'back'"></SlideBtns>

        <el-dialog :title="$lang('申请修改结束时间')" size="tiny" :visible.sync="dialog.modifyEndTime.show">
            <el-date-picker type="datetime" v-model="dialog.modifyEndTime.form.Time" :placeholder="$lang('请选择时间')" format='yyyy-MM-dd HH' style="width:100%" @change="changeTime">
            </el-date-picker>
        </el-dialog>

        <el-dialog :title="$lang('申请退款')" size="tiny" :visible.sync="dialog.applyRefund.show">
            <el-form :model="dialog.applyRefund.form" :rules="dialog.applyRefund.rules" ref="form">
                <el-form-item :label="$lang('百分比：')" prop="percent">
                    <el-input type="text" class="percent" v-model.trim="dialog.applyRefund.form.percent">
                        <template slot="append">%</template>
                    </el-input>
                </el-form-item>
                <el-form-item :label="$lang('退款原因：')" prop="reason">
                    <el-input type="textarea" :rows="4" v-model.trim="dialog.applyRefund.form.reason"></el-input>
                </el-form-item>
            </el-form>
            <span slot="footer">
                <el-button type="primary" @click="applyRefund">{{$lang('确 定')}}</el-button>
            </span>
        </el-dialog>

        <el-dialog :title="$lang('报价单')" ref="offerForm" :visible.sync="offerFormDialogVisible" size="small">
            <table v-if="offerList&&offerList.length" class="offer-form-table" border="1" style="width: 100%">
                <thead>
                <tr>
                    <td>序号</td>
                    <td>缩略图</td>
                    <td>任务名称</td>
                    <td>V端佣金</td>
                    <td>S端服务费</td>
                    <!--<td>平台服务</td>-->
                    <td>任务详情</td>
                    <td>小计</td>
                </tr>
                </thead>
                <tbody>
                <tr v-for="(item,i) in offerList">
                    <td>{{i +1}}</td>
                    <td><img :src="item.url" alt="" height="30px"></td>
                    <td>{{item.projectName}}</td>
                    <td>{{item.total}}</td>
                    <td>{{item.sServiceMoney}}</td>
                    <!--<td>{{item.flatServiceMoney}}</td>-->
                    <td></td>
                    <td>{{item.twoTotalMoney}}</td>
                </tr>
                <tr>
                    <td colspan="6">总计</td>
                    <td>{{offerTotal}}</td>
                </tr>
                </tbody>
            </table>
            <div class="no-data" v-if="!offerList||offerList.length ===0">
                暂无数据!
            </div>
            <div v-if="offerList&&offerList.length" style="text-align: center;margin-top: 20px">
                <el-button @click="downloadExcel" type="sure">导出EXCEL</el-button>
            </div>
        </el-dialog>
    </div>
</template>

<style>
    .chart-wrpaper .el-checkbox__label {
        display: none;
    }

    .percent {
        width: 100px;
    }

    .shoujiicon {
        width: 15px;
        height: 20px;
        margin-left: 20px;
        position: relative;
        top: 2px;
    }

    /*报价单样式*/
    .offer-form-table{
        text-align: center;
        border: none;
    }

    .offer-form-table thead td{
        background-color: #161f40;
        color: #fff;
    }

    .offer-form-table tr>td{
        border-color: #666;
        height: 40px;
    }

    .offer-form-table tr>td:first-child{
        border-left: none;
    }

    .offer-form-table tr>td:last-child{
        border-right: none;
    }
</style>

<script>
    import Chat from "@/components/Chat";
    import CountDown from "@/components/countdown";
    import SlideBtns from "@/components/SlideBtns";
    import moment from "moment";
    import {
        ChildTaskList,
        ChildTaskState,
        TaskInfoById,
        PayChildTask,
        getTalkByGroupId,
        UpdateChildTask,
        UpdateChildTaskForSure,
        applyRefund,
        taskDownloadExcel,
        changeTime
    } from "@/apis/task";
    import {SToVpayMoney, SToVTopayMoney} from "@/apis/money";
    import {getUser} from '@/apis/storage';

    var shouji = require("../../assets/images/phone.jpg");
    export default {
        components: {Chat, SlideBtns,CountDown},
        data () {
            return {
                acceptancemsg:$lang('验收中'),
                zhifuIds: [],
                dialogVisible: false, //去支付
                stateGroup: [],
                taskInfo: {},
                // tabState:0,
                // tabState1: false,
                // tabState2: false,
                // tabState3: false,
                // tabState4: false,
                // tabState5: false,
                // tabState6: false,
                // tabState7:false,
                // tabState8:false,
                // tabState9:false,
                // targetUser:{},
                // myUser:{},
                toPayMoney: "",
                toPayId: "",
                msg: $lang("正在加载聊天..."),
                chatConfig: {},

                dialog: {
                    modifyEndTime:{
                        show: false,
                        form: {
                            Time: '',
                            changeTimeId:''
                        },
                    },
                    applyRefund: {
                        show: false,
                        form: {
                            id: null,
                            reason: "",
                            percent: 100
                        },
                        rules: {
                            reason: [
                                {required: true, message: $lang("请填写退款原因"), trigger: "blur"}
                            ],
                            percent: [
                                {
                                    validator (rule, value, callback) {
                                        if (value > 0 && value <= 100) {
                                            callback();
                                        } else {
                                            callback(new Error($lang("百分比在0~100之间(不包括0)")));
                                        }
                                    },
                                    trigger: "change"
                                }
                            ]
                        }
                    }
                },
                // 报价单模态框
                offerFormDialogVisible: false,
                // 报价单数据
                offerList: [],
                offerTotal: 0,
                // 当前报价单的状态类型
                currentExcelState: ''
            };
        },
        async mounted () {
            // alert(this.tabState)
            let id = this.$route.query.id;
            if (id.indexOf("SubTask-") > -1) {
                id = this.$route.query.taskId;
            }
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
                    //const LoginUser = JSON.parse(localStorage.getItem('LoginUser'));
                    //let bUserType = LoginUser.bUserType || "0";
                    //let name = '';
                    // if (bUserType === '1') {
                    //     name = qq.data.targetUser.info.nickName + '/' + qq.data.targetUser.info.name;
                    // } else {
                    //     name = qq.data.targetUser.info.name;
                    // }

                    var showNmae = qq.data.targetUser.info.nickName;

                    // alert('bbbbbb');
                    // alert(qq.data.targetUser.info.name);
                    // alert(qq.data.targetUser.info.nickName);

                    if(qq.data.targetUser.info.bUserType === '1' && qq.data.targetUser.userType === 'B'){
                        showNmae = qq.data.targetUser.info.name + '/' + qq.data.targetUser.info.nickName;
                    }


                    this.chatConfig = {
                        groupid: qq.data.groupDetails.data[0].id,
                        userid: qq.data.sChatUser.entities[0].username,
                        userimg: qq.data.sUser.info.headUrl,
                        userRole: "S",
                        userphone: qq.data.sUser.phone,
                        username: qq.data.sUser.info.nickName || qq.data.sUser.phone,
                        youname:
                        showNmae +
                        '<img class="shoujiicon" src="' +
                        shouji +
                        '" /> ' +
                        qq.data.targetUser.phone,
                        youimg: qq.data.targetUser.info.headUrl,
                        youRole: "B",
                        youphone: qq.data.targetUser.phone,
                        id: id
                    };
                } else {
                    this.msg = $lang("聊天相关数据出现异常");
                }
            } else {
                this.msg = qq.msg;
            }
            const re = await TaskInfoById(id);
            if (re.success) {
                this.taskInfo = re.data;
            }
            const stateGroup = [];
            const res = await ChildTaskList(id);
            if (res.success) {
                const list = res.data ? res.data : [];
                ChildTaskState("S").map((value, i) => {
                    const model = {
                        name: value,
                        childs: []
                    };
                    list.forEach(item => {
                        if (i == item.state) {
                            model.childs.push(item);
                        }
                    });
                    stateGroup.push(model);
                });
                stateGroup[2].childs = stateGroup[2].childs.concat(stateGroup[3].childs);

                stateGroup.splice(3, 1);
                stateGroup.shift();
                // console.log("stateGroup", stateGroup);

                this.stateGroup = stateGroup;
                console.log(this.getChilds(4))
            } else {
                this.$message.warning(res.msg);
            }
        },
        methods: {
            async changeTime(){
                const Time = this.dialog.modifyEndTime.Time;
                const id = this.dialog.modifyEndTime.changeTimeId;
                const res = await changeTime(id, moment(Time).format("YYYY-MM-DD HH:mm:ss"));
                if (res.success) {
                    this.$message($lang("修改成功"));
                    task.taskEndTime = task._taskEndTime;
                } else {
                    this.$message(res.msg);
                }
            },
            changStateToPay (id) {
                const me = this;
                me
                    .$confirm($lang(`是否确定该子任务？`), $lang("提示"), {
                        confirmButtonText: $lang("确定"),
                        cancelButtonText: $lang("取消"),
                        type: "warning"
                    })
                    .then(async () => {
                        const res = await UpdateChildTaskForSure({id}, 2);
                        //                    console.log(res)
                        if (res.success) {
                            me.$message({
                                type: "success",
                                message: $lang("修改成功!")
                            });
                            history.go(0);
                        } else {
                            me.$message.error(res.msg);
                        }
                    })
                    .catch(() => {
                    });
            },
            toPay () {
                const id = this.zhifuIds[0];
                PayChildTask(id).then(res => {
                    alert(res.msg);
                });
            },
            getChilds (index) {
                return this.stateGroup[index] ? this.stateGroup[index].childs : [];
            },
            handleClose () {
                this.dialogVisible = false;
            },
            toRedirectT () {
                this.$router.push({
                    name: "toFinally",
                    query: {id: this.$route.query.taskId || this.$route.query.id}
                });
            },
            toRedirect (name, id) {
                this.$router.push({name, query: {id}});
            },
            async toShowPay (index) {
                const me = this;
                //                const res = await SToVpayMoney({id});
                //                console.log(res);
                const money = me.getChilds(5)[index].total;
                const id = me.getChilds(5)[index].id;
                const payInfo = await SToVTopayMoney({id});
                //                console.log(payInfo);
                //                me.$confirm(`打款支付${payInfo.data.money}？(总额百分比${payInfo.data.remitRatio || 0})`, '提示', {
                me
                    .$confirm(
                        `打款支付${payInfo.data.money}？(总价:${money}，折扣：${(1 -
                            payInfo.data.remitRatio
                        ).toFixed(2) *
                        100 +
                        "%"}，实际:${payInfo.data.money})`,
                        "提示",
                        {
                            confirmButtonText: "确定",
                            cancelButtonText: "取消",
                            type: "warning"
                        }
                    )
                    .then(async () => {
                        const res = await SToVpayMoney({id});
                        //                    console.log(res);
                        if (res.success) {
                            me.$message({
                                type: "success",
                                message: $lang("打款成功!")
                            });
                            history.go(0);
                        }
                    })
                    .catch(() => {
                        me.$message({
                            type: "info",
                            message: $lang("打款未成功")
                        });
                    });
            },
            openApplyRefund (id) {
                this.dialog.applyRefund.form.id = id;
                this.dialog.applyRefund.form.reason = "";
                this.dialog.applyRefund.form.percent = 100;
                this.dialog.applyRefund.show = true;
            },
            applyRefund () {
                this.$refs.form.validate(async v => {
                    if (v) {
                        const res = await applyRefund(
                            this.dialog.applyRefund.form.id,
                            this.dialog.applyRefund.form.percent,
                            this.dialog.applyRefund.form.reason
                        );
                        if (res.success) {
                            this.$message.success($lang("申请成功"));
                            this.dialog.applyRefund.show = false;
                            location.reload();
                        } else {
                            this.$message.error(res.msg);
                        }
                    }
                });
            },

            // 打开报价单模态框
            openOfferFormDialog (data, state) {
                // 重置报价单总计为0，预置导出excel的任务状态，例如已完成
                this.offerTotal = 0;
                this.currentExcelState = state;

                this.offerList = data;
                this.offerList.forEach(item => {
                    this.offerTotal += item.twoTotalMoney;
                });

                this.offerFormDialogVisible = true;
            },

            openModifyEndTimeDialog (id){
                this.dialog.modifyEndTime.show = true;
                this.dialog.modifyEndTime.changeTimeId=id;
            },
            downloadExcel () {
                taskDownloadExcel({task_id:this.taskInfo.id,state:this.currentExcelState}).then(res => {

                })
            }
        }
    };
</script>
