import createWithStyles from 'src/views/utils/style'

import {
  GRAY_COLOR,
  BORDER_COLOR,
  PRIMARY_COLOR,
  TABLET_MEDIA_QUERY,
  SUCCESS_COLOR,

  NAVIGATION_WIDTH
} from 'src/views/constants/style'

const Content = {
  padding: 32,
  position: 'relative',
  minHeight: 'inherit',
  height: '100vh',
  flex: '1 0 auto',
  width: `calc(100vw - ${NAVIGATION_WIDTH}px)`,
  backgroundColor: GRAY_COLOR
}

const Paper = {
}

const Form = {
  margin: '32px 0 0',
}

const FormItem = {
  margin: '24px 0 0 0',
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  '& > span': {
    flex: '0 0 120px',
    margin: '0 8px 0 0',
    fontWeight: 'bold',
    textAlign: 'right'
  }
}

const ImageInput = {
  display: 'flex',
  justifyContent: 'flex-start',
  alignItems: 'center',

  '& > input': {
    margin: '0 8px',
    border: `1px solid ${BORDER_COLOR}`
  }
}

const SubmitButton = {
  backgroundColor: SUCCESS_COLOR,
  color: PRIMARY_COLOR,

  '&:hover': {
    backgroundColor: `${SUCCESS_COLOR} !important`,
    opacity: 0.8
  }
}

const DeleteAvatarButton = {
  margin: '0 0 0 8px',
  padding: '0 8px !important',
  height: 30, // based on file input.
  fontSize: 13
}

export default createWithStyles({
  Content,
  Paper,
  ImageInput,
  Form,
  FormItem,
  SubmitButton,
  DeleteAvatarButton
})
