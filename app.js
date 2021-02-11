const express = require('express')
const bodyParser = require('body-parser')
const request = require('request')
const https = require('https')

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

    const url = "https://us7.api.mailchimp.com/3.0/lists/857d9e9434"

    const options = {
        method: 'POST',
        auth: "hitesh1:52cf16060acf54fe272965acf1ff3b8d-us7"
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


// api key: 52cf16060acf54fe272965acf1ff3b8d-us7
// list id: 857d9e9434