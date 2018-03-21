import moment from 'src/views/utils/moment'
import Layout from 'src/views/components/layout/Layout'
import _ from 'lodash'

import { toHtml } from 'src/views/utils/markdown'

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
  withState,
  renderComponent
} from 'recompose'

import MdEditIcon from 'react-icons/lib/md/edit'

import withStyles from './style'
import connect from './connect'

const enhanceContent = compose(
  withState('draftContent', 'setDraftContent', ({article}) => article ? article.content : ''),
  branch(
    ({url}) => _.get(url, 'query.edit'),
    renderComponent((props) => {
      const {
        setDraftContent,
        draftContent
      } = props
      return (
        <div>
          <div dangerouslySetInnerHTML={{__html: toHtml(draftContent)}}/>

          <hr/>

          <Editor
            className="article-content"
            onSave={setDraftContent}
            value={draftContent}
          />
        </div>
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
