// import fs from 'fs'
import http from 'http'

const server = http.createServer((req, res) => {
    res.write("request url:" + req.url)
    res.write("\n\n")
    res.write("request method:" + req.method)
    res.write("\n\n")

    res.write("request complete?:" + req.complete)
    res.write("\n\n")

    res.write("request trailers:" + req.trailers)
    res.write("\n\n")

    res.write("request headers:")
    res.write("\n")


    for (const [key, value] of Object.entries(req.headers)) {
        res.write("\n" + key + ":" + value)
        res.write("\n")
    }
    res.write("\n\n")

    res.end()
})

server.listen(3000, () => console.log('Server running on port 3000'))