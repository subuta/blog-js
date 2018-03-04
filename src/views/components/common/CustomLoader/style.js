import createWithStyles, { Style } from 'src/views/utils/style'

// FIXME: loaderAnimationのクラス名の解決
const loaderAnimation = {
  from: {
    transform: 'rotate(0deg)',
  },
  to: {
    transform: 'rotate(360deg)'
  }
}

// Workaround for https://github.com/blakeembrey/react-free-style/issues/43
const debug = typeof process !== 'undefined' && process.env.NODE_ENV !== 'production'
let loaderAnimationHash = Style.registerHashRule('@keyframes', loaderAnimation)
loaderAnimationHash = debug ? `CustomLoader_loaderAnimation_${loaderAnimationHash}` : loaderAnimationHash

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
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    borderRadius: '500rem',
    border: '0.2em solid rgba(0, 0, 0, 0.1)'
  },
  '&:after': {
    position: 'absolute',
    content: '\'\'',
    top: 0,
    left: 0,
    width: '100%',
    height: '100%',
    animation: `${loaderAnimationHash} 0.6s linear`,
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
  marginTop: 8
}

export default createWithStyles({
  Loader,
  Container,
  Label
}, {
  keyframes: {
    loaderAnimation
  }
})
