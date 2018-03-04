import Layout from 'src/views/components/layout/Layout'
import ChannelSidebar from 'src/views/components/routes/Chat/_Sidebar'
import Content from 'src/views/components/layout/Content'

import connect from './connect'

export default connect((props) => {
  return (
    <Layout>
      <ChannelSidebar />

      <Content>
        hoge!
      </Content>
    </Layout>
  )
})
