const express = require("express");

/** Sends to client information about the error that occured
 *  within the server.
 * 
 * @param {object} error - Node.js Error Object
 * @param {object} response - HTTP response object to send to client
 * @returns {undefined} - No return value
 */
exports.sendError = function(error, response) {
    console.error(error);

    response.status(500);
    response.send({
      error: true,
      errorMessage: error.message,
      message: "Please check back-end console for more information."
    });

    return;
}