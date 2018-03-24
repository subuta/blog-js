import React from 'react'
import _ from 'lodash'
import auth0 from 'src/views/utils/auth0'

export default function (Component) {
  let render = (props) => {
    return (
      <Component {...props} />
    )
  }

  render.getInitialProps = async (ctx) => {
    const fn = Component.getInitialProps || _.noop

    const isAuthenticated = auth0.isAuthenticated(ctx.req)

    // decorate ctx.
    if (!!ctx.res) {
      const locals = _.get(ctx, 'res.locals', {})
      _.set(ctx, 'res.locals', {
        ...locals,
        isAuthenticated
      })
    }

    const props = await fn(ctx)

    // return final props.
    return {
      ...props,
      isAuthenticated
    }
  }

  return render
}
