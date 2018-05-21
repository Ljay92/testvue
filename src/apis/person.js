import axios from 'axios'


//***传入d做修改，没有传入id做新增（userId必填）
//V端用户修改个人信息
async function UpdateInfoV({ nickName, contact, profile, userId, id }) {
    const res = await axios.post(`/userinfo/update`, { nickName, contact, profile, userId, id })
    return res.data;
}
//V端个人中心 工作区间
async function UpdateWorkIntervalV({ workInterval, userId, id }) {
    const res = await axios.post(`/userinfo/update`, JSON.stringify({ workInterval, userId, id }))
    return res.data;
}
//V端个人中心 身份验证
async function ValidityV({ realName, cardId, validity, userId, id }) {
    const res = await axios.post(`/userinfo/update`, { realName, cardId, validity, userId, id })
    return res.data;
}
//V端个人中心 身份验证
async function ReValidityV({ realName, cardId, validity, userId, id }) {
    const res = await axios.post(`/userinfo/updateUserInfoTemp`, { realName, cardId, validity, userId, id })
    return res.data;
}
//V端个人中心 修改密码
async function UpdatePwdV({ oldPwd, newPwd, surePwd, userId }) {
    const res = await axios.post(`/user/updatePwd`, { oldPwd, newPwd, surePwd, userId })
    return res.data;
}
//V端个人中心 擅长领域
async function TsechnologyV({ expertise, scebe, technology, userId }) {
    const res = await axios.post(`/userinfo/save`, { expertise, scebe, technology, userId })
    return res.data;
}
//V端个人中心 作品集列表
async function WorkCollectionV({ userId }) {
    const res = await axios.post(`/workCollection/getByUser`, JSON.stringify({ userId }))
    return res.data;
}
async function SaveWorkCollectionV({ worksName, worksEndTime }) {
    const res = await axios.post('/workCollection/save', JSON.stringify({ worksName, worksEndTime }))
    return res.data
}
async function UpdateWorkCollectionV({ worksName, worksEndTime, id }) {
    const res = await axios.post('/workCollection/update', JSON.stringify({ worksName, worksEndTime, id }))
    return res.data
}
//V端个人中心 验证个人信息是否存在
async function CheckUserInfoV({ userId }) {
    const res = await axios.get("/userinfo/checkUserInfo?userId=" + userId)
    return res.data;
}
//V端个人中心 验证个人信息是否存在
async function ReCheckUserInfoV({ userId }) {
    const res = await axios.get("/userinfo/checkUserInfoTemp?userId=" + userId)
    return res.data;
}
//V端个人中心 能力验证-参数
async function AbilityParamV() {
    const res = await axios.get(`/dataSource/getAbilityParam`)
    return res.data;
}
//V端个人中心 能力验证-列表
async function AbilityListV({ userId }) {
    const res = await axios.get(`/ability/list?userId=${userId}`)
    return res.data;
}
//V端个人中心 擅长领域-参数
async function SpecialtyV() {
    const res = await axios.get('/dataSource/getSpecialty');
    return res.data;
}
//B端企业认证
async function UpdateCompanyB({ userId, id, name, licenseNum, licenseAddress, addressProvince, addressCity, addressArea, address, licenseYear, licenseRange, licenseImg }) {
    const res = await axios.post(`/companyInfo/update`, JSON.stringify({ userId, id, name, licenseNum, licenseAddress, addressProvince, addressCity, addressArea, address, licenseYear, licenseRange, licenseImg }))
    return res.data;
}

//B端企业认证
async function ReUpdateCompanyB({ userId, id, name, licenseNum, licenseAddress, addressProvince, addressCity, addressArea, address, licenseYear, licenseRange, licenseImg }) {
    const res = await axios.post(`/companyInfo/updateCompanyInfoTemp`, JSON.stringify({ userId, id, name, licenseNum, licenseAddress, addressProvince, addressCity, addressArea, address, licenseYear, licenseRange, licenseImg }))
    return res.data;
}


//B端 验证企业信息是否存在
async function CheckCompanyInfoB({ userId }) {
    const res = await axios.get(`/companyInfo/checkCompanyInfo?userId=${userId}`)
    return res.data;
}

//B端 验证企业信息是否存在
async function ReCheckCompanyInfoB({ userId }) {
    const res = await axios.get(`/companyInfo/checkCompanyInfoTemp?userId=${userId}`)
    return res.data;
}

//B端 获取子账号列表
async function GetChildListB() {
    const res = await axios.get(`/user/childList`)
    return res.data
}
//B端新增子账号
//bUserType:1表示 子发包商(一个总账户有多个1) 2表示财务(一个总账户1个2)
async function AddChildB({ nickName, bUserType, password, phone, phoneCode }) {
    password = encode(password);
    const res = await axios.post(`/user/addChild`, JSON.stringify({ nickName, bUserType, password, phone, phoneCode }))
    return res.data;
}
//变更子账号状态
async function ChangeChildStateB({ id }) {
    const res = await axios.post('user/changeChildState', JSON.stringify({ id }))
    return res.data
}
//变更子账号
async function editChildB({ nickName, id, phone, phoneCode }) {
    const res = await axios.post(`user/editChild`, JSON.stringify({ nickName, id, phone, phoneCode }))
    return res.data
}
//修改子账户密码
async function resetChildPwd({ id, password }) {
    password = encode(password);
    const res = await axios.post(`/user/resetChildPwd`, JSON.stringify({ id, password }))
    return res.data

}
async function UserList({ userType, seekValue, page, row }) {
    const res = await axios.post(`user/list/${page}/${row}`, JSON.stringify({ userType, seekValue }))
    return res.data
}


//提现列表
async function atmsList({ state, atmType, page, row }) {
    const res = await axios.post(`atms/list/${page}/${row}`, JSON.stringify({ state, atmType }))
    return res.data
}
//充值列表
async function rechargeList({ state, payType, page, row }) {
    const res = await axios.post(`recharge/list/${page}/${row}`, JSON.stringify({ state, payType }))
    return res.data
}
//支付宝账单列表
async function orderList({ state, page, row }) {
    const res = await axios.post(`order/list/${page}/${row}`, JSON.stringify({ state }))
    return res.data
}
//流水
async function recordList({ type, page, row }) {
    const res = await axios.post(`recharge/recordList/${page}/${row}`, JSON.stringify({ type }))
    return res.data
}

//删除历史作品
async function delHistory(id) {
    const res = await axios.post(`workCollection/delete`, JSON.stringify({ id }))
    return res.data
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


export {
    UserList,
    UpdateInfoV, UpdateWorkIntervalV, ValidityV, ReValidityV, UpdatePwdV, TsechnologyV, WorkCollectionV, SaveWorkCollectionV, UpdateWorkCollectionV,
    CheckUserInfoV, ReCheckUserInfoV, AbilityParamV, AbilityListV, SpecialtyV, UpdateCompanyB, ReUpdateCompanyB, AddChildB, CheckCompanyInfoB, ReCheckCompanyInfoB, ReCheckCompanyInfo, GetChildListB, ChangeChildStateB, editChildB,
    orderList, atmsList, rechargeList, recordList, resetChildPwd,
    delHistory
}
