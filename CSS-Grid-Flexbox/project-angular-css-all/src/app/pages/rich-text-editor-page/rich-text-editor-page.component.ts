import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import * as ClassicEditor from '@ckeditor/ckeditor5-build-classic';

@Component({
  selector: 'app-rich-text-editor-page',
  templateUrl: './rich-text-editor-page.component.html',
  styleUrls: ['./rich-text-editor-page.component.scss'],
  encapsulation: ViewEncapsulation.None,
})
export class RichTextEditorPageComponent implements OnInit {
  public Editor = ClassicEditor;

  testOriginal =
    '<ol><li>Level_1</li><li>Level_1</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-2">Level_3</li><li class="ql-indent-3">Level_4</li></ol>';

  test =
    '<div class="zd-comment" dir="auto">Test with multi layer list:<br><ol dir="auto"><li>One</li><li>Two<ol dir="auto"><li>Two.One</li><li>Two.Two<ol dir="auto"><li>Two.Two.One</li></ol></li></ol></li><li>Three</li></ol></div>';

  content = '';
  content2 = '';
  modules = {};
  constructor() {}

  ngOnInit() {
    const test2 =
      '<ol><li>Level_1</li><li>Level_1</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-1">Level_2</li><li class="ql-indent-2">Level_3</li><li class="ql-indent-3">Level_4</li></ol>';

    this.fnHTML(test2);
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

  fnHTML(body: string) {
    const doc = new DOMParser().parseFromString(body, 'text/xml');

    const indents = doc.querySelectorAll('[class*="ql-indent-"]');

    indents.forEach(i => {
      const newOL = document.createElement('ol');

      i.parentElement.append(newOL);
    });

    console.log('doc', doc);
  }
}
