import transformer from './transformer'

export default function plugin (settings) {
  return transformer(settings)
}
