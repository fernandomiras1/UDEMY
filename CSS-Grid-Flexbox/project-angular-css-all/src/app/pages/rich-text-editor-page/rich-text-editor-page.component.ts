import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { groupBy, forEach } from 'lodash-es';
@Component({
  selector: 'app-rich-text-editor-page',
  templateUrl: './rich-text-editor-page.component.html',
  styleUrls: ['./rich-text-editor-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RichTextEditorPageComponent implements OnInit {
  testOriginal =
    '<ol><li>Level_1</li><li>Level_1</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-2">Level_3</li><li class="ql-indent-3">Level_4</li></ol>';

  test =
    '<div class="zd-comment" dir="auto">Test with multi layer list:<br><ol dir="auto"><li>One</li><li>Two<ol dir="auto"><li>Two.One</li><li>Two.Two<ol dir="auto"><li>Two.Two.One</li></ol></li></ol></li><li>Three</li></ol></div>';

  content = '';
  content2 = '';
  modules = {};
  constructor() {}

  ngOnInit() {
    this.fnHTML();
    this.content = this.testOriginal;
    this.modules = {
      toolbar: [
        [
          { bold: { tooltip: 'Bold (Ctrl+B)' } },
          'italic',
          'underline',
          'strike',
        ],
        // ['bold', 'italic', 'underline', 'strike'], // toggled buttons
        ['blockquote', 'code-block'],

        [{ header: 1 }, { header: 2 }], // custom button values
        [{ list: 'ordered' }, { list: 'bullet' }],
        [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
        [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
        [{ direction: 'rtl' }], // text direction

        [{ size: ['small', false, 'large', 'huge'] }], // custom dropdown
        [{ header: [1, 2, false] }],

        [{ color: [] }, { background: [] }], // dropdown with defaults from theme
        [{ font: [] }],
        [{ align: [] }],

        ['clean'], // remove formatting button

        ['link', 'image'], // link and image, video
        ,
      ],
    };
  }

  bodyContentChanged(event) {
    console.log('bodyContentChanged', event);
  }
  openAllFormatEditor() {
    console.log('openAllFormatEditor');
  }

  onClick() {
    console.log('content', this.content);
    console.log('content2', this.content2);
  }

  fnHTML() {
    const body =
      '<ol><li>Level_1</li><li>Level_1</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-2">Level_3</li><li class="ql-indent-3">Level_4</li></ol>';

    const doc = new DOMParser().parseFromString(body, 'text/xml');

    console.log('antes doc', new DOMParser().parseFromString(body, 'text/xml'));
    const indents = doc.querySelectorAll('[class*="ql-indent-"]');
    const newOL = document.createElement('ol');

    const indentsNew = [];

    this.groupNodes(indents);

    console.log('doc', doc);

    const allOls = doc.querySelectorAll('ol');

    allOls.forEach(x => {
      if (x.textContent.length <= 1) {
        x.parentNode.removeChild(x);
      }
    });
    // const array = [];

    // indents.forEach((i, index: number) => {
    //   // i.removeAttribute('class');
    //   console.log('i.className', i.className);
    //   if (i.className == `ql-indent-${index}`) {
    //     // console.log('i.className', i.className, index);
    //     // i.removeAttribute('class');
    //     array.push(i);
    //   }
    //   // i.innerHTML = '<ol><li>' + i.innerHTML + '</li></ol>';
    //   console.log('i', array);
    //   // indentsNew.push('<ol><li>' + i.innerHTML + '</li></ol>');
    // });
    // ul.setAttribute('id','proList');

    // productList = ['Electronics Watch','House wear Items','Kids wear','Women Fashion'];

    // doc.querySelector('.ql-indent-1').appendChild(ol);
    // console.log('object', doc.querySelector('.ql-indent-1'));
    // indents.forEach(this.renderProductList);
  }

  groupNodes(listI) {
    const list: any[] = [].slice.call(listI);
    const parent = list[0].parentElement;
    const groupTest = groupBy(list, 'className');

    const forEachTest = forEach(groupTest, (arr, coin) => {
      console.log('arr', arr);
      // const parent = arr[0].parentElement;

      arr.forEach((item, index) => {
        const lastWrapper = document.createElement('ol');

        item.removeAttribute('class');
        parent.appendChild(lastWrapper);

        [].forEach.call(arr.slice(0, arr.length), function (x) {
          lastWrapper.appendChild(x);
        });
      });
      console.log('coin', coin);
    });

    // console.log('list', list);
    console.log('forEachTestforEachTest', forEachTest);

    // for (let i = 0; i < list.length; i += groupByT) {
    //   const lastWrapper = document.createElement('ol');

    //   parent.appendChild(lastWrapper);

    //   [].forEach.call(list.slice(i, i + groupByT), function (x) {
    //     lastWrapper.appendChild(x);
    //   });
    // }
  }

  renderProductList(element, index, arr) {
    // const li = document.createElement('li');
    const ol = document.createElement('ol');

    // li.setAttribute('class', 'item');
    element.parentNode.append(ol);

    // ul.appendChild(li);

    // li.innerHTML = li.innerHTML + element;
  }

  renderOL(body: string) {
    const doc = new DOMParser().parseFromString(body, 'text/xml');
    const indents = doc.querySelectorAll('[class*="ql-indent-"]');
    const a = '<ol>',
      b = '</ol>',
      m = [];

    // Right now, this loop only works with one
    // explicitly specified array (options[0] aka 'set0')
    for (let i = 0; i < indents.length; i += 1) {
      m[i] = '<li>' + indents[i] + '</li>';
    }

    // document.getElementById('foo').innerHTML = a + m + b;
    console.log(a + m + b);
  }
}
