import connect from './connect'
import Link from 'next/link'

export default connect((props) => {
  return (
    <div>
      <h1>list of channels</h1>
      <ul>
        {props.channels.map(({id, name}) => (
          <li key={id}>
            <Link as={`/c/${id}`} href={`/channel?id=${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
})
