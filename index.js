import fs from 'fs'
import http from 'http'
import path from 'path'

const server = http.createServer((req, res) => {
    const videoPath = path.join('videos', 'Blade Runner 2049 ｜ Doja Cat - So High ｜ HDR10+ [bVUSYNg8qcY].mp4');
    console.log('fetching ' + videoPath)

    if (!fs.existsSync(videoPath)) {
        res.writeHead(404)
        res.end('Video not found')
        return
    }
    res.writeHead(206, { 'Content-Type': 'video/mp4' })

    const stream = fs.createReadStream(videoPath)
    stream.pipe(res)

    stream.on('error', (err) => {
        console.error('Error streaming video:', err)
        res.end(err)
    })


    res.write(fs.createReadStream('videos/Blade Runner 2049 ｜ Doja Cat - So High ｜ HDR10+ [bVUSYNg8qcY].mp4'))


    res.end()
})

server.listen(3000, () => console.log('Server running on port 3000'))