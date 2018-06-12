import React from 'react'
import { findDOMNode } from 'react-dom'

import { NativeTypes } from 'react-dnd-html5-backend'
const {FILE} = NativeTypes

import _ from 'lodash'

import withStyles from './style'
import connect from './connect'

import Avatar from 'src/views/components/common/Avatar'
import Layout from 'src/views/components/layout/Layout'
import TextField from 'src/views/components/common/TextField'
import MaterialButton from 'src/views/components/common/MaterialButton'

import Paper from 'src/views/components/common/Paper'

import {
  compose,
  withState,
  lifecycle,
  withHandlers,
  withPropsOnChange
} from 'recompose'

const isBrowser = typeof window !== 'undefined'

const enhance = compose(
  withStyles,
  connect,
  withState('draftNickname', 'setDraftNickname', ({currentUser}) => _.get(currentUser, 'nickname', '')),
  withState('draftAvatar', 'setDraftAvatar', ({currentUser}) => _.get(currentUser, 'avatar', '')),
  withState('validationError', 'setValidationError', null),
  withState('isDeleteAvatar', 'setIsDeleteAvatar', false),
  withState('draftAvatarFile', 'setDraftAvatarFile', null),
  withHandlers(() => {
    let fileInputRef

    return {
      setFileInputRef: () => (ref) => {
        fileInputRef = findDOMNode(ref)
      },

      clearFileInput: () => () => {
        if (!fileInputRef) return
        fileInputRef.value = null
      }
    }
  }),
  withHandlers({
    // Upload file via Button
    onSelectFile: (props) => async (e) => {
      const {
        setDraftAvatar,
        setIsDeleteAvatar,
        setDraftAvatarFile
      } = props

      const file = _.first(e.target.files)
      if (!file) return

      setDraftAvatarFile(file)
      setIsDeleteAvatar(false)

      // Then read file for preview.
      const reader = new FileReader();

      reader.onload = function(e) {
        setDraftAvatar(e.target.result)
      }

      reader.readAsDataURL(file);
    },

    onDeleteAvatar: (props) => () => {
      const {
        isDeleteAvatar,
        setIsDeleteAvatar,
        setDraftAvatar,
        setDraftAvatarFile,
        clearFileInput
      } = props

      setIsDeleteAvatar(true)
      setDraftAvatar(null)
      setDraftAvatarFile(null)

      clearFileInput()
    },

    // Upload file via Button
    onUpdateProfile: (props) => async (e) => {
      const {
        draftNickname,
        draftAvatar,
        draftAvatarFile,
        isDeleteAvatar,
        currentUser,
        requestUpdateUser,
        signAttachment,
        uploadAttachment,
        setValidationError
      } = props

      let avatar = draftAvatar
      if (draftAvatarFile) {
        const {name, type} = draftAvatarFile

        // create attachment from file
        const {signedRequest, url} = await signAttachment({name, type})

        // then upload it to s3
        await uploadAttachment(draftAvatarFile, signedRequest, url)

        avatar = url
      }

      if (isDeleteAvatar) {
        avatar = ''
      }

      const user = _.pick({
        ...currentUser,
        avatar,
        nickname: draftNickname,
      }, [ 'locale', 'nickname', 'avatar' ])

      setValidationError(null)

      window.analytics.track('Update profile', {
        user: user.id
      })

      requestUpdateUser(user).catch(err => setValidationError(err.data))
    }
  }),
)

export default enhance((props) => {
  const {
    styles,
    setDraftAvatar,
    setDraftNickname,
    setFileInputRef,
    onSelectFile,
    onUpdateProfile,
    onDeleteAvatar,
    draftAvatar,
    draftNickname,
    validationError,
    currentUser
  } = props

  return (
    <Layout {...props}>
      <div className={styles.Content}>
        <Paper className={styles.Paper}>
          <h4>Update your profile</h4>

          <div className={styles.Form}>
            <div className={styles.FormItem}>
              <TextField
                label='Nickname'
                onChange={setDraftNickname}
                value={draftNickname}
                placeholder='Put your nickname'
                error={_.first(_.get(validationError, 'nickname', []))}
              />
            </div>

            <div className={styles.FormItem}>
              <span>Avatar:</span>

              <div className={styles.ImageInput}>
                <Avatar avatar={draftAvatar} nickname={draftNickname}/>

                <input type="file"
                       ref={setFileInputRef}
                       onChange={onSelectFile}
                       accept=".jpg, .jpeg, .png, .gif"
                />

                <span>or</span>

                <MaterialButton
                  className={styles.DeleteAvatarButton}
                  wavesClasses={['waves-float']}
                  onClick={onDeleteAvatar}
                >
                  Delete Avatar
                </MaterialButton>
              </div>
            </div>

            <div className={styles.FormItem}>
              <span></span>

              <MaterialButton
                className={styles.SubmitButton}
                wavesClasses={['waves-float']}
                onClick={onUpdateProfile}
              >
                Update
              </MaterialButton>
            </div>
          </div>
        </Paper>
      </div>
    </Layout>
  )
})
