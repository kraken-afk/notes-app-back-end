class Router {
  constructor() {
    this._route = [];
  }

  get getRoute() {
    return this._route;
  }
  
  setRoute({path, method, handler, ...option}) {

    this._route.push(
      {
        path,
        method,
        handler,
        ...option
      }
    );
  }
}

const router = new Router;
module.exports = { router };