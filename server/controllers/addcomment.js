const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const {openid, bookid, comment, phone, location} = ctx.request.body
    console.log(openid, bookid, comment, phone, location)
    try {
      await mysql('comments').insert({openid, bookid, comment, phone, location})
      ctx.state = {
        code: 200,
        data: {
          msg: 'success'
        }
      }
    } catch (e) {
      ctx.state = {
        code: -1,
        data: {
          msg: '评论失败' + e.sqlMessage
        }
      }
    }
}
