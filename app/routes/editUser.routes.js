module.exports = (app, methods) => {

    const user = methods.loadController('editUser');
    user.methods.get('/', user.readeach, { auth: true });
    // user.methods.get(':id', user.readeach, { auth: true });
    // user.methods.post('/', user.create, { auth: true });
    user.methods.put('/', user.update, { auth: true });
    user.methods.put('pass', user.passwordupdate, { auth: true });
    // user.methods.delete(':id', user.delete, { auth: true });
    
  }
