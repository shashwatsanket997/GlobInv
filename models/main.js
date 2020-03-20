const ValidationError = require("../utils/Errors").ValidationError;
const NotFoundError = require("../utils/Errors").NotFoundError;
const GenericResponse = require("../utils/Responses").GenericResponse;
const GenericResponseWithLinks = require("../utils/Responses")
  .GenericResponseWithLinks;
const _ = require("lodash");
const uuid = require("../utils/util").uuidGenerator;
const jsonpatch = require("fast-json-patch");

// Model Class which is Generic Class with functionality
// as PUT, POST, PATCH, PAGINATION
// Specific model can inherit this Generic class
// And also overide this functionality

// Utility Function

class Model {
  constructor(schema, id, initData, endpoint, name) {
    this.store = initData;
    this.schema = schema;
    this.Id = id;
    this.href = endpoint;
    this.name = name;
  }

  async validateParams(data, strict = false, excemt = []) {
    let keys = Object.keys(this.schema);
    let paramkeys = Object.keys(data);
    // if paramKeys not in keys: then throw error
    let validationError = [];
    for (let i = 0; i < paramkeys.length; i++) {
      if (!keys.includes(paramkeys[i])) {
        validationError.push(
          `${paramkeys[i]} is not a valid key in ${this.name}`
        );
      } else {
        //key is present: check its type
        let valueType = Array.isArray(paramkeys[i])
          ? "array"
          : this.schema[paramkeys[i]].type;
        if (valueType !== this.schema[paramkeys[i]].type) {
          validationError.push(
            `${paramkeys[i]} must be of type ${this.schema[paramkeys[i]].type}`
          );
        }
      }
    }
    // Check required Keys: if strict true
    if (strict) {
      for (let i = 0; i < keys.length; i++) {
        if (
          keys[i].required &&
          !excemt.includes(keys[i]) &&
          !paramkeys.includes(keys[i])
        ) {
          validationError.push(`${keys[i]} is requred key for ${this.name}`);
        }
      }
    }

    // Validation done
    if (validationError.length) {
      console.log(validationError);
      throw new ValidationError("Validation Error", validationError); //rejected promise will be returned
    }
  }

  isExist(id) {
    let key = this.Id;
    let check = _.filter(this.store, function(ob) {
      return ob[key] === id;
    });
    if (check.length) {
      return true;
    } else {
      return false;
    }
  }

  // To filter the store
  filterStore(filter) {
    return new Promise(async (resolve, reject) => {
      //Check if the filter parameters are present
      try {
        await this.validateParams(filter); //If error: it will throw
        resolve(_.filter(this.store, filter));
      } catch (err) {
        reject(err);
      }
    });
  }

  create(data) {
    //Check: Complete
    //If id is not required in the schema: then automatic uuid generation
    return new Promise(async (resolve, reject) => {
      if (!this.schema[this.Id].required) {
        //create an uuid for the data
        data[this.Id] = uuid();
      }
      try {
        await this.validateParams(data, true);
        this.store.push(data);
        let links = this.href + "/" + data[this.Id];
        resolve(
          new GenericResponseWithLinks(
            "success",
            `${this.name} created successfully`,
            links
          )
        );
      } catch (err) {
        reject(err);
      }
    });
  }
  //To delete the data
  delete(id) {
    // Check: Complete
    return new Promise((resolve, reject) => {
      let key = this.Id;
      let removedEle = _.remove(this.store, function(obj) {
        return obj[key] === id;
      });
      if (removedEle.length) {
        resolve(
          new GenericResponse(
            "success",
            `Successfully deleted the ${this.name}`
          )
        );
      } else {
        reject(new NotFoundError());
      }
    });
  }

  getById(id) {
    //Check : Complete
    return new Promise((resolve, reject) => {
      let key = this.Id;
      let obj = _.find(this.store, o => {
        return o[key] === id;
      });
      if (obj) {
        resolve(obj);
      } else {
        reject(new NotFoundError());
      }
    });
  }

  put(id, data) {
    // Check : Done
    // replace the resource except id
    return new Promise(async (resolve, reject) => {
      //Fiding the object with id
      let key = this.Id;
      let index = _.findIndex(this.store, o => {
        return o[key] === id;
      });
      if (index > -1) {
        // validating the data
        try {
          // Validate everything except Id of model
          await this.validateParams(data, true, [this.Id]);
          // preserve Exsisting Id
          let objId = this.store[index][this.Id];
          this.store.splice(index, 1, data); //replace the resource
          this.store[index][this.Id] = objId; // store it back
          let links = this.href + "/" + this.store[index][this.Id];
          resolve(
            new GenericResponseWithLinks(
              "success",
              `${this.name} updated successfully`,
              links
            )
          );
        } catch (err) {
          // validation error
          console.log(err);
          reject(err);
        }
      } else {
        reject(new NotFoundError());
      }
    });
  }

  patch(id, ops) {
    //Check Done
    return new Promise((resolve, reject) => {
      //Fiding the object with id
      let key = this.Id;
      let index = _.findIndex(this.store, o => {
        return o[key] === id;
      });
      if (index > -1) {
        //Perform patch
        let document = this.store[index];
        //preserve id
        let docId = document[this.Id];
        try {
          jsonpatch.applyPatch(this.store[index], ops);
          // this.store[index] = newObj;
          this.store[index][this.Id] = docId; // restore the id
          let links = this.href + "/" + this.store[index][this.Id];
          resolve(
            new GenericResponseWithLinks(
              "success",
              `${this.name} updated successfully`,
              links
            )
          );
        } catch (err) {
          console.log(err);
          reject(
            new ValidationError("Validation Error", [
              "Invalid Path or Operation"
            ])
          );
        }
      } else {
        reject(new NotFoundError());
      }
    });
  }

  getWithPagination(page = 1, limit = 20) {
    return new Promise((resolve, reject) => {
      let pages = Math.ceil(this.store.length / limit); //Total pages
      let firstIndex = (page - 1) * limit;
      let endIndex = firstIndex + limit;
      let docs = this.store.slice(firstIndex, endIndex);
      resolve({
        docs,
        page,
        pages
      });
    });
  }
}

module.exports.Model = Model;
