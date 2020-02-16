export default function (context) {
  console.log('*** [MIDDLEWARE] Just Auth***', context.store.getters.isAuthenticated)
  if (!context.store.getters.isAuthenticated) {
    context.redirect('/login')
  }
}
