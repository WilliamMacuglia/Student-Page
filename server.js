const express = require('express')
const nunjucks = require('nunjucks')

const server = express()
const videos = require('./data')

server.use(express.static('public'))

server.set('view engine', 'njk') 

nunjucks.configure('views', {
    express: server,
    autoescape: false,
    noCache: true
})

server.get('/', function(req, res){
    const about = {
        avatar_url: 'https://avatars3.githubusercontent.com/u/57734527?s=460&v=4',
        name: 'William Macuglia',
        role: 'Aluno - <a href="https://rocketseat.com.br/" target="_blank">Rocketseat</a>',
        description: 'Programador iniciante, focado em estudar e absorver todos os conhecimentos da área.',
        links: [
            {name: 'GitHub', url: 'https://github.com/WilliamMacuglia'},
            {name: 'Instagram', url: 'https://www.instagram.com/willmacuglia/'},
            {name: 'Linkedin', url: 'https://www.linkedin.com/in/william-macuglia-3bb376120/'}
        ]
    }

    return res.render('about', {about})
})

server.get('/portfolio', function(req, res){
    return res.render('portfolio', {items: videos})
})

server.get('/video', function(req, res) {
    const id = req.query.id;
    
    const video = videos.find (function (video) {
        return video.id == id
    })

    if (!video) {
        return res.send ('Video not found!')
    }

    return res.render ('video', { item: video })
})

server.listen(5000, function(){
    console.log ('Server is running!')
}) 