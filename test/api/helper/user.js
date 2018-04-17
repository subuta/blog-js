export const createPayload = (sub) => ({
  sub,
  iss: 'https://xxx.com/',
  aud: ['https://xxx.com/api', 'https://xxx.auth0.com/userinfo'],
  scope: 'openid profile email'
})

export const currentUser = createPayload('a699f07d-803c-4ede-8625-156c632fa035')
