import {Modal} from 'iview'
let render = {};
//删除提示
/**
 * 传入的是class类名和要删除的index索引位置
 * @param calss
 * @param index
 */
render.removeTip=function (calss,index) {
  Modal.confirm({
    title: '提示',
    onOk: () => {
      calss.remove(index);
    },
    render: (h) => {
      return  h('div',
        [
          h('Icon', {
            props: {
              size: '25',
              type: 'alert',

            },


          }),
          h('Span', {
            props: {
              size: 'large',
              type: 'text',
              fontSize:'14px'
            },

          }, '删除此条记录，是否继续?'),


        ]);
    }
  })
}
export default render;
