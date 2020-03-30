class RecordDefinition {
    constructor() {
        /**
         * Kind of record as referenced in database
         * @type {string}
         */
        this.type=""
        /**
         * Kind of records, user friendly version
         * @type {string}
         */
        this.humanName=""
        /**
         * icon component assigned to this record type
         * @type {string}
         */
        this.icon="";
        /**
         * Is it possible to create this kind of record?
         * @type {boolean}
         */
        this.create=false;
        /**
         *
         * @type {{edit: string}}
         */
        this.components={
            /**
             * The main edit form component
             */
            "edit":"edit-page"
        }
    }
}