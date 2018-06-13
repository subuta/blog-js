import React from 'react'
import _ from 'lodash'

import auth0 from 'src/views/utils/auth0'
import storage from 'src/views/utils/storage'

import Head from 'next/head'

import ActiveLink from 'src/views/components/common/ActiveLink'
import MaterialButton from 'src/views/components/common/MaterialButton'
import CustomLoader from 'src/views/components/common/CustomLoader'
import withStyles from 'src/views/components/layout/otherStyle'

// English agreement texts
import CookieEn from './_cookie_en'
import PrivacyPolicyEn from './_pp_en'
import TermOfUseEn from './_tos_en'

// Japanese agreement texts
import CookieJa from './_cookie_ja'
import PrivacyPolicyJa from './_pp_ja'
import TermOfUseJa from './_tos_ja'

import {
  compose,
  withHandlers,
  withProps
} from 'recompose'

import { withRouter } from 'next/router'

const enhance = compose(
  withStyles,
  withRouter,
  withHandlers({
    onOk: ({router}) => () => {
      window.analytics.track('Agree with agreement')
      storage.setItem('auth.is-agreed', true)
      router.push('/auth/login')
    },

    onCancel: ({router}) => () => {
      window.analytics.track('Disagree with agreement')
      router.push('/')
    }
  }),
  withProps(({url}) => {
    const {query} = url
    return {
      lang: query.lang || 'en'
    }
  })
)

const Texts = ({lang}) => {
  let Component = (
    <div>
      <TermOfUseEn />
      <PrivacyPolicyEn />
      <CookieEn />
    </div>
  )

  if (lang === 'ja') {
    Component = (
      <div>
        <TermOfUseJa />
        <PrivacyPolicyJa />
        <CookieJa />
      </div>
    )
  }

  return Component
}

const Agreement = enhance((props) => {
  const {
    styles,
    lang,
    router,
    onOk,
    onCancel
  } = props

  let title = 'Term of use &<br/> Privacy Policy &<br/> Cookie Acceptance ;)'
  let okText = 'Agree (and Continue to login)'
  let cancelText = 'Disagree (and Back to app)'

  if (lang === 'ja') {
    title = '利用規約 &<br/> プライバシーポリシー &<br/> Cookieの利用許諾 ;)'
    okText = '同意する (ログインする)'
    cancelText = '許可しない (appへ戻る)'
  }

  const pageTitle = 'Agreement | sub-labo'

  return (
    <div className={styles.Container}>
      <Head>
        <title>{pageTitle}</title>
      </Head>

      <div className={styles.NestedContainer}>
        <div className={styles.FakeSidebar}>
          <h4 dangerouslySetInnerHTML={{__html: title}} />

          <ActiveLink
            onClick={() => window.analytics.track('Switch agreement lang', { lang })}
            isActive={() => lang === 'en'}
            href='/auth/agreement?lang=en'
            as='/auth/agreement?lang=en'
          >
            English
          </ActiveLink><br/>

          or<br/>

          <ActiveLink
            onClick={() => window.analytics.track('Switch agreement lang', { lang })}
            isActive={() => lang === 'ja'}
            href='/auth/agreement?lang=ja'
            as='/auth/agreement?lang=ja'
          >
            日本語(Japanese)
          </ActiveLink>
        </div>

        <div className={styles.Content}>
          <div>
            <Texts lang={lang}/>
          </div>
        </div>
      </div>

      <div className={styles.Actions}>
        <MaterialButton
          wavesClasses={['waves-float']}
          onClick={onCancel}
          ghost
          secondary
        >
          {cancelText}
        </MaterialButton>

        <MaterialButton
          wavesClasses={['waves-float', 'waves-light']}
          className="is-success"
          onClick={onOk}
        >
          {okText}
        </MaterialButton>
      </div>
    </div>
  )
})

export default Agreement
