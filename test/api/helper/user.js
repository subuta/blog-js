export const createPayload = (sub) => ({
  sub,
  iss: 'https://xxx.com/',
  aud: ['https://xxx.com/api', 'https://xxx.auth0.com/userinfo'],
  scope: 'openid profile email'
})

export const currentUser = createPayload('e57308da-b81c-4e24-af84-6b963ccb8375')
