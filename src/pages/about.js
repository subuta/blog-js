import Layout from '../components/Layout.js'
import connext from '../hoc/connext'

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