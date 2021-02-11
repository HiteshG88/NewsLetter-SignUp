const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')
const { api_key, list_id } = require("./api_keys")

const app = express()

app.use(express.static('public/'))
app.use(bodyParser.urlencoded({extended: true}))

app.get('/', (req,res) => {
    res.sendFile(__dirname + '/signup.html')
})

app.post('/' , (req,res) => {
    const fname = req.body.fname
    const lname = req.body.lname
    const email = req.body.email

    const data = {
        members: [
            {
                email_address: email,
                status: "subscribed",
                merge_fields: {
                    FNAME: fname,
                    LNAME: lname
                }
            }
        ]
    }

    const jsonData = JSON.stringify(data)

    const url = "https://us7.api.mailchimp.com/3.0/lists/"+list_id

    const options = {
        method: 'POST',
        auth: "hitesh1:"+api_key
    }

    const request = https.request(url, options, (response) => {
        if(response.statusCode === 200){
            res.sendFile(__dirname + '/success.html')
        }else{
            res.sendFile(__dirname + '/failure.html')
        }
    })

    request.write(jsonData)
    request.end()

    // console.log(fname, lname, email);
})

app.listen(3000, () => {
    console.log('Server live on port 3000!');
})


