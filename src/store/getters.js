const getters = {
  sidebar: state => state.app.sidebar,
  device: state => state.app.device,
  token: state => state.user.token,
  name: state => state.user.name,
  phonenumber: state => state.user.phonenumber,
  roles: state => state.user.roles,
  ids: state => state.user.id
}
export default getters
