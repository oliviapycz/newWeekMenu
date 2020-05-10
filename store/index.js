import Vuex from 'vuex'
import Cookie from 'js-cookie'
import Cookieparser from 'cookieparser'
import { emptyMenu } from '~/utils/initData'
import Menu from '~/api/menus'
import Channel from '~/api/channels'
import User from '~/api/users'

const createStore = () => {
  return new Vuex.Store({
    state: {
      token: null,
      user: null,
      channelInvitation: null,
      loadedChannels: [],
      loadedMenus: []
    },

    mutations: {
      setChannelInvitation (state, channelInvitation) {
        state.channelInvitation = channelInvitation
      },
      setChannels (state, channels) {
        state.loadedChannels = channels
      },
      setMenus (state, menus) {
        state.loadedMenus = menus
      },
      updateMenus (state, menus) {
        state.loadedMenus = menus
      },
      setUser (state, user) {
        state.user = user
      },
      setToken (state, token) {
        state.token = token
      },
      clearSession (state) {
        state.token = null
        state.user = null
        state.loadedChannels = null
      }
    },

    actions: {
      nuxtServerInit (vuexContext, context) {
        if (context.req && context.req.headers && context.req.headers.cookie) {
          // console.log(context.req)
          let fetchedChannelIds = []
          const parsedCookies = Cookieparser.parse(context.req.headers.cookie)
          return context.app.$axios.$get(process.env.BASE_URL + '/users/' + parsedCookies.userId + '.json')
            .then((data) => {
              if (!data) {
                Cookie.remove('jwt')
                Cookie.remove('userId')
                Cookie.remove('expirationDate')
              }
              fetchedChannelIds = data.channelIds
              vuexContext.commit('setUser', { ...data })
            })
            .then(() => {
              return context.app.$axios
                .$get(process.env.BASE_URL + '/channels.json')
                .then((data) => {
                  const channels = []
                  fetchedChannelIds.forEach((element) => {
                    channels.push({ ...data[element], id: element })
                  })
                  vuexContext.commit('setChannels', channels)
                })
            })
        }
      },
      initAuth (vuexContext, req) {
        let token
        let expirationDate
        let userId
        if (req) {
          if (!req.headers.cookie) {
            return
          }
          const jwtCookie = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('jwt='))
          if (!jwtCookie) {
            return
          }
          token = jwtCookie.split('=')[1]
          expirationDate = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('expirationDate='))
            .split('=')[1]
          userId = req.headers.cookie
            .split(';')
            .find(c => c.trim().startsWith('userId='))
            .split('=')[1]
          User.getUser(userId)
            .then((res) => {
              const data = res.data
              console.log('result in initauth', data)
              vuexContext.commit('setUser', { ...data })
            })
        } else if (process.client) {
          token = localStorage.getItem('token')
          expirationDate = localStorage.getItem('tokenExpiration')
          userId = localStorage.getItem('userId')
        }
        if (new Date().getTime() > +expirationDate || !token) {
          console.log('no token or invalid token')
          vuexContext.dispatch('logout')
          return
        }
        vuexContext.commit('setToken', token)
      },
      logout (vuexContext) {
        vuexContext.commit('clearSession')
        Cookie.remove('jwt')
        Cookie.remove('userId')
        Cookie.remove('expirationDate')
        if (process.client) {
          localStorage.removeItem('token')
          localStorage.removeItem('userId')
          localStorage.removeItem('tokenExpiration')
        }
      },
      async getMenu (vuexContext, param) {
        try {
          await Menu.getMenu(param)
            .then((res) => {
              vuexContext.commit('setMenus', res.data)
            })
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      addChannelId (vuexContext, param) {
        const userId = param.userId
        let newChannelIds = []
        User.getUser(userId)
          .then((res) => {
            const data = res.data
            newChannelIds = data.channelIds
            newChannelIds.push(param.channelId)
            User.updateUser(userId, {
              authId: data.authId,
              userId: data.userId,
              username: data.username,
              email: data.email,
              channelIds: newChannelIds
            })
              .then((res) => {
                const user = res.data
                Channel.getChannel(param.channelId)
                  .then((res) => {
                    const channel = res.data
                    const userEmail = user.email
                    const newUsersChannel = channel.usersId
                    newUsersChannel.push(userEmail)
                    Channel.updateChannel(param.channelId, {
                      menuId: channel.menuId,
                      title: channel.title,
                      usersId: newUsersChannel
                    })
                  })
                vuexContext.commit('setUser', user)
              })
          })
      },
      joinChannelInvitation (vuexContext, channelInvitation) {
        vuexContext.commit('setChannelInvitation', channelInvitation)
      },
      async createNewChannel (vuexContext, param) {
        const userId = param.userId
        try {
          await Menu.createMenu({ ...emptyMenu })
            .then((res) => {
              Channel.createChannel({
                menuId: res.data.name,
                title: param.title,
                usersId: ['']
              })
                .then((res) => {
                  const response = res.data
                  let newChannelIds = []
                  User.getUser(userId)
                    .then((res) => {
                      const data = res.data
                      newChannelIds = data.channelIds
                      newChannelIds.push(response.name)
                      User.updateUser(userId, {
                        authId: data.authId,
                        userId: data.userId,
                        username: data.username,
                        email: data.email,
                        channelIds: newChannelIds
                      })
                        .then((res) => {
                          const user = res.data
                          Channel.getChannel(response.name)
                            .then((res) => {
                              const data = res.data
                              const userEmail = user.email
                              const newUsersChannel = []
                              newUsersChannel.push(userEmail)
                              Channel.updateChannel(response.name, {
                                menuId: data.menuId,
                                title: data.title,
                                usersId: newUsersChannel
                              })
                            })
                          vuexContext.commit('setUser', user)
                        })
                        .then(() => {
                          Channel.getAllChannels()
                            .then((res) => {
                              const data = res.data
                              const channels = []
                              console.log('this.getters.user.channelIds', this.getters.user.channelIds)
                              this.getters.user.channelIds.forEach((element) => {
                                channels.push({ ...data[element], id: element })
                              })
                              vuexContext.commit('setChannels', channels)
                            })
                        })
                    })
                })
            })
        } catch (e) {
          this.error = e.response.data.message
        }
      },
      async authenticateUser (vuexContext, authData) {
        const authUrl = process.env.GOOGLE_AUTH_URL + (authData.page === 'register' ? 'signUp?key=' : 'signInWithPassword?key=') + process.env.GOOGLE_API_KEY
        try {
          await this.$axios.$post(authUrl, {
            email: authData.email,
            password: authData.password,
            displayName: authData.displayName,
            returnSecureToken: true
          })
            .then((result) => {
              if (authData.page === 'register') {
                let fetchedChannelIds = []
                Menu.createMenu({ ...emptyMenu })
                  .then((res) => {
                    Channel.createChannel({
                      menuId: res.data.name,
                      title: 'Home',
                      usersId: ['']
                    })
                      .then((response) => {
                        const channelId = response.data.name
                        User.createUser({
                          authId: result.localId,
                          username: result.displayName,
                          email: result.email,
                          channelIds: [channelId]
                        })
                          .then((res) => {
                            const userId = res.data.name
                            User.getUser(userId)
                              .then((res) => {
                                const data = res.data
                                fetchedChannelIds = data.channelIds
                                User.updateUser(userId, {
                                  userId,
                                  authId: data.authId,
                                  username: data.username,
                                  email: data.email,
                                  channelIds: data.channelIds
                                })
                                  .then((re) => {
                                    const data = re.data
                                    const userData = {
                                      'username': data.username,
                                      'email': data.email,
                                      'userId': data.userId,
                                      'channelIds': data.channelIds,
                                      'authId': data.authId
                                    }
                                    vuexContext.commit('setUser', userData)
                                    localStorage.setItem('userId', data.userId)
                                    Cookie.set('userId', data.userId)
                                    Channel.getChannel(channelId)
                                      .then((r) => {
                                        Channel.updateChannel(channelId, {
                                          menuId: r.data.menuId,
                                          title: r.data.title,
                                          usersId: [data.email]
                                        })
                                      })
                                  })
                              })
                          })
                          .then(() => {
                            Channel.getAllChannels()
                              .then((res) => {
                                const data = res.data
                                const channels = []
                                fetchedChannelIds.forEach((element) => {
                                  channels.push({ ...data[element], id: element })
                                })
                                vuexContext.commit('setChannels', channels)
                              })
                          })
                      })
                  })
              }
              if (authData.page === 'login') {
                let userCookieId
                let user
                User.getAllUsers()
                  .then((res) => {
                    const data = res.data
                    for (const key in data) {
                      const element = data[key]
                      for (const k in element) {
                        if (element[k] === result.localId) {
                          userCookieId = Object.keys(data).find(key => data[key] === element)
                          user = element
                        }
                      }
                    }
                    vuexContext.commit('setUser', { ...user })
                    localStorage.setItem('userId', userCookieId)
                    Cookie.set('userId', userCookieId)
                  })
                  .then(() => {
                    Channel.getAllChannels()
                      .then((res) => {
                        const data = res.data
                        const channels = []
                        this.getters.user.channelIds.forEach((element) => {
                          channels.push({ ...data[element], id: element })
                        })
                        vuexContext.commit('setChannels', channels)
                      })
                  })
              }
              vuexContext.commit('setToken', result.idToken)
              localStorage.setItem('token', result.idToken)
              localStorage.setItem('tokenExpiration', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
              Cookie.set('jwt', result.idToken)
              Cookie.set('expirationDate', new Date().getTime() + Number.parseInt(result.expiresIn) * 1000)
            })
        } catch (e) {
          console.log('e', e)
          this.error = e.response.data.message
        }
      },
      async updateMenu (vuexContext, param) {
        try {
          await Menu.updateMenu(param.menuId, param.updatedMenu, param.channelId)
            .then((res) => {
              vuexContext.commit('updateMenus', res.data)
            })
        } catch (e) {
          this.error = e.response.data.message
        }
      }
    },

    getters: {
      isAuthenticated (state) {
        return state.token != null
      },
      user (state) {
        return state.user
      },
      loadedChannels (state) {
        return state.loadedChannels
      },
      loadedMenus (state) {
        return state.loadedMenus
      }
    }
  })
}

export default createStore
