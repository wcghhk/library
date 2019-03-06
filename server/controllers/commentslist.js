const {mysql} = require('../qcloud')

module.exports = async ctx => {
    const {bookid, openid} = ctx.request.query
    const allComments = mysql('comments')
            .select('comments.*', 'cSessionInfo.user_info')
            .join('cSessionInfo', 'comments.openid', 'cSessionInfo.open_id')
    let comments = []
    if (bookid) {
      // 图书详情评论
      comments = await allComments.where('bookid', bookid)
    } else if (openid) {
      // 个人评论列表
      comments = await allComments.where('openid', openid)
    }
    ctx.state = {
      code: 200,
      data: {
        list: comments.map(c => {
          const info = JSON.parse(c.user_info)
          return Object.assign({}, c, {
            nickName: info.nickName,
            avatarUrl: info.avatarUrl
          })
        })
      }
    }
}
