import Layout from 'src/views/components/layout/Layout'
import WikiSidebar from 'src/views/components/routes/Wiki/_Sidebar'
import Content from 'src/views/components/layout/Content'

import connect from './connect'

export default connect((props) => {
  return (
    <Layout>
      <WikiSidebar />

      <Content>
        wiki!
      </Content>
    </Layout>
  )
})
