import Layout from 'src/views/components/Layout'
import connext from 'src/views/hoc/connext'

const mapStateToProps = (state) => {
  return {
    counter: state.counter
  }
}

export default connext(mapStateToProps)((props) => (
  <Layout>
    <p>This is the about page ({props.counter})</p>
  </Layout>
))
