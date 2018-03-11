import color from 'color'

export const BLACK_COLOR = '#4A4A4A'
export const ACCENT2_COLOR = '#E74F4B'
export const ACCENT4_COLOR = '#4881C3'
export const LIGHT_ACCENT3_COLOR = '#EEECF5'
export const PRIMARY_COLOR = '#FFFFFF'
export const PRIMARY2_COLOR = '#FEFAEA'
export const GRAY_COLOR = '#EEEEEE'
export const DIMMED_BLACK_COLOR = color(BLACK_COLOR).fade(0.4).string()
export const BORDER_COLOR = '#D4D4D5'
export const SHADOW_COLOR = 'rgba(34, 36, 38, 0.15)'

// Primary color for Chat app.
export const CHAT_APP_COLOR = '#6B6998'
export const WIKI_APP_COLOR = '#7CC09E'

// Global settings
export const PAGE_MIN_HEIGHT = 456

// header(description area)
export const CHAT_HEADER_HEIGHT = 56
export const WIKI_HEADER_HEIGHT = 128

// sidebar
export const NAVIGATION_WIDTH = 64
export const SIDEBAR_WIDTH = 204

// FONTS
export const LATO_WITH_SANS_FONT = '\'Lato\', \'Noto Sans Japanese\', \'Noto Serif Japanese\', \'游ゴシック\', \'Yu Gothic\', \'HiraKakuProN-W3\', \'Hiragino Kaku Gothic ProN\', \'メイリオ\', \'Meiryo\', \'ＭＳ Ｐゴシック\', sans-serif'
export const SANS_FONT = '\'Noto Sans Japanese\', \'Noto Serif Japanese\', \'游ゴシック\', \'Yu Gothic\', \'HiraKakuProN-W3\', \'Hiragino Kaku Gothic ProN\', \'メイリオ\', \'Meiryo\', \'ＭＳ\ Ｐゴシック\', sans-serif'
export const SERIF_FONT = '\'Noto Serif Japanese\', \'游ゴシック\', \'Yu Gothic\', \'HiraKakuProN-W3\', \'Hiragino Kaku Gothic ProN\', \'メイリオ\', \'Meiryo\', \'ＭＳ\ Ｐゴシック\' ,serif'

// MEDIA QUERY
export const MOBILE_MEDIA_QUERY = '@media (min-width: 320px)'
export const TABLET_MEDIA_QUERY = '@media (min-width: 768px)'
export const PC_MEDIA_QUERY = '@media (min-width: 1280px)'

// Z Index
export const Z_INDEX_1 = {
  boxShadow: 'rgba(0, 0, 0, 0.12) 0px 1px 6px, rgba(0, 0, 0, 0.12) 0px 1px 4px'
}

export const Z_INDEX_2 = {
  boxShadow: 'rgba(0, 0, 0, 0.16) 0px 3px 10px, rgba(0, 0, 0, 0.23) 0px 3px 10px'
}

export const Z_INDEX_3 = {
  boxShadow: 'rgba(0, 0, 0, 0.19) 0px 10px 30px, rgba(0, 0, 0, 0.23) 0px 6px 10px'
}

// 背景のノイズのスタイル
export const NOISE_PATTERN = {
  position: 'relative',
  zIndex: 1,
  '&:before': {
    content: '\'\'',
    position: 'absolute',
    zIndex: -2,
    top: 0,
    bottom: 0,
    left: 0,
    right: 0,
    opacity: 0.4,
    backgroundImage: 'url(data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAGQAAABkCAYAAABw4pVUAAAZdElEQVR4XsVd95MbR3ZuYHPO5FKkRFE66exzts/l7LJ/8P9t+3znK/sC607UUYlJTJt3AexisQjj+nrwBm/evO5+A/LKqFKJC8x0eDn160aWZVnn9Ilb3f7EWT/D/pWbmVuePJ5lzjUabtjvupm5peL7686hW1y95bLR0DWaM2407Lve5aFbWr8bnWpwc+lm51esy/HPdU6+c6s7nwbf6bZeFfPyZ+n7y7PnrtFouOXNj4ox8N3K1v3i7277jVtau6PO0T7+2q3tfl757fLsmVvZ+rj0fe/y2C2s7Ja+619fuLnFDdcAQrQZBjcdNzu/6oaDazczu+guz164la18sVcXL93yxr0kwI6f/8zt3v97/1z76Cs3v7Lr392682fFu4QsfHHTPXPzS1vJcUeDnmvOLlSeo7UmBxg/MBreuObMfPE4AYW+4Eik74jI6O8KcbLJs9HANZqzxTcEUzmPh8/Jd25t59MJQrJs5BqNpmsff+PWdj9zeLk5s+Buuqdu2L92GBwUKDfhZxtzSAoQnFouT5+6le0H6isXb3/rljc+9NymAb4AWIBiaeOh9fSuTtzC8k5quf53juR+99zNLW0m3wMHzMwteoJOfsawu26/dYtr+65xc3WWpSaRmA5NkgJEcnGGB4hg8CgBlq/v5urUzS9vFyNdvPmt27jzJ+rIktpD07dPvnWzc0slUdu/brm5xfXSK1ykadxl2N6EQ7qt1576pbwLDcJFDX+md3nkFlb2Sq9xUXTdOXCLq7cnYqJ77k5fP3S3P/0Xh42v7fyg9C6ABs4lmQs91JyZK5DBHw5R8MXhY7dx6w8s8Kj1jCa6oZ8gWeYWVl2ve+q5BHqUPmevH7qtD/7c/0kERYSBdVZ0CFeoUqlhEAlQmggIAlKXNz8sJgeCIZrwHRkBV+ffu+Gg63WFRJyEBjYMkSGRJJ/TlCQ9IzkG33NxOei13ezCmoPIGI0GJd1Y19ihOfl6rs5flAwFvnYNoUGlHuIAGpAolf4OWRn4PWUBEQddd47c4mqZu/A+iQeSs1YylmsMvQeu7pw9czv3/to6tOPcKDlz0Lt0swv1rESauEAIKXW+Is1quTj40m3c/lFy4ZrpCsRAJMIEtn5gSoPTYBJqn+7Fa7e08UHlp5QMj1lHcrCzVw/d1t1czODTOnrs1vdsIhBSZmn9Tsma4+NLQi4Qcv7mN27zzp9WNqbJ5RTFW4ANM7rRcJ6dud5JiQlCNMlfafWpJrGwAmMWniZ2LPuZSIrcSoVeaDZnSwYGPaOpgoJDrlqvM+7skGl6fvCF27z9x8G1WH2ROpvhz2q2umUsQq7G8dr7XCem5gS3Ynw4thqXQ6TC74ABAsI4f/uF2773V35a6E6uX0N7CeoQrpisDhufJEYFcjGYC/6O5unKMZfW9qO+iQVp8hmOPCAFhkBjZq5Q8JwLSbdafRLMpXnr+B5G0NJ6WdwGEVJnY+R/kCiz2vcT8VA1lS3zw0yeW1grzGiiQvo/UTxtXFuXtIIkZ0mrkvYaM3qk36a5AkkOuTp/6ZY30+EQC6Cmfebi4Au3ERGT1nFj4oqQQrpq0Ou42YWJR02/x6xG6zpi5ngSIfyB0aDvmrNzDtSD8EXKX7AuUHuO+wnSMpOef+fkqVve+CAqsgAE57JizZxaJ5xT9bI1MSoDgNr661hrFjg1RsN+xgNgoZcslol89+Tl/wZte1hJCFoiqmv1F0pEM/bYQcnN5lwpLmYJ4VjDQWT6h3RGXd8ohZSKDvHxmNV9H06njzQtIZOBRIQENOsBlI5wBw/FhxZy9PQnbu/BP6XWWfq90A3tN96+n51bDs6lAT4UFQaRIFDaOfnWLW/dr4TaKY4GgwUWUx6M1cPu1g1xfwnzN4aDmwxf8hgWyVHN7eebsSpvzZo4ffkLt33vxxUvnjtdXBzAUoFFwsPlfNN8LVj33OKmD+fzfEYISNr6WoeP3dre5x7o/CMV9NGTn7i9T+IEpVmpPOIMcxpmtDebQ/kQbfHghn6v5TZu/5G6N2wMMSpwRsju7pw+davbD5zmSWvfTZOskvErUuAcmKPBjWvOzleSatzpxXtIAwCgFCCUSTgrJwSJQaQQKgjxLLjzWSGySEaGPHmaiMxAbnNPoxvkwqdBiBVIdddn1aNaAJYi2Sn/pRaHyI0S8EM2uSYK+BgUaeXfcc46evZfbu/jfwzCVwJUxpysiMFzhX4YJ84On/xH7llnWSk1jOdGw55qnmthHxCUy0Y+oixF33X7wG3sl6MhHiEy/mOlhDobftdnAQjvBK7t1xqK74UUcEicAnjtw8duaxzukBNpMTwuZrl0sHI2RbKJuKIckoqY8gVr1oY0CUMhmJgJSlSnsTq+gxOIDCHNxUM2oaIEHofTuJT2RY4d1xspq8picktEw3gBAuHveYRwzFuDYDQoAAaApuJQeB6W0M3ViVu/9YdBKidrCQvE5nh2kVsmtM5QdNhKTFLetw6/cuu3fmjmQqwDRGGx5krielxEIidSOUTLsvEXO8ffutXdcqrVvIOaD1pM69OXvyyiqqnhLeOlxvh9/l5CSMjq4LnuEOVZwvEkLyFrYR6Hkk6xDWtrBIWCy5GH8J9x/sOaTLMAmHyizukzt7pdrrPC+ynJwoszYvOpHMJFGCgKIomHibkchW3vk/qiAkNOSgovVFMVytVjnGnkcgrIUp9xJ9gDf3apFK0Ijcf1S8hHsYpPzOERghdQHeEdoLV9H2Mirkhl8LSFkheeAkrsdx4preuMxQJ+RBBBsTzmLlhn88s7BaEBDsjF8IpNGclIJbhKRpBSYVMgRANMTARx60mTydjscNgLxoLkfNyCAifBZp+bXw1GdYm6iWjID9IokXNkyC+SyCFuTRd6lCsfS/tiYnN974euc/bUNZvzRfWnhAHNVRJZdSr65IBAIDYfq68tUci4QrIOF0nzGBQ5HPRKdU8YL5YQqiacLv26fQkrC6jWWZd81pJhPX/7G7e5P6lhoDWHy4CyketevFLzwBAhV61XlXqpmGdOeoAoViuKswAh5f17BZuoPZYijXOIVL4gAi9KWI2uZZ3yGQD8unPsNm7nJn8pZsYKxSsIseYJ+IR18uexzcBSWVjd8zoMn1AumosSq0ecGwd5Vb0WxaYxU46ftn6EQBbXbnvOxBwUOTeb2KwqJsgh01g9PDSf8mVi40On4MNrjrUib82UBLBBzbAKUbO1sLJT6CKLgYI9NFzDv8NTwTLqwIlQMzpShkgoPFUg5OzVr93W3b+oEIBekl+uz7WycEpHcTGG4wtre2mPuXP8nVvdzc+FSPM4RKEQm1k2LJ9x8bpncm6jDufJ/XPkAfBLG3eDeRx6lxBU4hC5gXI1d7VkxYoI+Vzr+Gu3rhxuwXNaSjTFTanq/fdR2KftNcRx08xHHFUghKg3Fa/HwkInpaTcJxHGEQ05e9M9L6r7eGU4KWSkZBEwhHJGoQHplBgBWCPUMcoHh4xG/Yq5zlPGRVGh8UzMxdtHbmO/nNALOYoQy8l8yOnLX7nte3/pYcGtF5h22JzlJBUHpLRwQoob74QMDO1sBgFaPVAkMFmMK4Aqx03pgVCZD/aEEE8RyhGmeIyDKtFeTs2xM3WaWRcrFyJkItx9c31RQqSlkIzMXWtMSCvMkFWCGselvO2z1792Wx/kuvbk+//x/gsQsP/ZvwUZOGTg8EJxcgc8QmRhGTCfm2+TA4+h2UBV2ASS9HzDoYhwjCOKOYziIOei/EBpyqsmzizMWxG6MK1rWqVZ472oyCLWCsk8uYmQs4fChmZjxodTiI0tooXv4+jJf7q9T/65sjVpWVm85BrwKR616FbruJrIpXcbnZMnWejwpaQ6iB1SuHxyWQLKxcq7VvaRseFFXfdMPY2kOXOhqHIMaCmzXL47jTWVQlqJQ7ilcoViMIPISk2Q+n0ap+ri8JHbuDWxXChHwnMl4F5YZ/iPzOIQp5OpLX/nZi2vuokRGc+LWBzRPDTTKI43JK0sa1jE+hwQJNk/tkFL7IojXSplaQTERA8IEl6+5RxHitC0dXOTO5TQ8gipe+BeLobLbSsbT+sJ1xUr3lwPHJaxiDWyOmPzkmRJmckcbiFCq3AIKB3OGtXlal6ytL81qiPx0Tr8XVHUkIpvadyTokT8DsDeXJ+XCiJi7xWlsiwqTBxO+yXC4kZDDIEpQixOdo2tQlofiKXRbBZn4AuEhLgkxj2xRbQOHrv12/nByJMXP3c7H/2t/7fVWqk4aeMWHxYE8WdkJablfewLBElmvCQkuTaJKFiQ+KAOWTq3Gmdwt0PVIeYS+4i/UNeslYCCU7qwtF37+FpIcdfJd4OaW0df+9O/tz/9V7+0VI4l9HssqqARh4oQWFhoFIPcgaZwOddoDpXMN0AMoLjZqixDHRK0bKSkuHclhBAHpTz4bDhwjZm80YxmhlNBXup0V9LKoglQhQGAAhkYHAUAslQfz8YqAS3iou4zXJxI4lCPU8gWUuOmL9q8pKxDISSrMST7s8wtrPtWUDILCcc6ipDi3ELnsBJEjC3m7NWv3NbdPCAZ+tQpjbEYA5gnFKaHCEaZEsqV6jQt4GtP1V3Rs6r5r4j2m6szN79cbUVl4pC6VFtRqiL3wQGHjSLULo+2pUQERaFDhoUlFa0hOtSbZNoagBTsIN5co1nUJ9RCiJZzwKbQ9SbVICa0sJS5SO/5ea5OfCyMR4c1pYlNokMeiQSraJFrtCIhVshHc5+9eei27kzacwRTuKPRMIMu0GL7UOhoXgZFGToGYBU9kKM4HWspyibAhGS39L6ncRZpDn/MYXG94sPkpmvDt4Kyfgj4kgBIr3IY00kyUvKXZ0/dytYD1+j3Ohnvb8ipr9t64xunvOsnlMghayTmtZODiYXnxw+GpWPadUI2dREHHYojfLwCH7AAt+J7a28xgp/M+2j7VkWWJWGUQhKX4RRku7k8cfMr6dZ6dS017jeF3tUcspSeCu2RO4JcrIEzLk+fu5Xt+6W0Mw96SieSOKRUKPc+EKCajeOOnLEihRRiS5aOsfkmAYkDgjfkpDGt+ouApkVvQ36FNbMp99+46Z5nWjkmf9DaHKYOcEPPWkMr085VrtzPy36On/+3273/d5UhWwdfunXRG4wHUiUha4StfRcryPAiC0BANk/KSlphKCzAxZLVIkkBkuaCQYEOc0gjh/RELDTPN00OYyzMX9adkx6/hZXHWtim8hxcbIIAFpZ3vWkfghGXICazF/lxJHlk74/UwmKpSo4YHmeCGEEL11StFWUz+RpSoldL7yLyO7+4UTtmFiOsesUhk9ZUkETqKdwUFcvfSalOyyVEIZqSjXnIME3Bpf0eziJOOn9q6+cWFq/20HyUVMFEihDrwE+KLxOHvM+KjLrKjs8NEYWwOO9+TbkNrsChaLFRNRjZfuMtIBrj9PtfuO0Pf1yBoZW7g7rwuuUG/cvqGZnAQR0ap3HTvchmZtHB+qzSJrUOpkPPQgShryJ3sDSW5vLdGjeiObkMxr9xGkz2jq+TzZt236l1a1ad5NDGoN/NQqWaKVkoB+OxIRkTClkWIUVrSrsa6rcsVS8h3SMtPg2g78ukxziIigRFVqi+6eC7f/ddqOWnrhesUaGVioFsWIShvvCp2BWJwWnz+tzznl/aLiLIQCCqMmEZ4t+DQdeLLF942GvnLZ2as8ESWYxbQYhfJK6iaDR8DMsf4O91Kh2ry7cKpDu0YTLEvUbDgR+X171ORE9+vcW7fDiQ6x6+oSDhxcGjUsejUrG4oZG/lbC0fXqExNph00ucXfmmj5/9zO1+nF9JwW12iAp+T0jr6CuHw4//3x8QA8IXpWYwlaLr/C4P/sE7/ZuO+VaFqfaZZWUOkawOikbEE8l+iKTBdcu30ut1jt3C6uRCEkvatKjBHV+LEVqwtMK0RgGa3JZnWzwAe+2K75QCFLeuSLdM08wyNQ/9LnVcodRTSXz5Ysp8jbEt3zR5+xTN5VdNaJvSfATIZyR5/PnBSLwLyMU+Yh0kgFg4pjyzSCkGtP5b3fmBmqpIIYAi56lasIoOgXMGyqJzHxbqjy0GThSsuNhRAOLMokkxu5vDehCHi0vtlp5yNzn9hp5cz72flEMKQfL3ygkqemDSj+S5b7wFEZWyWupOHqyxHd8tUrd81DT/WE/ETHnMO+hf+exnyuSXc6ZO3Ho/D2fq1/YrlTzcQjV56nLyUB4hlsqUOW4srtt+azqDQvNb+7mnEAQCQ1kSkkzRE2AGP0fOVdeyK71fKPXxxMTWKX1Cg0zjFCFyC5EyO79sOowPqkUnOfRiBxIh/0MEQTG1EGHEOJ1TqfdTNu/7yAVESaixTik+ptyHVQc+1J433MlhXIPKNwdnB8qOTEYul4+f/tTtPvgHj6vfd05D44CQiKE1WsQgWXQU7ud7T4Xw20ffuLW9cXuo8QJPX/3Sbd/Nb0ewfkoIiQXUtNRoKYYkCs4s1KGFIs4PHrlN1oZWIjcE+GlbOMGngpNLsbY6OXoJZKwBugQVL779yMX3vqiD/DYpcouosdrJYfzlu0Y5K5SQkMO+sHl+OXhhIwEoFtoPKVQgD8CgEqVQXCt2DM5SVcNhVgehsvWur4TnjZRLQbYxIM9fP3Sb41vFLGyn2dmlgofEjZw0B5m7xEVarIzrEiqr0dY4LfdUgJtlrnXyTbDpAeYmPWYp1NPWGtQh1nPf0pPmsjpG1dJwmHYD2BTGWlzZqwQbQwHPSscKdrGKbII5DTLfJX+kIiTlTVo4RT5Tt4t0bI5Cr2RZbnGJ2zctIff3aXyELq/kHGwNvxQISZm6MmSRN1W5l6zsk8eZj57/1O3dz60x+hRXQlxf+OQSD1twxd86eOTWxwrfEu4PGRYyBVunq2mIUHhEg+uUi7df+CiFDAnhUrRs1K9kNYOFcrizWIbCZf4gdLDHGu6YJgefqqWyHjbieXwqg4pRcWpejigSWRocUvn4AiHWkv8QhaRCB6H3tCAlt3o0c1vz2K/bh25xLZxLed/hH+xHQyDOVILLLYeTNIssP4Ur70cX0EuFAyyZN8yBsP3y+ApwmiI1Np6TvXKJyqy9vDTqxprBTcg6Uvik1IJcdJ4mwpCp5ZRuqKuPJyKrZtyG2JFEBIC0svlREQ5JtbiQVlV+Zy7e128B9aHzm0uvwDVu5DK8fK9Vfi88/4RCLynCTBkzRFy+yK99ULqGyeqfNIaDXiZvrQlhPRV+4BQrjQQaE1ccoTwn1Zmn6K8bufQ+VpTNOU/LzfBbm8vy/3k04KnpKKkrUtUn3lQfX1rMdYoXxZYbdjz1Ned8sM23xhs3qcwHLt9gWZSCDq59aRGS/JpYiil0XkhRWCw1ORhrC5naUp/wPUzNJVOsT4v5qQgp3XzZPa/Y+QQkCVRQIoojOMI4BXAOk3qnTmgdAIVYotwFUTjmwuEjnNvQZDfmBKdinevj+9VTokRSP+2dpIF67Hl8JTgRLA4q5e2r7vqlxnItJg7hnAAKQuWIDEmXzw2+cENUlrDL6qUI480ELBaYL6VBic1O3vBSKvQUYPkcMUXsxRskQKCpchEoHA2i6QMQDVSBdlI5pl8LhFg3FKzgZmanpJqU7kkpS/l7aEPHL37udscdI+Q7Vt+IvwdKzob94AX12rrfNfVQKQPyBQPO+ZwHWULQAUjYXJ6/UOup8LwEknY7TWmzrWrJPwU33yXMMo2/kSrY0ABvfSdlFsuxzSILL05DZXLCVMgDFIbOoNQh2nIHiKYvMA/0DArypNMriSeWcoh2ARqfEON7pDsUuUj33UYbTYd5KITCYekvtHQur3aBlaVhm66coBdhuyOeJWMymkkZ8vrrhB/4JqOpV9b8OCT6Yo6r3Dv/m+tFGcG1GiF1ub1xef59Nin56ZeChbKiMXQtnKw0L1NMbhanuEvPd7Q8t4BytDHr6h56XgIJBgeQHjprr+2bEx1uBcUJAl9EyAiEP8O5WI7HHd1CZPG+VqGFWwBA4kBHXtVrDo2ZQmBsLbFwBb9spnX4pVu/9SN1qOodiel2IRb40DNc+fO5wtXvV6cl8RQSN9w6SymwSVOw/JaC2CeVDgiJxZSyrZs8wppx8wGFXyyOo9RRdYqvo0qdbzoFbAJu3Q3jPX4hsZXKyJTmoo44Q7sHniOYrEdpjtfVcVRaCssU6wg1EtCkRShX3+j32hkPvlnzCRJwFd+j/cZXPvIKeCuw8dy060hFniXQ60ZjaQ910g3aHFxkEezAAJ5DOPXXyW2HxANiQ2Dz/Jbl28U9s7SZFLfFxBWcNZxfQcEcFw3auqWTlveT3KtcU4F1aYFKvH99eZQre+G5y/nob7Vxv6BEwAdlR9Q/hov9Rrd9kMnMIAHaIi+tQMZzQAQObab0Rx1OqqPD5LipY9T8eXlnlBzr4vB3bkPcYBpL+nmz2TUKRFcuBZM5AlAfnBmtdL+urEX/wvW9z81wlmfPcYKLum9z3yBWEaLJba5jkHuZ9lO6sOUsD9drIjZ0KY3aUurkW99jslDqHfSYEo3GqgG8Z0HFBaU2v7g5dcc2AIcjOnQXIhdTMYfRbxpXZgtREzOnpUGCguzm7HwJbzGHMBTng5GBT4gI/D0py9telFasrJTZ6EdmsX84RTjouPvR39QiuLoxp5CSzwOAAw84ag2i6SASH7GmABYLkUsScCtgwXuJERFz4yIbjXxv3tCHE+L/AXQkLPnELh4FAAAAAElFTkSuQmCC)',
    backgroundRepeat: 'repeat'
  }
}

export const CIRCLE_BUTTON = {
  color: `${DIMMED_BLACK_COLOR} !important`,
  background: 'transparent',
  transition: 'all 0.2s',
  '& i': {
    margin: '0 !important'
  },
  [TABLET_MEDIA_QUERY]: {
    borderRadius: '50%',
    '&:hover': {
      backgroundColor: `${GRAY_COLOR} !important`
    }
  }
}

// Easings
export const EASE_OUT_CIRC = 'cubic-bezier(0.075, 0.82, 0.165, 1)'
export const EASE_OUT_EXPO = 'cubic-bezier(0.075, 0.82, 0.165, 1)'
// https://material.io/guidelines/motion/movement.html#movement-movement-in-out-of-screen-bounds
export const EASE_STANDARD = 'cubic-bezier(0.4, 0.0, 0.2, 1);'
export const EASE_DECELERATION = 'cubic-bezier(0.0, 0.0, 0.2, 1);'
export const EASE_ACCELERATION = 'cubic-bezier(0.4, 0.0, 1, 1);'
export const EASE_SHARP = 'cubic-bezier(0.4, 0.0, 0.6, 1);'
