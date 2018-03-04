import connect from './connect'
import Link from 'next/link'

export default connect((props) => {
  return (
    <div>
      <h1>{props.channel.name}</h1>
    </div>
  )
})
