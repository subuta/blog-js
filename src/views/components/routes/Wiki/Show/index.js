import moment from 'src/views/utils/moment'
import Layout from 'src/views/components/layout/Layout'
import _ from 'lodash'

import { toHtml } from 'src/views/utils/markdown'

import ActiveLink from 'src/views/components/common/ActiveLink'
import FloatingActionButton from 'src/views/components/common/FloatingActionButton'
import Editor from 'src/views/components/common/Editor'
import MarkdownContent from 'src/views/components/common/MarkdownContent'

import Sidebar from '../_Sidebar'
import Header from '../_Header'
import Content from '../_Content'
import Paper from '../_Paper'

import {
  compose,
  branch,
  withState,
  withHandlers,
  withProps,
  renderComponent
} from 'recompose'

import MdEditIcon from 'react-icons/lib/md/edit'
import MdSaveIcon from 'react-icons/lib/md/save'
import MdPublishIcon from 'react-icons/lib/md/publish'
import MdLockIcon from 'react-icons/lib/md/lock-outline'

import withStyles from './style'
import connect from './connect'

const enhanceContent = compose(
  branch(
    ({isEditing}) => isEditing,
    renderComponent((props) => {
      const {
        setDraftContent,
        draftContent,
        styles
      } = props
      return (
        <div className={styles.EditorArea}>
          <Editor
            className="editor"
            onSave={setDraftContent}
            value={draftContent}
          />

          <MarkdownContent
            className="content"
            html={toHtml(draftContent)}
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
    <MarkdownContent
      className="content"
      html={toHtml(content)}
    />
  )
})

const enhanceArticleAction = compose(
  branch(
    ({isEditing}) => isEditing,
    renderComponent((props) => {
      const {
        article,
        styles,
        onClickSave,
        onClickPublish
      } = props

      let subActions = []

      if (article.isPublished) {
        subActions.push((
          <MdLockIcon
            onClick={onClickPublish}
          />
        ))
      } else {
        subActions.push((
          <MdPublishIcon
            onClick={onClickPublish}
          />
        ))
      }

      return (
        <FloatingActionButton
          className='button-fab'
          subActions={subActions}
        >
          <ActiveLink
            href={`/article?id=${article.id}&edit=true`}
            as={`/w/${article.id}/edit`}
          >
            <MdSaveIcon onClick={onClickSave}/>
          </ActiveLink>
        </FloatingActionButton>
      )
    }),
    _.identity
  )
)

const ArticleAction = enhanceArticleAction((props) => {
  const {article, styles} = props
  return (
    <FloatingActionButton className='button-fab'>
      <ActiveLink
        href={`/article?id=${article.id}&edit=true`}
        as={`/w/${article.id}/edit`}
      >
        <MdEditIcon/>
      </ActiveLink>
    </FloatingActionButton>
  )
})

const enhance = compose(
  withStyles,
  connect,
  withState('draftContent', 'setDraftContent', ({article}) => article ? article.content : ''),
  withProps(({url}) => {
    return {
      isEditing: _.get(url, 'query.edit')
    }
  }),
  withHandlers({
    onClickPublish: ({article, updateArticle}) => () => {
      const {isPublished} = article
      // toggle published state.
      updateArticle(article.id, {...article, isPublished: !isPublished})
    },

    onClickSave: ({article, draftContent, updateArticle}) => () => {
      updateArticle(article.id, {...article, content: draftContent})
    }
  })
)

export default enhance((props) => {
  const {
    article,
    styles,
    isAuthenticated
  } = props

  const {title, content, id} = article
  const createdAt = moment(article.createdAt).format('MMMM Do YYYY')

  return (
    <Layout>
      <div className={styles.ScrollContainer}>
        <Sidebar/>

        <Content>
          <Header/>

          <Paper className={styles.Paper}>
            <h4 className={styles.Title}>{title}</h4>
            <small className="created-at">{createdAt}</small>

            <ArticleContent {...props}/>

            {isAuthenticated && <ArticleAction {...props}/>}
          </Paper>
        </Content>
      </div>
    </Layout>
  )
})
