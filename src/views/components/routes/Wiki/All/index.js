import moment from 'src/views/utils/moment'
import { withRouter } from 'next/router'
import _ from 'lodash'
import Layout from 'src/views/components/layout/Layout'
import ActiveLink from 'src/views/components/common/ActiveLink'

import {
  compose,
  lifecycle,
} from 'recompose'

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

export default enhance(({styles, articles}) => {
  return (
    <Layout>
      <Sidebar/>

      <Content>
        <Header/>

        <Paper>
          <h4>Articles</h4>

          <ul className={styles.Articles}>
            {_.map(articles, (props) => {
              const {id, title, summary} = props
              const createdAt = moment(props.createdAt).format('MMMM Do YYYY')
              return (
                <li key={id}>
                  <ActiveLink
                    href={`/article?id=${id}`}
                    as={`/w/${id}`}
                  >
                    <h4>{title}</h4>
                  </ActiveLink>

                  <p>{summary}</p>

                  <small className="created-at">{createdAt}</small>
                </li>
              )
            })}
          </ul>
        </Paper>
      </Content>
    </Layout>
  )
})
