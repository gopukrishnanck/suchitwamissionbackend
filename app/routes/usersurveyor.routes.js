
module.exports = (app, methods) => {

    const user = methods.loadController('usersurveyor');
    user.methods.get('/', user.read, { auth: true });
    user.methods.get(':id', user.readeach, { auth: true });
    user.methods.post('/', user.create, { auth: true });
    user.methods.put(':id', user.update, { auth: true });
    user.methods.delete(':id', user.delete, { auth: true });
    user.methods.put('pass/:id', user.passwordupdate, { auth: true });
  }