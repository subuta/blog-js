import moment from 'src/views/utils/moment'
import Layout from 'src/views/components/layout/Layout'
import _ from 'lodash'

import ActiveLink from 'src/views/components/common/ActiveLink'
import FloatingActionButton from 'src/views/components/common/FloatingActionButton'
import Editor from 'src/views/components/common/Editor'

import Sidebar from '../_Sidebar'
import Header from '../_Header'
import Content from '../_Content'
import Paper from '../_Paper'

import {
  compose,
  branch,
  renderComponent
} from 'recompose'

import MdEditIcon from 'react-icons/lib/md/edit'

import withStyles from './style'
import connect from './connect'

const enhanceContent = compose(
  branch(
    ({url}) => _.get(url, 'query.edit'),
    renderComponent(({article}) => {
      const {content} = article
      return (
        <Editor
          className="article-content"
          value={content}
        />
      )
    }),
    _.identity
  )
)

const ArticleContent = enhanceContent(({article}) => {
  const {content} = article
  return (
    <div
      className="article-content"
    >
      {content}
    </div>
  )
})

const enhance = compose(
  withStyles,
  connect,
)

export default enhance((props) => {
  const {article, styles} = props
  const {title, content, id} = article
  const createdAt = moment(article.createdAt).format('MMMM Do YYYY')

  return (
    <Layout>
      <div className={styles.ScrollContainer}>
        <Sidebar/>

        <Content>
          <Header/>

          <Paper className={styles.Paper}>
            <h4>{title}</h4>
            <small className="created-at">{createdAt}</small>

            <ArticleContent {...props}/>

            <FloatingActionButton className={styles.FloatingActionButton}>
              <ActiveLink
                href={`/article?id=${id}&edit=true`}
                as={`/w/${id}/edit`}
              >
                <MdEditIcon/>
              </ActiveLink>
            </FloatingActionButton>
          </Paper>
        </Content>
      </div>
    </Layout>
  )
})
