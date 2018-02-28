import Layout from 'src/views/components/Layout'
import connext from 'src/views/hoc/connext'
import axios from 'axios'

const Post =  (props) => (
  <Layout>
    <h1>{props.show.name}</h1>
    <p>{props.show.summary.replace(/<[/]?p>/g, '')}</p>
    <img src={props.show.image.medium}/>
  </Layout>
)

Post.getInitialProps = async function (context) {
  const { id } = context.query
  const res = await axios.get(`https://api.tvmaze.com/shows/${id}`)
  const show = await res.data

  console.log(`Fetched show: ${show.name}`)

  return { show }
}

export default connext()(Post)
