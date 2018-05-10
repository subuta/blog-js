// FROM: https://gist.github.com/steveliles/5a37b75a9aa847eb3b175750050ae138
// one-time init of the embedly platform.js, hidden behind

let embedly;

export const initialize = function (w, d) {
  let id = 'embedly-platform', n = 'script'
  if (!d.getElementById(id)) {
    w.embedly = w.embedly || function () {(w.embedly.q = w.embedly.q || []).push(arguments)}
    let e = d.createElement(n)
    e.id = id
    e.async = 1
    e.src = '//cdn.embedly.com/widgets/platform.js'
    let s = d.getElementsByTagName(n)[0]

    w.embedly('defaults', {
      cards: {
        override: true,
        align: 'left',
        key: process.env.EMBEDLY_KEY,
        controls: '0'
      }
    })

    embedly = w.embedly

    s.parentNode.insertBefore(e, s)
  }
}

export const embed = (node) => window.embedly('card', node)

export const getEmbedly = () => embedly

export default initialize
