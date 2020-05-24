// 1. createElement Stub

const TinyReact = (function () {
  function createElement(type, attributes = {}, ...children) {
    const childElements = [].concat(...children).reduce((acc, child) => {
      if (child != null && child != true && child != false) {
        if (child instanceof Object) acc.push(child);
        else acc.push(createElement("text", { textContent: child }));
      }
      return acc;
    }, []);
    return {
      type,
      props: Object.assign({ children: childElements }, attributes),
      children: childElements,
    };
  }
  function render(vDom, container, oldDom = container.firstChild) {
    if (!oldDom) {
      mountElement(vDom, container, oldDom);
    }
  }
  function mountElement(vDom, container, oldDom) {
    return mountSimpleNode(vDom, container, oldDom);
  }
  function mountSimpleNode(vDom, container, oldElement, parentComponent) {
    let newDomElement = null;
    const nextSibling = oldElement && oldElement.nextSibling;

    if (vDom.type === "text") {
      newDomElement = document.createTextNode(vDom.props.textContent);
    } else {
      newDomElement = document.createElement(vDom.type);
    }

    newDomElement._virtualElement = vDom;

    if (nextSibling) {
      container.insertBefore(newDomElement, nextSibling);
    } else {
      container.appendChild(newDomElement);
      updateDomElement(newDomElement, vDom);
    }

    vDom.children.forEach((child) => {
      mountElement(child, newDomElement);
    });
  }

  function updateDomElement(
    domElement,
    newVirtualElement,
    oldVirtualElement = {}
  ) {
    const newProps = newVirtualElement.props || {};
    const oldProps = oldVirtualElement.props || {};

    Object.keys(newProps).forEach((propName) => {
      const newProp = newProps[propName];
      const oldProp = oldProps[propName];
      if (newProp != oldProp) {
        if (propName.slice(0, 2) === "on") {
          //event handler
          const eventName = propName.toLowerCase().slice(2);
          domElement.addEventListener(eventName, newProp, false);
          if (oldProp) {
            domElement.removeEventListener(eventName, oldProp, false);
          }
        } else if (propName === "value" || propName === "checked") {
          domElement[propName] = newProp;
        } else if (propName !== "children") {
          if (propName === "className") {
            domElement["class"] = newProps[propName];
          } else {
            domElement[propName] = newProps[propName];
          }
        }
      }
    });
    Object.keys(oldProps).forEach((propName) => {
      const newProp = newProps[propName];
      const oldProp = oldProps[propName];
      if (!newProp) {
        if (propName.slice(o, 2) === "on") {
          domElement.removeEventListener(propName.slice(2), oldProp, false);
        } else if (propName !== "children") {
          Reflect.deleteProperty(domElement, propName);
        }
      }
    });
  }

  return {
    createElement,
    render,
  };
})();
