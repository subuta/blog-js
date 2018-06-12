import React from 'react'
import { throw404 } from 'src/views/utils/next'

// catches error at getInitialProps and render valid react component.
export default function (Component) {
  let render = (props) => {
    return (
      <Component {...props} />
    )
  }

  render.getInitialProps = async (ctx) => {
    const fn = Component.getInitialProps || _.noop

    const props = await fn(ctx).catch((error) => {
      if (error && error.status === 404) return throw404()
      throw error
    })

    // return final props.
    return {
      ...props,
    }
  }

  return render
}
