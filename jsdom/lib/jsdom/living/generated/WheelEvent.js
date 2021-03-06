"use strict";

const conversions = require("webidl-conversions");
const utils = require("./utils.js");

const WheelEventInit = require("./WheelEventInit.js");
const implSymbol = utils.implSymbol;
const ctorRegistrySymbol = utils.ctorRegistrySymbol;
const MouseEvent = require("./MouseEvent.js");

const interfaceName = "WheelEvent";

exports.is = value => {
  return utils.isObject(value) && utils.hasOwn(value, implSymbol) && value[implSymbol] instanceof Impl.implementation;
};
exports.isImpl = value => {
  return utils.isObject(value) && value instanceof Impl.implementation;
};
exports.convert = (globalObject, value, { context = "The provided value" } = {}) => {
  if (exports.is(value)) {
    return utils.implForWrapper(value);
  }
  throw new globalObject.TypeError(`${context} is not of type 'WheelEvent'.`);
};

function makeWrapper(globalObject, newTarget) {
  let proto;
  if (newTarget !== undefined) {
    proto = newTarget.prototype;
  }

  if (!utils.isObject(proto)) {
    proto = globalObject[ctorRegistrySymbol]["WheelEvent"].prototype;
  }

  return Object.create(proto);
}

exports.create = (globalObject, constructorArgs, privateData) => {
  const wrapper = makeWrapper(globalObject);
  return exports.setup(wrapper, globalObject, constructorArgs, privateData);
};

exports.createImpl = (globalObject, constructorArgs, privateData) => {
  const wrapper = exports.create(globalObject, constructorArgs, privateData);
  return utils.implForWrapper(wrapper);
};

exports._internalSetup = (wrapper, globalObject) => {
  MouseEvent._internalSetup(wrapper, globalObject);
};

exports.setup = (wrapper, globalObject, constructorArgs = [], privateData = {}) => {
  privateData.wrapper = wrapper;

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: new Impl.implementation(globalObject, constructorArgs, privateData),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper;
};

exports.new = (globalObject, newTarget) => {
  const wrapper = makeWrapper(globalObject, newTarget);

  exports._internalSetup(wrapper, globalObject);
  Object.defineProperty(wrapper, implSymbol, {
    value: Object.create(Impl.implementation.prototype),
    configurable: true
  });

  wrapper[implSymbol][utils.wrapperSymbol] = wrapper;
  if (Impl.init) {
    Impl.init(wrapper[implSymbol]);
  }
  return wrapper[implSymbol];
};

const exposed = new Set(["Window"]);

exports.install = (globalObject, globalNames) => {
  if (!globalNames.some(globalName => exposed.has(globalName))) {
    return;
  }

  const ctorRegistry = utils.initCtorRegistry(globalObject);
  class WheelEvent extends globalObject.MouseEvent {
    constructor(type) {
      if (arguments.length < 1) {
        throw new globalObject.TypeError(
          `Failed to construct 'WheelEvent': 1 argument required, but only ${arguments.length} present.`
        );
      }
      const args = [];
      {
        let curArg = arguments[0];
        curArg = conversions["DOMString"](curArg, {
          context: "Failed to construct 'WheelEvent': parameter 1",
          globals: globalObject
        });
        args.push(curArg);
      }
      {
        let curArg = arguments[1];
        curArg = WheelEventInit.convert(globalObject, curArg, {
          context: "Failed to construct 'WheelEvent': parameter 2"
        });
        args.push(curArg);
      }
      return exports.setup(Object.create(new.target.prototype), globalObject, args);
    }

    get deltaX() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get deltaX' called on an object that is not a valid instance of WheelEvent."
        );
      }

      return esValue[implSymbol]["deltaX"];
    }

    get deltaY() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get deltaY' called on an object that is not a valid instance of WheelEvent."
        );
      }

      return esValue[implSymbol]["deltaY"];
    }

    get deltaZ() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get deltaZ' called on an object that is not a valid instance of WheelEvent."
        );
      }

      return esValue[implSymbol]["deltaZ"];
    }

    get deltaMode() {
      const esValue = this !== null && this !== undefined ? this : globalObject;

      if (!exports.is(esValue)) {
        throw new globalObject.TypeError(
          "'get deltaMode' called on an object that is not a valid instance of WheelEvent."
        );
      }

      return esValue[implSymbol]["deltaMode"];
    }
  }
  Object.defineProperties(WheelEvent.prototype, {
    deltaX: { enumerable: true },
    deltaY: { enumerable: true },
    deltaZ: { enumerable: true },
    deltaMode: { enumerable: true },
    [Symbol.toStringTag]: { value: "WheelEvent", configurable: true },
    DOM_DELTA_PIXEL: { value: 0x00, enumerable: true },
    DOM_DELTA_LINE: { value: 0x01, enumerable: true },
    DOM_DELTA_PAGE: { value: 0x02, enumerable: true }
  });
  Object.defineProperties(WheelEvent, {
    DOM_DELTA_PIXEL: { value: 0x00, enumerable: true },
    DOM_DELTA_LINE: { value: 0x01, enumerable: true },
    DOM_DELTA_PAGE: { value: 0x02, enumerable: true }
  });
  ctorRegistry[interfaceName] = WheelEvent;

  Object.defineProperty(globalObject, interfaceName, {
    configurable: true,
    writable: true,
    value: WheelEvent
  });
};

const Impl = require("../events/WheelEvent-impl.js");
