const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const {page, openid} = ctx.request.query
    const size = 10
    const allbooks = mysql('book')
                    .select('book.*', 'csessioninfo.user_info')
                    .join('csessioninfo', 'book.openid', 'csessioninfo.open_id')
                    .orderBy('book.id', 'desc')
    let books
    if (openid) {
        books = await allbooks.where('book.openid', openid)
    } else {
        books = await allbooks.limit(size).offset(page * size)
    }
    ctx.state = {
        code: 200,
        data: {
            bookList: books.map(v => {
                const info = JSON.parse(v.user_info)
                return Object.assign({}, v, {
                    user_info: {
                        nickName: info.nickName
                    }
                })
            })
        }
    }
}
