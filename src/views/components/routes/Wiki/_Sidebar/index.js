import Sidebar from 'src/views/components/layout/Sidebar'

import connect from './connect'
import Link from 'next/link'

export default connect((props) => {
  return (
    <Sidebar sidebarClass="is-wiki">
      <h1>list of articles</h1>
      <ul>
        {props.articles.map(({id, title}) => (
          <li key={id}>
            <Link href={`/article?id=${id}`} as={`/w/${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Sidebar>
  )
})
