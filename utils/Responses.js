// Contains all the Generic Responses used in the system

class GenericResponse {
  constructor(status, message) {
    this.message = message;
    this.status = status;
    this.statusCode = 200;
  }
  prepareResponse() {
    return {
      status: this.status,
      message: this.message
    };
  }
}

class GenericResponseWithLinks extends GenericResponse {
  constructor(status, message, href) {
    super(status, message);
    this.statusCode = 201;
    this.href = href;
  }

  prepareResponse() {
    let res = super.prepareResponse();
    res["href"] = this.href;
    return res;
  }
}

module.exports.GenericResponse = GenericResponse;
module.exports.GenericResponseWithLinks = GenericResponseWithLinks;
