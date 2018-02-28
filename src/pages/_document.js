import Document, { Head, Main, NextScript } from 'next/document'
import * as ReactFreeStyle from 'react-free-style'

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
`

export default class MyDocument extends Document {
  static async getInitialProps ({renderPage}) {
    const page = renderPage()
    const styles = ReactFreeStyle.rewind()
    return {...page, css: styles.toCss()}
  }

  render () {
    return (
      <html>
      <Head>
        <style dangerouslySetInnerHTML={{__html: this.props.css}}/>
        <script dangerouslySetInnerHTML={{__html: customScript()}}/>
      </Head>
      <body>
      <Main/>
      <NextScript/>
      </body>
      </html>
    )
  }
}
