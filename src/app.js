const path = require('path')
const express = require('express')
const hbs = require('hbs')
const geocode = require('./utils/geocode')
const forecast = require('./utils/forecast')

// paths
const publicFolderPath = path.join(__dirname, '../public')
const viewsPath = path.join(__dirname, '../templates/views')
const partialsPath = path.join(__dirname, '../templates/partials')

const app = express()

// set app
app.set('view engine', 'hbs')
app.set('views', viewsPath)
hbs.registerPartials(partialsPath)

app.use(express.static(publicFolderPath))


app.get('', (req, res) => {
    res.render('index', {
        title: 'Weather',
        name: 'Maayan Lipkin'
    })
})

app.get('/about', (req, res) => {
    res.render('about', {
        title: 'About',
        name: 'Maayan Lipkin'
    })
})

app.get('/help', (req, res) => {
    res.render('help', {
        title: 'Help',
        name: 'Maayan Lipkin'
    })
})

app.get('/weather', (req, res) =>{
    if (!req.query.address) {
        return res.send({
            error: 'Please specify an address'
        })
    }
    geocode(req.query.address, (error, data) => {
        if (error) {
            return res.send({
                error
            })
        }
        forecast(data.longtitude, data.latitude, (error, { forecast }) => {
            if (error) {
                return res.send( { error })
            }
            res.send({
                forecast,
                location: data.location,
                address: req.query.address
            })
        })
    })

    
})


app.listen(3000, () =>{
    console.log('server is up on port 3000')
})