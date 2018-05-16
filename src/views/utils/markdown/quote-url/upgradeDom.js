import iframely from 'src/views/utils/iframely'

// Find and upgrade target node in the dom.
export default (node) => {
  node.querySelectorAll('.quote-url').forEach(async n => {
    const url = n.getAttribute('data-quote-url')
    if (!url) return

    const response = await iframely(url)
    console.log('response = ', response)

    console.log('n = ', n)
    // n.outerHTML = res.html
  })
  return node
}
