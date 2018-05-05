import moment from 'src/views/utils/moment'
import Router, { withRouter } from 'next/router'
import _ from 'lodash'

import Layout from 'src/views/components/layout/Layout'
import ActiveLink from 'src/views/components/common/ActiveLink'
import FloatingActionButton from 'src/views/components/common/FloatingActionButton'
import Tooltip from 'src/views/components/common/Tooltip'
import TextField from 'src/views/components/common/TextField'
import TextArea from 'src/views/components/common/TextArea'
import Modal from 'src/views/components/common/Modal'
import Paper from 'src/views/components/common/Paper'
import CustomLoader from 'src/views/components/common/CustomLoader'
import Badge from 'src/views/components/common/Badge'

import {
  compose,
  withState,
  withProps,
  withHandlers
} from 'recompose'

import MdAddIcon from 'react-icons/lib/md/add'
import Waypoint from 'react-waypoint'

import withStyles from './style'
import connect from './connect'

import Sidebar from '../_Sidebar'
import Header from '../_Header'
import Content from '../_Content'

const enhance = compose(
  withStyles,
  connect,
  withState('paging', 'setPaging', { next: 1 }),
  withState('draftSlug', 'setDraftSlug', ({article}) => article ? article.slug : ''),
  withState('draftSummary', 'setDraftSummary', ({article}) => article ? article.summary : ''),
  withState('draftTitle', 'setDraftTitle', ({article}) => article ? article.title : ''),
  withState('isShowCreateArticleModal', 'setIsShowCreateArticleModal', false),
  withProps(({articles}) => {
    return {
      articles: _.filter(articles, ['isPublished', true]),
      draftArticles: _.filter(articles, ['isPublished', false])
    }
  }),
  withHandlers({
    onPullToFetch: (props) => () => {
      const {
        requestArticles,
        setPaging,
        paging
      } = props

      const {
        next,
        isLast
      } = paging

      if (isLast) return

      // Retrieve next page and save latest paging into state.
      requestArticles({
        page: next
      }).then(data => {
        setPaging(_.omit(data, ['results']))
      })
    },

    onCreateArticle: (props) => () => {
      const {
        draftSlug,
        draftTitle,
        draftSummary,
        createArticle
      } = props

      const slug = draftSlug
      const article = {
        title: draftTitle,
        summary: draftSummary,
        slug,
      }

      createArticle(article).then(() => {
        Router.replace(`/article?slug=${slug}&edit=true`, `/w/${slug}/edit`)
      })
    },
  }),
  withRouter
)

export default enhance((props) => {
  const {
    styles,
    articles,
    draftArticles,
    draftSlug,
    draftTitle,
    draftSummary,
    onPullToFetch,
    isRequestProgress,
    isShowCreateArticleModal,
    setDraftSlug,
    setDraftTitle,
    setDraftSummary,
    setIsShowCreateArticleModal,
    isAuthenticated,
    paging,
    onCreateArticle,
  } = props

  const {
    isLast = false
  } = paging

  return (
    <Layout>
      <div className={styles.ScrollContainer}>
        <Sidebar/>

        <Modal
          title='Create new Article'
          isShow={isShowCreateArticleModal}
          className={styles.CreateArticleModal}
          onClose={() => {
            setDraftSlug('')
            setDraftTitle('')
            setIsShowCreateArticleModal(false)
          }}
          onSubmit={() => {
            onCreateArticle()
            setIsShowCreateArticleModal(false)
          }}
        >
          <TextField
            label='Title'
            onChange={setDraftTitle}
            value={draftTitle}
            placeholder='Put title for new article'
          />

          <TextField
            label='Slug'
            onChange={setDraftSlug}
            value={draftSlug}
            placeholder='Put slug for new article'
          />

          <TextArea
            label='Summary'
            onChange={setDraftSummary}
            value={draftSummary}
            placeholder='Put summary for new article'
            maxLength={300}
          />
        </Modal>

        <Content>
          <Header />

          <Paper className={styles.Paper}>
            <h4>Articles</h4>

            <ul className={styles.Articles}>
              {_.map([...draftArticles, ...articles], (article) => {
                const {id, slug, title, summary, author, created_at} = article
                const {nickname} = author
                const createdAt = moment(created_at).format('MMMM Do YYYY')
                return (
                  <li key={id}>
                    <ActiveLink
                      href={`/article?slug=${slug}`}
                      as={`/w/${slug}`}
                    >
                      <h4>{title}</h4>
                    </ActiveLink>

                    <p className="description">
                      <span>{summary}</span>
                      <span className="author">by <b>{nickname}</b></span>
                      {!article.isPublished && (
                        <Badge className="draft">draft</Badge>
                      )}
                    </p>

                    <small className="created-at">{createdAt}</small>
                  </li>
                )
              })}
            </ul>

            {!isLast && (
              <div className={styles.PullToFetch}>
                <Waypoint
                  scrollableAncestor="window"
                  onEnter={onPullToFetch}
                />

                <CustomLoader isShow={isRequestProgress} />
              </div>
            )}

            {isAuthenticated && (
              <FloatingActionButton className='button-fab'>
                <Tooltip
                  title="Add article"
                  placement="left"
                  size="small"
                >
                  <MdAddIcon
                    onClick={() => {
                      setIsShowCreateArticleModal(true)
                    }}
                  />
                </Tooltip>
              </FloatingActionButton>
            )}
          </Paper>
        </Content>
      </div>
    </Layout>
  )
})
