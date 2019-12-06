import Cookies from 'js-cookie'

const TokenKey = 'Admin-Token'

// 超管ID，在权限排除时使用
export const superAdminId = '6'

// 学部对应年级值上限
export const gradeConfig = {
  1: 6,
  2: 9,
  3: 12
}

export const KEY =
  'MIICdwIBADANBgkqhkiG9w0BAQEFAASCAmEwggJdAgEAAoGBAImJd0t2mwIVjWiMP9hLaauy+rlDsaW7ySQCt6q9VqRtdncGwkAAK9YqJUROHlPzdUdI5hwdDX2khptvHptieT2j/uhLy4J2X5Qa9L0AgY9P0W2sjQPwmaLkr7okTdpC42hK6J9t8kHAkwX0OEUxrpwMmBPRDhOmfPjZIgOIvBL7AgMBAAECgYBECG2sNHUkqMiUKJwEP/l7Z0NClUuwsZ0jZPy5RoMvPr5UzlEUG4GTpLFegk3aNRmUM2kwCub7eYDkLikzr5hMvS0YO70Jv93DdPzpx3tmz/g1PbHvmLcbMPktpFQeJZuIW+kMo0ROe9S2iucbH2ANSg8DUfQYOMXGdcZcFYLBYQJBAMt7wDAtNhIz7rrYfXqzVU4bUhkw3ZwlzpsP1SNsGFOIQx2BGdmMDAhpgRfPejZ9YdrgOXJkEL3IK2okmjCHGLMCQQCtCJot3aalJkwagS35Buxy5Y7m5jlLAJVZXjQmSIHw7BGEw5QzwAvdcQ+862QIu+gQ7ZaLRSbFB0BqSu2WEHCZAkBZmNbqH640W6udmB/APGCucLc4olyiGb+cZV9LJpibh19OCX+RW+ocdiBClLfScGj7EEobRVZdylrbdNxzy7ijAkEAoY3Hjg1F2yofoht8Veb9+uSUAMdxNLLNvovy+s916wAt9xw4Ef071rwKKqRIWNNAgBWkGlItOYZkwRlGLHca+QJBAKRxydI227rA5iHXsIJWzY5FTLFJ65w6zwuQ6cQu41/RNxpKYUH3Yztvk6rdV9ejZF8D1B2VbS9HW/NHRTrB2q8='

export function getToken() {
  return Cookies.get(TokenKey)
}

export function setToken(token) {
  return Cookies.set(TokenKey, token)
}

export function removeToken() {
  return Cookies.remove(TokenKey)
}
