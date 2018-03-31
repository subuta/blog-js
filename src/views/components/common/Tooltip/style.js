import createWithStyles from 'src/views/utils/style'

import _ from 'lodash'

import {
  BLACK_COLOR,
  PRIMARY_COLOR,
  DIMMED_PRIMARY_COLOR,
  WARNING_COLOR,
  NEGATIVE_COLOR,

  Z_INDEX_3
} from 'src/views/constants/style'

const placements = ['top', 'bottom', 'left', 'right']
const arrowWidth = 7
const backgroundColor = BLACK_COLOR

const tippyContent = {
  color: DIMMED_PRIMARY_COLOR,
  fontSize: 13,
  fontWeight: 'bold',

  '& > div': {
    display: 'inline-block'
  },

  '.warning-theme &, .error-theme &': {
    color: PRIMARY_COLOR,
  }
}

const tippyTooltip = {
  ...Z_INDEX_3,
  backgroundColor,

  '&.warning-theme, &.error-theme': {
    borderRadius: 0
  }
}

const tippyBackdrop = {
  '.warning-theme &': {
    backgroundColor: WARNING_COLOR
  },

  '.error-theme &': {
    backgroundColor: NEGATIVE_COLOR
  }
}

const tippyArrow = _.transform(placements, (styles, placement) => {
  styles[`.tippy-popper[x-placement^=${placement}] .tippy-tooltip`] = {
    '& .tippy-arrow': {
      [`border-${placement}`]: `${arrowWidth}px solid ${backgroundColor}`,
    }
  }
}, {})

const Tooltip = {
  display: 'inline-block'
}

const Template = {
  // should not show at initial state.
  display: 'none',
  justifyContent: 'center',
  alignItems: 'flex-start',
  maxWidth: 200,
  fontSize: 13,

  // should show after loaded (by tippy.js)
  '.tippy-content &': {
    display: 'flex'
  },

  '& > svg': {
    margin: '0 2px 0 0',
    height: 16,
    width: 16,
    flex: '0 0 auto'
  },

  '& > span': {
    lineHeight: '16px',
    textAlign: 'left'
  }
}

export default createWithStyles({
  Tooltip,
  Template
}, {
  css: {
    ...tippyArrow,
    '.tippy-content': tippyContent,
    '.tippy-tooltip': tippyTooltip,
    '.tippy-backdrop': tippyBackdrop,
  }
})
