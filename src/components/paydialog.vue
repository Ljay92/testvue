<template>
    <el-dialog title="支付" :visible.sync="payDialogstatus" size="tiny" :before-close="payDialogClose">
        <div class="pay-dialog-wrap">
            <hr style="border-top:1px dashed #000">
            <!--点击申请支付后 付款-->
            <div class="payment-method-wrap" style="width:80%;margin:0 auto;">
                <!--<p class="yebz-tips" v-if="payDialogCashType == 3 && totalMoney < payDialogTotal">-->
                <!--*{{$lang('余额不足请充值。')}}</p>-->
                <div class="zffs-div">
                    <p style="line-height:30px;font-size:16px;">默认选择支付</p>
                    <ul class="clearfix" style="margin-top:-10px;">
                        <li class="zffs-li" :class="payDialogCashType==3?'active':''" @click="yepay">
                                <span class="zf-ye">
                                    <i></i>
                                </span>
                            <p>{{$lang('余额支付')}}</p>
                        </li>
                    </ul>
                    <div style="text-align: center;font-size:16px;margin-bottom:10px;">{{$lang('余额')}}：{{totalMoney}}
                        元
                    </div>
                    <p class="yebz-tips">*余额不足时，可以选择余额+支付宝/微信支付，或者直接支付宝、微信支付</p>
                    <ul class="clearfix">
                        <li class="zffs-li" :class="paystatus==2||paystatus==5?'active':''" @click="zfbpay">
                                <span class="zf-zfb">
                                    <i></i>
                                </span>
                            <p>{{$lang('支付宝支付')}}</p>
                        </li>
                        <li class="zffs-li" :class="paystatus==1||paystatus==4?'active':''" @click="wxpay">
                                <span class="zf-wx">
                                    <i></i>
                                </span>
                            <p>{{$lang('微信支付')}}</p>
                        </li>
                    </ul>
                    <div style="font-size:16px;">付款金额：<span style="color:deepskyblue">{{orderprice}}</span><span
                            style="font-size:12px;">元</span>（{{paymsg}}）
                    </div>
                </div>
                <div class="payment-btn-wrap">
                    <el-button type="sure" @click="payDialogCashTypeToPay">{{$lang('付款')}}</el-button>
                </div>
            </div>
        </div>
    </el-dialog>
</template>

<script>
    import {
        addRecharge,
        getAliapyInfo,
        createWXPayOrder,
        checkByOrderId,
        getMoney,
        cancelOrder,
        addAtms,
        balancePay
    } from "@/apis/money";
    import {getUser} from "@/apis/storage";
    import axios from "axios";

    export default {
        name: "paydialog",
        data() {
            return {
                totalMoney: 0,
                paystatus: 3,
                payDialogCashType: 3,
                WXPayOrderId: "",
                WXPayImgShow: false,
                WXImgSrc: "",
                WXPayTimes: "",
                paymsg: ''
            }
        },
        props: {
            payDialogstatus: {
                type: Boolean
            },
            orderidArr: {
                type: Array
            },
            orderprice: {
                type: Number
            }
        },
        created() {
            this.getTotalMoney();
        },
        methods: {
            //我的资金
            async getTotalMoney() {
                const me = this;
                let userId = getUser().userId;
                ;
                const moneyData = await getMoney({userId});
                if (moneyData.success) {
                    me.totalMoney = moneyData.data.money;
                    if (me.orderprice > me.totalMoney) {
                        me.paymsg = '余额：' + me.totalMoney + '元，请在选择补充支付类型';
                    } else {
                        me.paymsg = '余额：' + moneyData.data.money + '元';
                    }
                }
            },
            yepay() {
                if (this.paystatus == 3) {
                    this.payDialogCashType = ''
                    this.paystatus = ''
                    this.paymsg = '请选择支付类型';
                } else {
                    this.payDialogCashType = 3
                    this.paystatus = 3
                    if (this.orderprice > this.totalMoney) {
                        this.paymsg = '余额：' + this.totalMoney + '元，请在选择补充支付类型';
                    } else {
                        this.paymsg = '余额：' + this.orderprice + '元';
                    }
                }
            },
            zfbpay() {
                if (this.payDialogCashType == 3) {
                    if (this.orderprice > this.totalMoney) {
                        this.paystatus = 5;
                        this.paymsg = '余额：' + this.orderprice + '元、支付宝：' + parseFloat(this.orderprice - this.totalMoney).toFixed(2) + '元';
                    } else {
                        this.$message.error('您的余额足够支付。');
                    }
                } else if (this.payDialogCashType == '') {
                    if (this.paystatus == 2) {
                        this.paystatus = '';
                        this.paymsg = '请选择支付类型';
                    } else {
                        this.paystatus = 2;
                        this.paymsg = '支付宝：' + this.orderprice + '元';
                    }
                }
            },
            wxpay() {
                if (this.payDialogCashType == 3) {
                    if (this.orderprice > this.totalMoney) {
                        this.paystatus = 4;
                        this.paymsg = '余额：' + this.totalMoney + '元、微信：' + parseFloat(this.orderprice - this.totalMoney).toFixed(2) + '元';
                    } else {
                        this.$message.error('您的余额足够支付。');
                    }
                } else if (this.payDialogCashType == '') {
                    if (this.paystatus == 1) {
                        this.paystatus = '';
                        this.paymsg = '请选择支付类型';
                    } else {
                        this.paystatus = 1;
                        this.paymsg = '微信：' + this.orderprice + '元';
                    }
                }
            },
            WXPayImgClose() {
                const me = this;
                me
                    .$confirm($lang("确认取消支付？"))
                    .then(data => {
                        if (data == "confirm") {
                            me.WXImgSrc = "";
                            me.WXPayOrderId = "";
                            me.WXPayImgShow = false;
                            clearInterval(me.WXPayTimes);
                        }
                    })
                    .catch(data => {
                    });
            },
            async queryWXPayState() {
                const me = this;
                const orderId = me.WXPayOrderId;
                const WXPayState = await checkByOrderId({orderId, type: 2});
                if (WXPayState.data.state == "2") {
                    me.$message.success($lang("支付成功"));
                    clearInterval(me.WXPayTimes);
                    me.WXPayImgShow = false;
                    me.WXImgSrc = "";
                    me.operateType = "index";
                    me.getTotalMoney();
                    me.rechargeList();
                } else if (WXPayState.data.state == "3") {
                    me.$message.error($lang("支付失败"));
                    clearInterval(me.WXPayTimes);
                    me.WXPayImgShow = false;
                    me.WXImgSrc = "";
                    me.operateType = "index";
                }
            },
            async payDialogCashTypeToPay() {
                const me = this;
                const res = await checkByOrderId({orderId: me.orderId, type: 1});
                if (me.paystatus == 3) {
                    //余额支付
                    if (me.totalMoney < me.orderprice) {
                        me.$message($lang("余额不足"));
                        return;
                    }
                    me
                        .$confirm($lang("确定用余额支付") + me.orderprice + $lang("元"))
                        .then(async data => {
                            if (data == "confirm") {
                                const data = await balancePay({orderId: res.data.orderId});
                                if (data.success) {
                                    me.$message($lang("操作成功"));
                                    setTimeout(function () {
                                        me.$router.push({
                                            name: "B-userInfo-bag",
                                            query: {id: getUser().userId, index: 3}
                                        });
                                        history.go(0);
                                    }, 200);
                                } else {
                                    me.$message.error(data.msg);
                                }
                            }
                        })
                        .catch(data => {
                        });
                }
                if (me.paystatus == 1) {
                    //支付宝支付
                    const alipayData = await getAliapyInfo({
                        outTradeNo: res.data.orderId,
                        subject: $lang("订单支付：") + res.data.orderId,
                        totalFee: res.data.total,
                        body: `1&&${location.href}`
                    });
                    let div = document.createElement("div");
                    div.innerHTML = alipayData.data;
                    document.body.appendChild(div);
                    document.forms["alipaysubmit"].submit();
                }
                if (me.paystatus == 2) {
                    //微信支付
                    me.WXPayImgShow = true;
                    me.WXImgSrc = `${axios.defaults.baseURL}/wxpay/createOrder?orderId=${res
                        .data.orderId}&attach=1`;
                    me.WXPaying = true;
                    me.WXPayTimes = setInterval(me.queryWXPayState, 5000);
                }
                if (me.paystatus == 4) {
                    me
                        .$confirm($lang("确定用余额支付") + me.totalMoney + $lang("元，微信支付") + parseFloat(me.orderprice - me.totalMoney).toFixed(2) + '元')
                        .then(async data => {
                            if (data == "confirm") {
                                const data = await balancePay({orderId: res.data.orderId});
                                if (data.success) {
                                    me.$message($lang("操作成功"));
                                    const alipayData = await getAliapyInfo({
                                        outTradeNo: res.data.orderId,
                                        subject: $lang("订单支付：") + res.data.orderId,
                                        totalFee: res.data.total,
                                        body: `1&&${location.href}`
                                    });
                                    let div = document.createElement("div");
                                    div.innerHTML = alipayData.data;
                                    document.body.appendChild(div);
                                    document.forms["alipaysubmit"].submit();
                                } else {
                                    me.$message.error(data.msg);
                                }
                            }
                        })
                        .catch(data => {
                        });
                }
                if (me.paystatus == 5) {
                    me
                        .$confirm($lang("确定用余额支付") + me.totalMoney + $lang("元，微信支付") + parseFloat(me.orderprice - me.totalMoney).toFixed(2) + '元')
                        .then(async data => {
                            if (data == "confirm") {
                                const data = await balancePay({orderId: res.data.orderId});
                                if (data.success) {
                                    me.$message($lang("操作成功"));
                                    me.WXPayImgShow = true;
                                    me.WXImgSrc = `${axios.defaults.baseURL}/wxpay/createOrder?orderId=${res
                                        .data.orderId}&attach=1`;
                                    me.WXPaying = true;
                                    me.WXPayTimes = setInterval(me.queryWXPayState, 5000);
                                } else {
                                    me.$message.error(data.msg);
                                }
                            }
                        })
                        .catch(data => {
                        });
                }
            },
            payDialogClose() {
                const me = this;
                me
                    .$confirm($lang("确认取消支付？"))
                    .then(data => {
                        if (data == "confirm") {
                            me.$emit('status', false)
                        }
                    })
                    .catch(data => {
                    })
            }
        }
    }
</script>

<style scoped>

</style>