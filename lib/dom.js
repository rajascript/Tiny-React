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

  return {
    createElement,
  };
})();
