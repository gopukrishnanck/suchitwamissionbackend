module.exports = (app, methods) => {

    const user = methods.loadController('authenticate');
    user.methods.post('authenticate', user.authenticate, { auth: false });

}
