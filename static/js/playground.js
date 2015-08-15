(function () {

    /**
     * This function is used to check if a object is empty
     *
     * @param object
     * @returns {boolean}
     */
    function isEmpty(object) {
        for (var i in object) {
            return true;
        }
        return false;
    }

})();