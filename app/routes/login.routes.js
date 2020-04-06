module.exports = (app, methods) => {

  const user = methods.loadController('login');
  user.methods.get('login', user.userData, { auth: true });

}
