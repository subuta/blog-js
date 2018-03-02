import Layout from 'src/views/components/Layout'
import Link from 'next/link'
import { styled } from 'react-free-style'
import Head from 'next/head'
import { compose } from 'recompose'

import connext from 'src/views/hoc/connext'
import authorized from 'src/views/hoc/authorized'

import {
  requestChannels,
  getAll as getChannels
} from 'src/views/modules/channel'

const withStyles = styled({
  Link: {
    color: 'red'
  }
})

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state)
  }
}

const mapDispatchToProps = {}

const enhance = compose(
  connext(mapStateToProps, mapDispatchToProps),
  authorized
)

const Index = withStyles((props) => {
  return (
    <Layout>
      <Head>
        <title>aa</title>
      </Head>
      <h1 onClick={props.increment}>Batman TV Shows({props.counter})</h1>
      <ul>
        {props.channels.map(({id, name}) => (
          <li key={id} className={props.styles.Link}>
            <Link as={`/c/${id}`} href={`/channel?id=${id}`}>
              <a>{name}</a>
            </Link>
          </li>
        ))}
      </ul>
    </Layout>
  )
})

Index.getInitialProps = async function (ctx) {
  console.log(ctx.session)
  await ctx.dispatch(requestChannels()).catch((err) => {
    // console.log('err = ', err)
  })
  return {}
}

export default enhance(Index)
