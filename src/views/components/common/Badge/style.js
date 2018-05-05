import createWithStyles from 'src/views/utils/style'

import {
  DIMMED_BLACK_COLOR,
  PRIMARY_COLOR
} from 'src/views/constants/style'

const Badge = {
  margin: '0 0 0 4px',
  padding: '4px 8px',
  display: 'inline-block',
  fontSize: 13,
  fontWeight: 'bold',
  backgroundColor: DIMMED_BLACK_COLOR,
  color: PRIMARY_COLOR,
  borderRadius: 4,
  lineHeight: 1
}

export default createWithStyles({
  Badge
})
