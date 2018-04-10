import _ from 'lodash'

const bodyClass = typeof document !== 'undefined' ? _.get(document, 'body.className') : ''

// detect browser from document.
export const isTablet = _.includes(bodyClass, 'tablet')
export const isMobile = _.includes(bodyClass, 'mobile')
