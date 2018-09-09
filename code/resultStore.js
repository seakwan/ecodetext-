class ResultStore {
    static add(val) {
        ResultStore.result = val;
    }

    static get() {
        return ResultStore.result;
    }
}

ResultStore.result = '';

exports.ResultStore = ResultStore;