module.exports = (app, methods) => {

    const user = methods.loadController('register');
    user.methods.post('register', user.register, { auth: false });
    
  }

  