import moment from 'src/views/utils/moment'
import { withRouter } from 'next/router'
import _ from 'lodash'
import Layout from 'src/views/components/layout/Layout'
import ActiveLink from 'src/views/components/common/ActiveLink'
import FloatingActionButton from 'src/views/components/common/FloatingActionButton'
import Tooltip from 'src/views/components/common/Tooltip'

import {
  compose
} from 'recompose'

import MdAddIcon from 'react-icons/lib/md/add'

import withStyles from './style'
import connect from './connect'

import Sidebar from '../_Sidebar'
import Header from '../_Header'
import Content from '../_Content'
import Paper from '../_Paper'

const enhance = compose(
  withStyles,
  connect,
  withRouter
)

export default enhance((props) => {
  const {
    styles,
    articles,
    isAuthenticated,
  } = props

  return (
    <Layout>
      <div className={styles.ScrollContainer}>
        <Sidebar/>

        <Content>
          <Header />

          <Paper className={styles.Paper}>
            <h4>Articles</h4>

            <ul className={styles.Articles}>
              {_.map(articles, (article) => {
                const {id, slug, title, summary} = article
                const createdAt = moment(props.createdAt).format('MMMM Do YYYY')
                return (
                  <li key={id}>
                    <ActiveLink
                      href={`/article?slug=${slug}`}
                      as={`/w/${slug}`}
                    >
                      <h4>{title}</h4>
                    </ActiveLink>

                    <p>{summary}</p>

                    <small className="created-at">{createdAt}</small>
                  </li>
                )
              })}
            </ul>

            {isAuthenticated && (
              <FloatingActionButton className='button-fab'>
                <Tooltip
                  title="Add article"
                  placement="left"
                  size="small"
                >
                  <MdAddIcon />
                </Tooltip>
              </FloatingActionButton>
            )}
          </Paper>
        </Content>
      </div>
    </Layout>
  )
})
