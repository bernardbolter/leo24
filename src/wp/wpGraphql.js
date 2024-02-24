import axios from 'axios'

export const getAllData = async () => {
    try {
        const headers = {
            'content-type' : 'application/json',
            'Access-Control-Allow-Origin' : '*'
        }
        const options = {
            method: 'POST',
            url: 'https://leonhardlaupichler.com/backend/wp-json/wp/v2/posts?acf_format=standard&per_page=100',
            headers
        }
        const response = await axios(options)
        console.log(response.data)
    }
    catch (err) {
        console.log(err)
    }
} 