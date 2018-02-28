import Layout from 'src/views/components/Layout'
import Link from 'next/link'
import { styled } from 'react-free-style'
import connext from 'src/views/hoc/connext'
import Head from 'next/head'

import {
  requestChannels,
  getAll as getChannels
} from 'src/views/modules/channel'

const withStyles = styled({
  Link: {
    color: 'red'
  }
})

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
  await ctx.dispatch(requestChannels())
  return {}
}

const mapStateToProps = (state) => {
  return {
    channels: getChannels(state)
  }
}

const mapDispatchToProps = {}

export default connext(mapStateToProps, mapDispatchToProps)(Index)
