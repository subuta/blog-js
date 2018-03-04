import Layout from 'src/views/components/Layout'
import connext from 'src/views/hoc/connext'
import { getAll as getChannels, requestChannel } from '../modules/channel'
import { compose } from 'recompose'
import authorized from '../hoc/authorized'

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

const Channel =  (props) => {
  console.log('props = ', props);
  return (
    <Layout>
      <h1>hoge</h1>
      {/*
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium}/>
    */}
    </Layout>
  )
}

Channel.getInitialProps = async function (ctx) {
  const { id } = ctx.query
  await ctx.dispatch(requestChannel(id))
  return {}
}

export default enhance(Channel)
