import Document, { Head, Main, NextScript } from 'next/document'
import * as ReactFreeStyle from 'react-free-style'

import bowser from 'bowser'
import _ from 'lodash'

import getConfig from 'next/config'

const config = getConfig()
const {
  staticFolder,
  segmentWriteKey
} = config.publicRuntimeConfig

// https://github.com/blakeembrey/react-free-style
const customScript = () => `
  function ready(fn) {
    if (document.attachEvent ? document.readyState === "complete" : document.readyState !== "loading"){
      fn();
    } else {
      document.addEventListener('DOMContentLoaded', fn);
    }
  }
  
  // call on dom-ready
  ready(function () {
    // remove ReactFreeStyle style.
    if (!document.getElementById("${ReactFreeStyle.STYLE_ID}")) return;
    document.head.removeChild(document.getElementById("${ReactFreeStyle.STYLE_ID}"));
  })
  
  // Load analytics.js(of segment.com)
  !function(){var analytics=window.analytics=window.analytics||[];if(!analytics.initialize)if(analytics.invoked)window.console&&console.error&&console.error("Segment snippet included twice.");else{analytics.invoked=!0;analytics.methods=["trackSubmit","trackClick","trackLink","trackForm","pageview","identify","reset","group","track","ready","alias","debug","page","once","off","on"];analytics.factory=function(t){return function(){var e=Array.prototype.slice.call(arguments);e.unshift(t);analytics.push(e);return analytics}};for(var t=0;t<analytics.methods.length;t++){var e=analytics.methods[t];analytics[e]=analytics.factory(e)}analytics.load=function(t,e){var n=document.createElement("script");n.type="text/javascript";n.async=!0;n.src=("https:"===document.location.protocol?"https://":"http://")+"cdn.segment.com/analytics.js/v1/"+t+"/analytics.min.js";var o=document.getElementsByTagName("script")[0];o.parentNode.insertBefore(n,o);analytics._loadOptions=e};analytics.SNIPPET_VERSION="4.1.0";
  analytics.load("${segmentWriteKey}");
  analytics.page();
  }}();
`

export default class MyDocument extends Document {
  static async getInitialProps (ctx) {
    const page = ctx.renderPage()

    const headers = _.get(ctx, 'req.headers', {})
    const browser = bowser.detect(headers['user-agent'])

    const styles = ReactFreeStyle.rewind()
    return {...page, css: styles.toCss(), browser}
  }

  render () {
    const { browser, css } = this.props

    let bodyClass = _.toLower(browser.name)
    if (browser.tablet) {
      bodyClass += ` tablet`
    } else if (browser.mobile) {
      bodyClass += ` mobile`
    }

    return (
      <html>
      <Head>
        <style dangerouslySetInnerHTML={{__html: css}}/>

        <meta charSet="UTF-8"/>

        <link href={`${staticFolder}/favicon.ico`} rel="icon" type="image/x-icon"/>

        <meta name="viewport" content="user-scalable=no, width=device-width, initial-scale=1, maximum-scale=1"/>

        {/* custom styles goes here */}
        <link rel="stylesheet" href={`${staticFolder}/assets/sanitize.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/waves.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/emoji-mart.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/emoji-js.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/highlight-github.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/prism-github.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/katex.css`}/>
        <link rel="stylesheet" href={`${staticFolder}/assets/symbol/sprite.css`}/>

        {/* custom script goes here */}
        <script dangerouslySetInnerHTML={{__html: customScript()}}/>
      </Head>
      <body className={bodyClass}>
      <Main/>
      <NextScript/>

      </body>
      </html>
    )
  }
}
