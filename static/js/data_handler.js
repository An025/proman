// this object contains the functions which handle the data and its reading/writing
// feel free to extend and change to fit your needs

// (watch out: when you would like to use a property/function of an object from the
// object itself then you must use the 'this' keyword before. For example: 'this._data' below)
export let dataHandler = {
    _data: {}, // it is a "cache for all data received: boards, cards and statuses. It is not accessed from outside.
    _api_get: function (url, callback) {
        // it is not called from outside
        // loads data from API, parses it and calls the callback with it

        fetch(url, {
            method: 'GET',
            credentials: 'same-origin'
        })
        .then(response => response.json())  // parse the response as JSON
        .then(json_response => callback(json_response));  // Call the `callback` with the returned object
    },
    _api_post: function (url, data, callback) {
        // it is not called from outside
        // sends the data to the API, and calls callback function

        fetch(url, {
          method: 'POST', // or 'PUT'
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(data),
        })
        .then(response => response.json())
        .then(data => {
          console.log('Success:', data);
          callback(data)
        })
        .catch((error) => {
          console.error('Error:', error);
        });
    },
    init: function () {
    },
    getBoards: function (callback) {
        // the boards are retrieved and then the callback function is called with the boards

        // Here we use an arrow function to keep the value of 'this' on dataHandler.
        //    if we would use function(){...} here, the value of 'this' would change.
        this._api_get('/get-boards', (response) => {
            this._data['boards'] = response;
            callback(response);
        });
    },
    getBoard: function (boardId, callback) {
        // the board is retrieved and then the callback function is called with the board
    },
    getStatuses: function (boardId, callback) {
        // the statuses are retrieved and then the callback function is called with the statuses
        this._api_get(`/get-statuses/${boardId}`, (response) => {
            this._data = response;
            callback(boardId, response);
        });
    },
    getStatus: function (statusId, callback) {
        // the status is retrieved and then the callback function is called with the status
    },
    getCardsByStatusId: function (callback) {
        this._api_get("/get-cards", (response) => {
            callback(response);
        });
    },
    getCardsByBoardId: function (boardId, callback) {
        // the cards are retrieved and then the callback function is called with the cards
        this._api_get(`/get-cards/${boardId}`, (response) => {
            this._data['cards'] = response;
            callback(response);
        });
    },
    getCard: function (cardId, callback) {
        // the card is retrieved and then the callback function is called with the card
    },
    createNewBoard: function (data, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_post(`./create_new_board`, data,response => callback(response))
    },
    createNewPrivateBoard: function (data, callback) {
        // creates new board, saves it and calls the callback function with its data
        this._api_post(`./create_new_private_board`, data,response => callback(response))
    },
    createNewCard: function (cardTitle, boardId, statusId, orderId, boardStatusId, callback) {
        let data = {'title': cardTitle, 'brdid': boardId, 'status': statusId, 'orderid': orderId, 'boardStatusId': boardStatusId}
        this._api_post(`./create_new_card`, data, response => callback(response))
        // creates new card, saves it and calls the callback function with its data
    },
    createNewStatus: function (data, callback) {
        this._api_post(`./add-new-column`, data,response => callback(response))
    },
    renameBoard: function(data ,callback) {
        this._api_post(`./rename_board`, data,response => callback(response))
    },
    renameStatus: function(data, callback){
        this._api_post(`./rename_status`, data,response => callback(response))
    },
    renameCard: function(data, callback){
        this._api_post(`./rename_card`, data,response => callback(response))
    },
    deleteData: function(data, callback) {
        this._api_post(`/delete_data`, data, response => callback(response))
    },
    deleteStatus: function(data) {
        fetch(`/delete-status/${data}`)
    },
};
