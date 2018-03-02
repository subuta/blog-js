import React from 'react'
import _ from 'lodash'
import auth0 from 'src/views/utils/auth0'
import Cookie from 'js-cookie'

export default function (Component) {
  let render = (props) => {
    return (
      <Component {...props} />
    )
  }

  render.getInitialProps = async (ctx) => {
    const fn = Component.getInitialProps || _.noop

    // decorate session to ctx.
    ctx.session = auth0.getSession(ctx)
    ctx.isAuthenticated = auth0.isAuthenticated(ctx)

    const props = await fn(ctx)

    // return final props.
    return {
      ...props,
      isAuthenticated: ctx.isAuthenticated
    }
  }

  return render
}
