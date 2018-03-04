import Layout from 'src/views/components/Layout'
import connect from './connect'
import Link from 'next/link'

export default connect((props) => {
  return (
    <Layout>
      <h1>{props.article.title}</h1>
      art!
    </Layout>
  )
})
