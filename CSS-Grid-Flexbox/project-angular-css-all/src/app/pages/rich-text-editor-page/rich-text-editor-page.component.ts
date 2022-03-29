import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-rich-text-editor-page',
  templateUrl: './rich-text-editor-page.component.html',
  styleUrls: ['./rich-text-editor-page.component.scss'],
})
export class RichTextEditorPageComponent implements OnInit {
  content = '';
  content2 = '';
  modules = {};
  constructor() {}

  ngOnInit() {
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
}
