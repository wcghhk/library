const {mysql} = require('../qcloud')
module.exports = async ctx => {
    // const {id} = ctx.request.query
    const hot = await mysql('book')
            .select('id', 'title', 'image', 'count')
            .orderBy('count', 'desc')
            .limit(9)
    ctx.state = {
        code: 200,
        data: {
            hot
        }
    }
}
