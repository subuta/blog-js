export const createPayload = (sub) => ({
  sub,
  iss: 'https://xxx.com/',
  aud: ['https://xxx.com/api', 'https://xxx.auth0.com/userinfo'],
  scope: 'openid profile email'
})

export const currentUser = createPayload('4be76d72-37c6-4af4-9b6d-5cf3cb62d63a')
