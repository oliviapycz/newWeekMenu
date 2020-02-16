export default function (context) {
  console.log('*** [MIDDLEWARE] Check Auth***')
  context.store.dispatch('initAuth', context.req)
}
