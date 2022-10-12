module.exports = {
  todo: {
    query: `SELECT *, datetime-alertbefore as alerttime FROM todo.todolist where email = ?;`
  },
  delete:{
    query: `delete from todolist where id = ?;`
  },
  add: {
    query: `insert into todolist (title, alert, email) values (?, 0, ?)`
  },
  update: {
    query: `update todolist set title = ?, datetime = ?, alert = ?, alertbefore = ? where id = ?;`
  },
  signUp: {
    query: `insert into t_user set ? on duplicate key update ?;`
  }
}