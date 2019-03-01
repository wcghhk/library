module.exports = async ctx => {
  ctx.state.code = 200
  ctx.state.data = {
    msg: 'launch'
  }
}