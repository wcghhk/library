const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const {page} = ctx.request.query
    const size = 10
    const book = await mysql('book')
                    .select('book.*', 'csessioninfo.user_info')
                    .join('csessioninfo', 'book.openid', 'csessioninfo.open_id')
                    .limit(size)
                    .offset(page * size)
                    .orderBy('book.id', 'desc')
    ctx.state = {
        code: 200,
        data: {
            bookList: book.map(v => {
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
