import { oembed } from 'src/views/utils/embedly'

// Find and upgrade target node in the dom.
export default (node) => {
  // TODO: urlを元に、upgradeDomを呼んでnodeを装飾するやつを書く。
  oembed('https://www.youtube.com/watch?v=KdYms5pRwS4').then((res) => {
    console.log('res = ', res)
    console.log('quote-url node', node)
  })

  return node
}
