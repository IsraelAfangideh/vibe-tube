import fs from 'fs'
import http from 'http'
import path from 'path'


const getFileStatistics = async (filePath)=> {
    return fs.promises.stat(filePath)
}

const server = http.createServer(async (req, res) => {
    const videoPath = path.join('videos', 'Blade Runner 2049 ｜ Doja Cat - So High ｜ HDR10+ [bVUSYNg8qcY].mp4');
    console.log('fetching ' + videoPath)

    if (!fs.existsSync(videoPath)) {
        res.writeHead(404)
        res.end('Video not found')
        return
    }

    const range = req.headers.range
    let fileStatistics;
    let fileSize;
    try {
       fileStatistics = await getFileStatistics(videoPath)
        fileSize = fileStatistics.size
    } catch (err) {
        console.error('Error getting video size:', err)
        res.end(err.message)
    }

    if (range) {
        const byteRange = range.replace(/bytes=/, "").split("-")
        const start = parseInt(byteRange[0], 10)
        const end = byteRange[1] ? parseInt(byteRange[1], 10) : fileSize -1

        if (start >=fileSize || end >= fileSize) {
            res.writeHead(416, {'Content-range': `bytes */${fileSize}`})
            res.end()
        }

        const chunkSize = (end -start) + 1
        const file = fs.createReadStream(videoPath, {start, end})

        res.writeHead(206,{
            'content-range':`bytes ${start} - ${end}/${fileSize}`,
            'accept-ranges':'bytes',
            'content-length': chunkSize,
            'content-type': 'video/mp4'
        })

        file.pipe(res)

    } else {
        res.writeHead(200, {
            'content-length': fileSize,
            'content-type': 'video/mp4'
        })
        const file = fs.createReadStream(videoPath)
        file.pipe(res)
    }
})

server.listen(3000, () => console.log('Server running on port 3000'))