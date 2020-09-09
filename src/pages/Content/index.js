import { printLine } from './modules/print';

console.log('Content script works!');
console.log('Must reload extension for modifications to take effect.');

printLine("Using the 'printLine' function from the Print Module");

const iframe = document.getElementById('cafe_main');

iframe.addEventListener('load', function () {
  const iframeDoc = iframe.contentWindow.document;
  console.log('IFrame Loaded.');

  setTimeout(() => {
    console.log('IFrame Content Loaded.');

    const port = chrome.runtime.connect({ name: 'STORAGE_API' });

    const elems = iframeDoc.getElementsByClassName('comment_box');
    for (var i = 0; i < elems.length; i++) {
      elems[i].addEventListener('click', function (e) {
        port.postMessage({
          func: 'save',
          values: { name: e.target.innerText },
        });
      });
    }

    // const script = iframeDoc.createElement('script');
    // script.type = 'text/javascript';
    // iframeDoc.head.appendChild(script);
    // script.appendChild(iframeDoc.createTextNode(`
    //   const port = chrome.runtime.connect({ name: 'STORAGE_API' });
    //   port.postMessage({
    //     func: 'save',
    //     values: { name: 'test' },
    //   });
    // `));

    // https://stackoverflow.com/questions/524696/how-to-create-a-style-tag-with-javascript
    const style = iframeDoc.createElement('style');
    iframeDoc.head.appendChild(style);
    style.appendChild(
      iframeDoc.createTextNode(`
      .comment_box:hover {
        border-style: inset solid;
        border-width: 3px;
        border-color: rgb(0, 0, 255, 0.1) 
      }
  `)
    );
  }, 3000);

  // iframe.contentDocument.body.innerHTML =
  //   iframe.contentDocument.body.innerHTML +
  //   `
  //   <style>
  //     .comment_box {
  //       border: 1px solid red;
  //     }
  // `;
});
