import connext from 'src/views/hoc/connext'
import { compose } from 'recompose'
import authorized from 'src/views/hoc/authorized'
import catchError from 'src/views/hoc/catchError'
import ProfileRoute from 'src/views/components/routes/User/Profile'
import _ from 'lodash'

import { throw404 } from 'src/views/utils/next'
import auth0 from 'src/views/utils/auth0'

import {
  requestMe
} from 'src/views/modules/user'

const mapDispatchToProps = {
  requestMe
}

const enhance = compose(
  connext(() => ({}), mapDispatchToProps),
  authorized,
  catchError
)

const Profile = (props) => <ProfileRoute {...props}/>

Profile.getInitialProps = async function (ctx) {
  // Throw 404 for non-logged-in User.
  if (!auth0.isAuthenticated()) return throw404()

  let promises = []

  promises.push(ctx.dispatch(requestMe()))

  await Promise.all(promises)

  return {}
}

export default enhance(Profile)
