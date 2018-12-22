export default {

  // 日期格式化
  formatDate (time) {
    if (!time) {
      return '';
    }
    let date = new Date(time);
    return `${date.getFullYear()}-${date.getMonth()+1}-${date.getDate()} ${date.getHours()}:${date.getMinutes()}:${date.getSeconds()}`; 
  },

  // pagination分页
  pagination(data, callback) {
    return {
      onChange: (current) => {
        callback(current);
      },
      current: data.result.page,
      pageSize: data.result.page_size,
      total: data.result.total_count,
      // 显示数据总量和当前数据顺序
      showTotal: () => {
        return `共 ${data.result.total_count} 条`
      },
      // 是否快速跳转至某页
      showQuickJumper: true,
    }
  },
}