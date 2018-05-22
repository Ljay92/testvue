import axios from 'axios';

async function vsSchoolList({ index, size, data }) {
    return (await axios.post(`/vsschool/list/${index}/${size}`,data)).data;
}
async function vsSchoolLabel() {
    return (await axios.get(`/vsschool/label`)).data;
}
async function vsSchoolDetail(id) {
    return (await axios.post(`/vsschool/query/${id}`)).data;
}

export {
    vsSchoolList,
    vsSchoolLabel,
    vsSchoolDetail
}
