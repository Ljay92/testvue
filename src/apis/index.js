import axios from 'axios'
import { addFile } from './files'
//登陆
async function Login({ phone, password }) {
    //var base = new Base64();
    var result = encode(password);
    //alert(result);

    const res = await axios.post(`/user/login`, JSON.stringify({ phone, password }))
    return res.data;
}
//注册
async function Register({ phone, password, userType, code, type }) {
    //var base = new Base64();
    var result = encode(password);
    //alert(result);
    let param = {
        phone: phone,
        password: password,
        userType: userType,
        code: code,
        type: type,
        headUrl: 'http://vsdata.oss-cn-hangzhou.aliyuncs.com/head.jpg'
    }
    const res = await axios.post("/user/register", JSON.stringify(param))
    return res.data;
}
async function UpdateForgetPwd({ phone, password, type, code }) {
    const res = await axios.post("/user/updateForgetPwd", JSON.stringify({ phone, password, type, code }));
    return res.data
}

async function test() {
    const res = await axios.get("/dataSource/getTaskParam")
    return res.data.data;
}
//获取图片验证码
async function ImgageCode(type) {
    const res = await axios.get("/verification/imgageCode?type=" + type)
    return res.data;
}
//获取短信验证码
async function PhoneCode({ phone, type, sessionId, imgCode }) {
    let param = { phone, type, sessionId, imgCode }
    let queryString = "?";
    let b = [];
    Object.keys(param).map((key) => {
        b.push(key + "=" + param[key])
    })
    queryString = queryString + b.join("&")
    const res = await axios.get("/verification/phoneCode" + queryString)
    return res.data;
}



    // private property
    var _keyStr = "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789+/=";

    // public method for encoding
function encode(input) {
        var output = "";
        var chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        var i = 0;
        input = _utf8_encode(input);
        while (i < input.length) {
            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);
            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;
            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }
            output = output +
                _keyStr.charAt(enc1) + _keyStr.charAt(enc2) +
                _keyStr.charAt(enc3) + _keyStr.charAt(enc4);
        }
        return output;
    }


    // private method for UTF-8 encoding
function _utf8_encode(string) {
        string = string.replace(/\r\n/g,"\n");
        var utftext = "";
        for (var n = 0; n < string.length; n++) {
            var c = string.charCodeAt(n);
            if (c < 128) {
                utftext += String.fromCharCode(c);
            } else if((c > 127) && (c < 2048)) {
                utftext += String.fromCharCode((c >> 6) | 192);
                utftext += String.fromCharCode((c & 63) | 128);
            } else {
                utftext += String.fromCharCode((c >> 12) | 224);
                utftext += String.fromCharCode(((c >> 6) & 63) | 128);
                utftext += String.fromCharCode((c & 63) | 128);
            }

        }
        return utftext;
    }




export { Login, Register, UpdateForgetPwd, test, ImgageCode, PhoneCode }
