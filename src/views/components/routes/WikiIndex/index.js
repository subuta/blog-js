import Layout from 'src/views/components/Layout'
import connect from './connect'
import Link from 'next/link'

export default connect((props) => {
  return (
    <Layout>
      <h1>list of articles</h1>
      <ul>
        {props.articles.map(({id, title}) => (
          <li key={id}>
            <Link as={`/w/${id}`} href={`/wiki?id=${id}`}>
              <a>{title}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
})
