<template>
    <span>{{countdownmsg}}</span>
</template>

<script>
    import {timingPay, timingEntry} from "@/apis/money";
    export default {
        name: "countdown",
        props: {
            time: {
                type: String
            },
            type:{
                type:String
            },
            id:{
                type:String
            }
        },
        data() {
            return {
                counttime: {
                    d: '0',
                    h: '00',
                    m: '00',
                    s: '00'
                },
                countdownmsg: '',
                out: true
            }
        },
        async mounted() {
            let that = this;
            let _time = that.time;
            let timer = setInterval(function () {
                const now = new Date().getTime();
                const end = new Date(_time).getTime();
                const leftTime = end - now;
                if (leftTime > 0) {
                    that.counttime.d = Math.floor(leftTime / 1000 / 60 / 60 / 24);
                    that.counttime.h = Math.floor(leftTime / 1000 / 60 / 60 % 24) < 10 ? '0' + Math.floor(leftTime / 1000 / 60 / 60 % 24) : Math.floor(leftTime / 1000 / 60 / 60 % 24);
                    that.counttime.m = Math.floor(leftTime / 1000 / 60 % 60) < 10 ? '0' + Math.floor(leftTime / 1000 / 60 % 60) : Math.floor(leftTime / 1000 / 60 % 60);
                    that.counttime.s = Math.floor(leftTime / 1000 % 60) < 10 ? '0' + Math.floor(leftTime / 1000 % 60) : Math.floor(leftTime / 1000 % 60);
                    that.countdownmsg = that.counttime.d + '天' + that.counttime.h + '时' + that.counttime.m + '分' + that.counttime.s + '秒'
                } else {
                    if (that.out) {
                        that.countdownmsg = '已结束';
                        clearInterval(timer);
                        if(that.type=='pay'){
                            that.timingPay(that.id)
                        }else if(that.type=='entry'){
                            that.timingEntry(that.id)
                        }
                    }
                }
            }, 1000)//获取当前时间
        },
        methods: {
            async timingPay(id){
                const res = await timingPay({id});
                console.log(res)
            },
            async timingEntry(id){
                const res = await timingEntry({id});
                console.log(res)
            }
        }
    }
</script>

<style scoped>

</style>