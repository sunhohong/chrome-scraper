import '../../assets/img/icon-34.png';
import '../../assets/img/icon-128.png';

console.log('This is the background page.');
console.log('Put the background scripts here.');

const storage = [];

chrome.runtime.onConnect.addListener(function (port) {
  console.assert(port.name === 'STORAGE_API');
  port.onMessage.addListener(function (msg) {
    if (msg.func === 'save') {
      save(msg.values);
    } else if (msg.func === 'load') {
      load(port);
    }
  });
});

const save = (values) => {
  storage.push(values);
};

const load = (port) => {
  port.postMessage({ result: 'load', values: storage });
};
