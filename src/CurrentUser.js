

export default class CurrentUser {
    constructor(email,name) {
        /**
         * Email de l'utilisateur courrant
         */
        this.email=email;
        /**
         * Name (prénom nom) de l'utilisateu courrant
         */
        this.name=name;
        /**
         * Image de l'utilisateur
         * @type {string}
         */
        this.thumbnail=`https://picsum.photos/seed/${this.email}/300/300?random`;
        //this.thumbnail=null;
    }

}