export const createPayload = (sub) => ({
  sub,
  iss: 'https://xxx.com/',
  aud: ['https://xxx.com/api', 'https://xxx.auth0.com/userinfo'],
  scope: 'openid profile email'
})

export const currentUser = createPayload('ecc04041-8e1d-4a05-8078-eea261323182')
