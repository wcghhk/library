
// 新增图书
const https = require('https')
const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const {isbn, openid} = ctx.request.body
    if (isbn && openid) {
        const findRes = await mysql('book').select().where('isbn', isbn)
        if (findRes.length) {
            ctx.state = {
                code: -1,
                data: {
                    msg: '图书已存在'
                }
            }
            return
        }
        let url = `https://api.douban.com/v2/book/isbn/${isbn}`
        const bookinfo = await getJson(url)
        const rate = bookinfo.rating.average
        const {title, image, alt, publisher, summary, price} = bookinfo
        const tags = bookinfo.tags.map(t => {
            return `${t.title} ${t.count}`
        }).join(',')
        const author = bookinfo.author.join(',')
        try {
            await mysql('book').insert({isbn, openid, rate, title, image, alt, publisher, summary, price, tags, author})
            ctx.state = {
                code: 200,
                data: {
                    title,
                    msg: 'success'
                }
            }
        } catch (e) {
            ctx.state = {
                code: -1,
                data: {
                    msg: 'failed ' + e.sqlMessage
                }
            }
        }
    }
}

function getJson (url) {
    return new Promise((resolve, reject) => {
        https.get(url, res => {
            let str = ''
            res.on('data', data => {
                str += data
            })
            res.on('end', data => {
                const bookinfo = JSON.parse(str)
                if (bookinfo.title) {
                    resolve(bookinfo)
                }
                reject(bookinfo)
            })
        })
    })
}
