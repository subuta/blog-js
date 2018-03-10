import moment from 'src/views/utils/moment'
import Layout from 'src/views/components/layout/Layout'

import Sidebar from '../_Sidebar'
import Header from '../_Header'
import Content from '../_Content'
import Paper from '../_Paper'

import {
  compose
} from 'recompose'

import withStyles from './style'
import connect from './connect'

const enhance = compose(
  withStyles,
  connect
)

export default enhance(({article, styles}) => {
  const {title, content, summary} = article
  const createdAt = moment(article.createdAt).format('MMMM Do YYYY')

  return (
    <Layout>
      <Sidebar/>

      <Content>
        <Header/>

        <Paper className={styles.Paper}>
          <h4>{title}</h4>
          <small className="created-at">{createdAt}</small>

          <div className="article-content">{content}</div>
        </Paper>
      </Content>
    </Layout>
  )
})
