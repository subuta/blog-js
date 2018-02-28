import Layout from 'src/views/components/Layout'
import Link from 'next/link'
import axios from 'axios'
import { styled } from 'react-free-style'
import connext from 'src/views/hoc/connext'
import Head from 'next/head'

import {
  requestChannels
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
      {/*
      <ul>
        {props.shows.map(({show}) => (
          <li key={show.id} className={props.styles.Link}>
            <Link as={`/p/${show.id}`} href={`/post?id=${show.id}`}>
              <a>{show.name}</a>
            </Link>
          </li>
        ))}
      </ul>
      */}
    </Layout>
  )
})

Index.getInitialProps = async function(ctx) {
  // console.log(ctx.req.headers);
  await ctx.dispatch(requestChannels())
  return {}
}

const mapStateToProps = (state) => {
  console.log(state);
  return {}
}

const mapDispatchToProps = {
}

export default connext(mapStateToProps, mapDispatchToProps)(Index)
