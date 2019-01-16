import axios from 'axios'

axios.defaults.baseURL = 'http://127.0.0.1:1234';
// axios.defaults.headers.common['Authorization'] = AUTH_TOKEN;
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';

function fetchAPI (ajaxObj) {
	return new Promise((resolve, reject) => {
		axios[ajaxObj.method](ajaxObj.url, ajaxObj.data)
			.then((res) => {
				if (res.data.code === 200) {
					resolve(res.data.data)
				}
			})
			.catch((err) => {
				reject(err)
			})
	})
}

export function getDraftList (data) {
	return fetchAPI({
		method: 'get',
		url: `/v1/getDraftList?activityId=${data.activityId}`
	})
}

export function saveActivity (data) {
	return fetchAPI({
		method: 'post',
		url: '/v1/saveActivity',
		data
	})
}

export function publishActivity (data) {
	return fetchAPI({
		method: 'post',
		url: '/v1/publishActivity',
		data
	})
}