const {mysql} = require('../qcloud')
module.exports = async ctx => {
    const {id} = ctx.request.query
    const detail = await mysql('book')
                    .select('book.*', 'cSessionInfo.user_info')
                    .join('cSessionInfo', 'book.openid', 'cSessionInfo.open_id')
                    .where('id', id)
                    .first()
    const info = JSON.parse(detail.user_info)
    ctx.state = {
        code: 200,
        data: Object.assign({}, detail, {
            tags: detail.tags.split(','),
            summary: detail.summary.split('\n'),
            user_info: {
                nickName: info.nickName,
                avatarUrl: info.avatarUrl
            }
        })
    }
    await mysql('book')
            .where('id', id)
            .increment('count', 1)
}
