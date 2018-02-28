export const createPayload = (sub) => ({
  sub,
  iss: 'https://xxx.com/',
  aud: ['https://xxx.com/api', 'https://xxx.auth0.com/userinfo'],
  scope: 'openid profile email'
})

export const currentUser = createPayload('e376dc36-3072-45e7-84b0-8109641881ca')
