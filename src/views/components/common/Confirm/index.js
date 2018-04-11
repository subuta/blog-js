import {
  compose,
  withHandlers
} from 'recompose'

import _ from 'lodash'

import Modal from 'src/views/components/common/Modal'

const enhance = compose()

export default enhance((props) => {
  let {
    isShow,
    title,
    message = '',
    onCancel = _.noop,
    onConfirm = _.noop,
  } = props

  return (
    <Modal
      title={title}
      isShow={isShow}
      cancelText='No'
      okText='Yes'
      onClose={onCancel}
      onSubmit={onConfirm}
    >
      <span>{message}</span>
    </Modal>
  )
})
