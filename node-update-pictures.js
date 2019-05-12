const fs = require('fs')

fs.readdir('./img', (err, files) => {
    fs.readFile('pictures.json', 'utf8', (err, data) => {
        let oldPictures =  JSON.parse(data)
        let pictures = {}
        files.map(file => {
            pictures[file] = {
                title: '',
                year: 2000,
                material: 'холст, масло',
                description: '',
            }
        })

        for (let url in oldPictures) {
            if (oldPictures.hasOwnProperty(url) && pictures[url] == null) {
                delete oldPictures[url]
            }
        }

        for (let url in pictures) {
            if (pictures.hasOwnProperty(url) && oldPictures[url] == null) {
                oldPictures[url] = pictures[url]
            }
        }

        let jsonB = JSON.stringify(oldPictures, null, 4)
        let json = JSON.stringify(oldPictures)
        fs.writeFile('pictures.json', jsonB, 'utf8', () => {
            fs.writeFile('js/pictures-list.js', 'window._picturesList = JSON.parse(' + JSON.stringify(json) + ')', 'utf8', () => {
                console.log('Updated.')
            })
        })
    })
})