// FROM: https://gist.github.com/kirkonrails/73fffc83943ad52b6fc0
export default function isRetina () {
  // if SSR then return false(defaults to non-retina)
  if (typeof window === 'undefined') return false

  const mediaQuery = '(-webkit-min-device-pixel-ratio: 1.5),\
					  (min--moz-device-pixel-ratio: 1.5),\
					  (-o-min-device-pixel-ratio: 3/2),\
					  (min-resolution: 1.5dppx)'

  if (window.devicePixelRatio > 1) return true

  return !!(window.matchMedia && window.matchMedia(mediaQuery).matches)
}
