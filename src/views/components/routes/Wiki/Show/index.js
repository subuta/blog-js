import moment from 'src/views/utils/moment'
import Layout from 'src/views/components/layout/Layout'
import _ from 'lodash'

import { toHtml } from 'src/views/utils/markdown'
import Router from 'next/router'

import ActiveLink from 'src/views/components/common/ActiveLink'
import FloatingActionButton from 'src/views/components/common/FloatingActionButton'
import Editor from 'src/views/components/common/Editor'
import MarkdownContent from 'src/views/components/common/MarkdownContent'
import TextField from 'src/views/components/common/TextField'
import TextArea from 'src/views/components/common/TextArea'
import Tooltip from 'src/views/components/common/Tooltip'

import Menu from 'src/views/components/common/Menu'
import MaterialButton from 'src/views/components/common/MaterialButton'
import Modal from 'src/views/components/common/Modal'
import Confirm from 'src/views/components/common/Confirm'
import Reactions from 'src/views/components/common/Reactions'
import Notifications from 'src/views/components/common/Notifications'

import Sidebar from '../_Sidebar'
import Header from '../_Header'
import Content from '../_Content'
import Paper from '../_Paper'

import {
  compose,
  branch,
  withState,
  withHandlers,
  withPropsOnChange,
  renderComponent
} from 'recompose'

import MdEditIcon from 'react-icons/lib/md/edit'
import MdSaveIcon from 'react-icons/lib/md/save'
import MdPublishIcon from 'react-icons/lib/md/publish'
import MdLockIcon from 'react-icons/lib/md/lock-outline'
import MdMoreVertIcon from 'react-icons/lib/md/more-vert'

import withStyles from './style'
import connect from './connect'
import storage from 'src/views/utils/storage'

const isBrowser = typeof window !== 'undefined'

const enhanceContent = compose(
  branch(
    ({isEditing}) => isEditing,
    renderComponent((props) => {
      const {
        setEditorInstance,
        onSetDraftContent,
        draftContent,
        styles
      } = props
      return (
        <div className={styles.EditorArea}>
          <Editor
            className="editor-wrapper"
            onSave={onSetDraftContent}
            initialValue={draftContent}
            instance={setEditorInstance}
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
        onSave,
        onPublish
      } = props

      let subActions = []

      if (article.isPublished) {
        subActions.push(
          <Tooltip
            title="Mark this article as draft"
            placement="left"
            size="small"
          >
            <MdLockIcon
              onClick={onPublish}
            />
          </Tooltip>
        )
      } else {
        subActions.push((
          <Tooltip
            title="Publish this article"
            placement="left"
            size="small"
          >
            <MdPublishIcon
              onClick={onPublish}
            />
          </Tooltip>
        ))
      }

      return (
        <FloatingActionButton
          className='button-fab'
          subActions={subActions}
        >
          <Tooltip
            title="Save this article"
            placement="left"
            size="small"
          >
            <MdSaveIcon onClick={onSave}/>
          </Tooltip>
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
      <Tooltip
        title="Edit this article"
        placement="left"
        size="small"
      >
        <ActiveLink
          href={`/article?slug=${article.slug}&edit=true`}
          as={`/w/${article.slug}/edit`}
        >
          <MdEditIcon/>
        </ActiveLink>
      </Tooltip>
    </FloatingActionButton>
  )
})

const enhance = compose(
  withStyles,
  connect,
  withState('draftContent', 'setDraftContent', ({article}) => article ? article.content : ''),
  withState('draftSlug', 'setDraftSlug', ({article}) => article ? article.slug : ''),
  withState('draftSummary', 'setDraftSummary', ({article}) => article ? article.summary : ''),
  withState('draftTitle', 'setDraftTitle', ({article}) => article ? article.title : ''),
  withState('isShowUpdateArticleModal', 'setIsShowUpdateArticleModal', false),
  withState('isShowConfirmArticleDeleteModal', 'setIsShowConfirmArticleDeleteModal', false),
  withState('isShowMenu', 'setIsShowMenu', false),
  withHandlers(() => {
    let targetRef = null
    let editorInstance
    let notificationInstance

    return {
      setTargetRef: () => (ref) => {
        targetRef = ref
      },

      setEditorInstance: () => (instance) => {
        editorInstance = instance
      },

      setNotificationInstance: () => (instance) => {
        notificationInstance = instance
      },

      notify: () => (message, timeout) => {
        notificationInstance.notify(message, timeout)
      },

      ask: () => (message, handlers) => {
        notificationInstance.ask(message, handlers)
      },

      resetEditor: () => (initialValue) => {
        if (!editorInstance) return
        editorInstance.reset(initialValue)
      },

      focusEditor: () => () => {
        if (!editorInstance) return
        editorInstance.focus()
      },

      getIsFocused: () => () => {
        if (!editorInstance) return false
        return editorInstance.getIsFocused()
      },

      getTargetRef: () => () => targetRef
    }
  }),
  withPropsOnChange(
    ['url', 'articleId'],
    (props) => {
      const {
        url,
        article,
        setDraftContent,
        setDraftSlug
      } = props

      if (article) {
        setDraftContent(article.content)
        setDraftSlug(article.slug)
      }

      return {
        isEditing: _.get(url, 'query.edit')
      }
    }
  ),
  withPropsOnChange(
    ['articleId'],
    (props) => {
      const {
        article,
        setDraftContent,
        resetEditor,
        focusEditor,
        isEditing,
        ask,
        notify
      } = props

      if (!isBrowser || !isEditing) return

      // Check draft content from localStorage at article shown.
      const previousValue = storage.getItem(`articles.${article.id}.draft`)
      if (!previousValue) return

      // Prompt restore changes.
      requestAnimationFrame(() => {
        focusEditor()

        ask('Found your previous edit, Want to restore that?', {
          onConfirm: () => {
            setDraftContent(previousValue)

            resetEditor(previousValue)
            focusEditor()

            notify('Your changes restored successsfully :)')
          },

          onClose: () => {
            storage.removeItem(`articles.${article.id}.draft`)
          }
        })
      })
    }
  ),
  withHandlers(() => {
    const sanitizeArticleProps = (article) => _.pick(article, [
      'title',
      'summary',
      'content',
      'slug',
      'isPublished'
    ])

    return {
      onPublish: ({article, updateArticle}) => () => {
        const {isPublished} = article

        // toggle published state.
        updateArticle(article.id, sanitizeArticleProps({
          ...article,
          isPublished: !isPublished
        }))
      },

      onDelete: ({article, deleteArticle}) => () => {
        deleteArticle(article.id).then(() => {
          Router.push(`/articles`, `/w`)
        })
      },

      onAddReaction: ({article, addReaction}) => (emoji) => {
        // toggle published state.
        addReaction(article.id, {emoji})
      },

      onRemoveReaction: ({article, removeReaction}) => (emoji) => {
        // toggle published state.
        removeReaction(article.id, {emoji})
      },

      onSetDraftContent: (props) => (value) => {
        const {
          article,
          setDraftContent,
          getIsFocused
        } = props

        // Ignore if content & draft is same.
        if (article.content === value) return

        setDraftContent(value)

        // Backup current text to localStorage
        requestAnimationFrame(() => {
          if (!getIsFocused()) return

          if (!value) {
            // clear item if value is empty.
            storage.removeItem(`articles.${article.id}.draft`)
          } else {
            storage.setItem(`articles.${article.id}.draft`, value)
          }
        })
      },

      onSave: (props) => () => {
        const {
          article,
          draftSlug,
          draftTitle,
          draftContent,
          draftSummary,
          updateArticle
        } = props

        const slug = draftSlug

        const nextArticle = sanitizeArticleProps({
          title: draftTitle,
          summary: draftSummary,
          content: draftContent,
          slug,
        })

        if (_.isEqual(sanitizeArticleProps(article), nextArticle)) {
          return Router.replace(`/article?slug=${article.slug}`, `/w/${article.slug}`)
        }

        updateArticle(article.id, nextArticle).then(() => {

          Router.replace(`/article?slug=${slug}`, `/w/${slug}`)
        })
      }
    }
  })
)

export default enhance((props) => {
  const {
    article,
    styles,
    isAuthenticated,
    isShowMenu,
    isShowUpdateArticleModal,
    isShowConfirmArticleDeleteModal,
    onSave,
    onDelete,
    onAddReaction,
    onRemoveReaction,
    draftSlug,
    draftTitle,
    draftSummary,
    setNotificationInstance,
    setIsShowMenu,
    setIsShowUpdateArticleModal,
    setIsShowConfirmArticleDeleteModal,
    setDraftSlug,
    setDraftTitle,
    setDraftSummary,
    getTargetRef,
    setTargetRef,
    currentUser,
    isEditing
  } = props

  if (!article) return null

  const {title, isPublished, content, author, id} = article
  const {nickname} = author
  const createdAt = moment(article.createdAt).format('MMMM Do YYYY')

  return (
    <Layout>
      <div className={styles.ScrollContainer}>
        <Sidebar/>

        <Modal
          title='Update article settings'
          isShow={isShowUpdateArticleModal}
          className={styles.UpdateArticleModal}
          onClose={() => {
            setDraftSlug(article.slug)
            setDraftTitle(article.title)
            setIsShowUpdateArticleModal(false)
          }}
          onSubmit={() => {
            onSave()
            setIsShowUpdateArticleModal(false)
          }}
        >
          <TextField
            label='Title'
            onChange={setDraftTitle}
            value={draftTitle}
            placeholder='Put title for this article'
          />

          <TextField
            label='Slug'
            onChange={setDraftSlug}
            value={draftSlug}
            placeholder='Put slug for this article'
          />

          <TextArea
            label='Summary'
            onChange={setDraftSummary}
            value={draftSummary}
            placeholder='Put summary for this article'
            maxLength={300}
          />
        </Modal>

        <Confirm
          title='Are you sure?'
          message='Do you really want to delete this Article? (This action cannot be un-done)'
          isShow={isShowConfirmArticleDeleteModal}
          onCancel={() => {
            setIsShowConfirmArticleDeleteModal(false)
          }}
          onConfirm={() => {
            setIsShowConfirmArticleDeleteModal(false)
            onDelete()
          }}
        />

        <Notifications
          instance={setNotificationInstance}
        />

        <Content>
          <Header/>

          <Paper className={styles.Paper}>
            <Menu
              placement='top-end'
              modifiers={{
                inner: {enabled: true},

                preventOverflow: {
                  enabled: false,
                  padding: 0
                },

                hide: {
                  enabled: false
                },

                offset: {
                  offset: '-2px, 8px'
                },
              }}
              isShow={isShowMenu}
              onHide={() => setIsShowMenu(false)}
              trigger={getTargetRef()}
            >
              <ul>
                <li onClick={() => {
                  setIsShowMenu(false)
                  setIsShowUpdateArticleModal(true)
                }}>
                  Update article settings
                </li>

                <li onClick={() => {
                  setIsShowMenu(false)
                  setIsShowConfirmArticleDeleteModal(true)
                }}>
                  Delete this article
                </li>
              </ul>
            </Menu>

            {isAuthenticated && (
              <MaterialButton
                className={`${styles.MenuButton} ${isEditing ? 'is-show' : ''}`}
                wavesClasses={['waves-float']}
                ref={setTargetRef}
                onClick={() => setIsShowMenu(true)}
                ghost
              >
                <MdMoreVertIcon/>
              </MaterialButton>
            )}

            <h4 className={styles.Title}>{title}</h4>

            <div className={styles.SubTitle}>
              <small className="created-at">{createdAt}</small>
              <small className="author">by {nickname}</small>
              <small className="published">{isPublished ? '' : 'draft'}</small>
            </div>

            <ArticleContent {...props}/>

            {!isEditing && (
              <Reactions
                reactions={article.reactions}
                onAddReaction={onAddReaction}
                onRemoveReaction={onRemoveReaction}
                disabled={!isAuthenticated}
                currentUser={currentUser}
              />
            )}

            {isAuthenticated && <ArticleAction {...props}/>}
          </Paper>
        </Content>
      </div>
    </Layout>
  )
})
