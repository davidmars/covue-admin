export default class UserApi {
    constructor(api) {
        this.api=api;
    }

    /**
     * Essaye de logger l'utilisateur
     * @param {String} email
     * @param {String} pwd Mot de passe en clair
     * @param {function} cbSuccess renvoie le JSON de l'utilisateur connecté
     * @param {function} cbError renvoie les erreurs rencontrées
     */
    login(email,pwd,cbSuccess,cbError){
        console.log("login",email,pwd,cbSuccess,cbError)
    }
    /**
     * Essaye de délogger l'utilisateur
     * @param {function} cbSuccess si l'utilisateur est bien déconnecté
     * @param {function} cbError renvoie les erreurs rencontrées
     */
    logout(cbSuccess,cbError){
        console.log("logout",cbSuccess,cbError);
    }
}