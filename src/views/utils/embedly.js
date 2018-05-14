import axios from 'axios'

// FROM: https://gist.github.com/steveliles/5a37b75a9aa847eb3b175750050ae138
// one-time init of the embedly platform.js, hidden behind

export const initialize = (w, d) => new Promise((resolve) => {
  let id = 'embedly-platform', n = 'script'
  if (!d.getElementById(id)) {
    w.embedly = w.embedly || function () {(w.embedly.q = w.embedly.q || []).push(arguments)}

    let e = d.createElement(n)
    e.id = id
    e.async = 1
    e.src = '//cdn.embedly.com/widgets/platform.js'
    // Resolve onload.
    e.onload = () => requestAnimationFrame(() => resolve(window.embedly))
    let s = d.getElementsByTagName(n)[0]

    w.embedly('defaults', {
      cards: {
        override: true,
        align: 'left',
        key: process.env.EMBEDLY_KEY,
        controls: '0'
      }
    })

    s.parentNode.insertBefore(e, s)
  }
})

export const oembed = (url) => axios.get('https://api.embedly.com/1/oembed', {
  params: {url, key: process.env.EMBEDLY_KEY}
}).then(({data}) => data)

export default initialize
