import Sidebar from 'src/views/components/layout/Sidebar'

import connect from './connect'
import Link from 'next/link'

export default connect((props) => {
  return (
    <Sidebar sidebarClass="is-chat">
      <h1>list of channels</h1>
      <ul>
        {props.channels.map(({id, name}) => (
          <li key={id}>
            <Link href={`/channel?id=${id}`} as={`/c/${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  )
})
