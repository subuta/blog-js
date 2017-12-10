import {
  registerStyles,
  registerKeyFrames
} from 'src/utils/style'

const loaderAnimation = registerKeyFrames({
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)'
  }
})

// from https://github.com/Semantic-Org/Semantic-UI/blob/master/src/definitions/elements/loader.less
const Loader = {
  position: 'relative',
  display: 'block',
  margin: 0,
  textAlign: 'center',
  zIndex: 1000,
  '&:before': {
    position: 'absolute',
    content: '\'\'',
    // FIXME: なんで右下にちょっとずれるかを解決する。
    top: '-14%',
    left: '-14%',
    width: '100%',
    height: '100%',
    borderRadius: '500rem',
    border: '0.2em solid rgba(0, 0, 0, 0.1)'
  },
  '&:after': {
    position: 'absolute',
    content: '\'\'',
    top: '-14%',
    left: '-14%',
    width: '100%',
    height: '100%',
    animation: `${loaderAnimation} 0.6s linear`,
    animationIterationCount: 'infinite',
    borderRadius: '500rem',
    borderColor: '#767676 transparent transparent',
    borderStyle: 'solid',
    borderWidth: '0.2em',
    boxShadow: '0px 0px 0px 1px transparent'
  }
}

const Container = {
  display: 'inline-flex',
  justifyContent: 'center',
  alignItems: 'center',
  flexDirection: 'column'
}

const Label = {
  marginTop: 4
}

export default registerStyles({
  Loader,
  Container,
  Label
})
