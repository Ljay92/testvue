<template>
    <div class="content-wrapper">
        <div class="check-accept-wrapper">
            <h3 class="main-title">{{$lang('验收预览')}}</h3>
            <div>
                <iframe style="width: 960px; height: 642px; margin: 0 auto;display: block;" frameBorder="no" border="0"
                        marginwidth="0" marginheight="0" scrolling="no" v-if="iframeSrc" :src="iframeSrc"
                        frameborder="0" allowfullscreen="true" webkitallowfullscreen="true"
                        mozallowfullscreen="true"></iframe>
            </div>
            <div class="star-rating-wrap">
                <h3 class="main-title">{{$lang('星级评价')}}</h3>
                <div class="rating-wrap">
                    <div class="star-rating">
                        <div class="star-rating-item" v-for="(tagLable,index) in tagLableArr"
                             @click="starRating($lang(tagLable.key),index+1)" v-bind:class="{'star-rating-selected': star_num == index+1}">
                            <div class="rating-label1">
                                {{$lang(tagLable.valueExp)}}
                            </div>
                            <div class="rating-label2">
                      <span class="star-img">
                        <img src="/static/img/star-off.png" v-for="i in index+1">
                      </span>
                            </div>
                        </div>
                        <!--<div class="star-rating-item" @click="starRating(2)" v-bind:class="{'star-rating-selected': star_num === 2}">-->
                        <!--<div class="rating-label1">-->
                        <!--不满意-->
                        <!--</div>-->
                        <!--<div class="rating-label2">-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div class="star-rating-item" @click="starRating(3)" v-bind:class="{'star-rating-selected': star_num === 3}">-->
                        <!--<div class="rating-label1">-->
                        <!--合格-->
                        <!--</div>-->
                        <!--<div class="rating-label2">-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div class="star-rating-item" @click="starRating(4)" v-bind:class="{'star-rating-selected': star_num === 4}">-->
                        <!--<div class="rating-label1">-->
                        <!--基本满意-->
                        <!--</div>-->
                        <!--<div class="rating-label2">-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--</div>-->
                        <!--<div class="star-rating-item rating-item-last" @click="starRating(5)" v-bind:class="{'star-rating-selected': star_num === 5}">-->
                        <!--<div class="rating-label1">-->
                        <!--十分满意-->
                        <!--</div>-->
                        <!--<div class="rating-label2">-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--<span class="star-img">-->
                        <!--<img src="/static/img/star-off.png">-->
                        <!--</span>-->
                        <!--</div>-->
                        <!--</div>-->
                    </div>
                    <div class="tag-wrap">
                        <button v-for="(tagLable,index) in tagLableArr" :key="tagLable.key" class="tag-button"
                                @click="tagSelected($lang(tagLable.key),index+1)"
                                v-bind:class="{'tag-button-selected':star_num == index+1}">{{$lang(tagLable.valueExp)}}
                        </button>
                    </div>
                    <div class="reject-reason-wrap" v-show="isReject">
                        <textarea class="reject-reason-input" v-model="textarea" placeholder="请输入驳回理由..."></textarea>
                    </div>
                </div>
            </div>
            <div class="set-btn-wrap">
                <el-button type="sure" @click='toPass'>{{$lang('通过')}}</el-button>
                <el-button type="danger" @click='toReject'>{{submitmsg}}</el-button>
                <el-button type="sure" v-show="isReject" @click='isReject=false;submitmsg=$lang("驳回")'>{{$lang('取消')}}
                </el-button>
            </div>
            <!--<div class="reject-wrap" v-show="isReject">-->
            <!--&lt;!&ndash;<el-input type="textarea" :rows="5" :placeholder="$lang('请输入内容')" v-model="textarea"></el-input>&ndash;&gt;-->
            <!--<div class="set-btn-right">-->
            <!--<el-button type="sure" @click='toReject'>{{$lang('提交')}}</el-button>-->
            <!--<el-button type="danger" @click='isReject=false'>{{$lang('取消')}}</el-button>-->
            <!--</div>-->
            <!--</div>-->
        </div>
    </div>
</template>

<style scoped>
    /* 选择星星个数 */
    .star-rating {
        height: 75px;
        display: flex;
        justify-content: center;
        align-items: stretch;
    }

    .star-rating-item {
        height: 75px;
        border-color: #DDD;
        border-style: solid;
        border-width: 1px;
        border-right-width: 0;
        text-align: center;
        cursor: pointer;
        flex: 1;
    }

    .star-rating-selected {
        background-color: #161f40;
        color: #FFF;
    }

    .rating-item-last {
        border-right-width: 1px;
    }

    .star-rating-wrap {
        text-align: center;
    }

    .rating-wrap {
        display: inline-block;
        text-align: center;
        width: 960px;
    }

    .rating-label1 {
        margin-top: 17px;
    }

    .rating-label2 {
        margin-top: 8px;
    }

    .star-img {

    }

    /* 标签 */
    .tag-wrap {
        height: 75px;
        font-size: 13px;
        color: #161f40;
        display: flex;
        padding-left: 25px;
        padding-right: 25px;
        flex-wrap: wrap;
        justify-content: space-around;
        align-items: center;
    }

    .tag-button {
        border-color: #161f40;
        border-width: 1px;
        border-style: solid;
        border-radius: 3px;
        margin-right: 5px;
        padding-left: 6px;
        padding-right: 6px;
        color: #161f40;
        background-color: #fff;
        height: 25px;
        cursor: pointer;
    }

    .tag-button-selected {
        color: #fff;
        background-color: #161f40;
    }

    /* 驳回理由 */
    .reject-reason-wrap {
        padding-left: 10px;
        padding-right: 10px;
        height: 180px;
    }

    .reject-reason-input {
        width: calc(100% - 20px);
        height: calc(100% - 20px);
        padding: 10px;
    }
</style>

<script>
    import {AccomplishTask, OverruleTask, getReasonParam} from "@/apis/task";
    import {getAllFile} from "@/apis/files";
    import {client} from "@/apis/uploadFile";

    export default {
        data() {
            return {
                submitmsg: $lang('驳回'),
                star_num: 1, //星级评价的星星个数
                tagLableArr: [""],
                label: "", //选中的评价标签
                textarea: "",
                isReject: false,
                iframeSrc: ""
            };
        },
        async mounted() {
            const fileData = await getAllFile("checked", this.$route.query.id);
            let info = (fileData.data || []).sort(
                (a, b) => (new Date(a.createTime) > new Date(b.createTime) ? -1 : 1)
            )[0];

            if (info) {
                if (info.fileVersion == "__path__" || info.url.includes("index.html")) {
                    this.iframeSrc = info.url;
                } else {
                    this.iframeSrc = `http://vsdata.oss-cn-hangzhou.aliyuncs.com/untity/${info.fileVersion}/index.html?vsdata=${info.url}`;
                }
            } else {
                this.$message.warning($lang("未找到文件"));
            }

            let res = await getReasonParam('b_user');
            this.tagLableArr = res.data.score;
            this.label = res.data.score[0].key;
        },
        methods: {
            async toPass() {
                const id = this.$route.query.id;
                console.log(this.label)
                const res = await AccomplishTask(id,this.label);
                this.$message({
                    message: res.msg,
                    type: res.success ? "success" : "error",
                    onClose: () => {
                        if (res.success) {
                            this.$router.go(-1);
                        }
                    }
                });
            },
            async toReject() {
                let that = this;
                if (that.isReject) {
                    const id = this.$route.query.id;
                    console.log(this.textarea)
                    if (this.textarea=='') {
                        this.$message.warning($lang("驳回内容不可为空"));
                        return;
                    }
                    const res = await OverruleTask(id, this.textarea,this.label);
                    this.$message({
                        message: res.msg,
                        type: res.success ? "success" : "error",
                        onClose: () => {
                            if (res.success) {
                                this.$router.go(-1);
                            }
                        }
                    });
                } else {
                    that.isReject = true;
                    that.submitmsg = $lang('提交')
                }
            },
            fullScreen() {
                let iframe = this.$refs.demo;
                (iframe.requestFullScreen ||
                    iframe.webkitRequestFullScreen ||
                    iframe.mozRequestFullScreen
                ).call(iframe);
            },
            //评价星星个数
            starRating(id,star_num) {
                const t = this;
                t.label=id;
                t.star_num = star_num;
            },
            //评价标签
            tagSelected(id, index) {
                const t = this;
                t.star_num = index;
                t.label=id;
            }
        }
    };
</script>
