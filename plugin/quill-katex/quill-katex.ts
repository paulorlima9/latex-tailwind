import Quill from 'quill';
import katex from 'katex';

// Definição de tipos para os Blots
interface BlotStatic {
  blotName: string;
  tagName: string;
  className?: string;
  create(value: any): HTMLElement;
  value(node: HTMLElement): any;
}

// Blot para renderizar fórmulas matemáticas
class KatexBlot extends (Quill.import('blots/block') as any) {
  static create(value: string) {
    const node = super.create();
    node.setAttribute('data-formula', value);
    
    // Renderiza a fórmula matemática usando KaTeX
    const formulaContainer = document.createElement('div');
    katex.render(value, formulaContainer, {
      throwOnError: false,
      displayMode: true
    });
    
    node.appendChild(formulaContainer);
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-formula');
  }
}

(KatexBlot as unknown as BlotStatic).blotName = 'katex';
(KatexBlot as unknown as BlotStatic).tagName = 'div';
(KatexBlot as unknown as BlotStatic).className = 'ql-katex';

// Inline blot para fórmulas inline
class KatexInlineBlot extends (Quill.import('blots/inline') as any) {
  static create(value: string) {
    const node = super.create();
    node.setAttribute('data-formula', value);
    
    // Renderiza a fórmula matemática inline usando KaTeX
    katex.render(value, node, {
      throwOnError: false,
      displayMode: false
    });
    
    return node;
  }

  static value(node: HTMLElement) {
    return node.getAttribute('data-formula');
  }
}

(KatexInlineBlot as unknown as BlotStatic).blotName = 'katex-inline';
(KatexInlineBlot as unknown as BlotStatic).tagName = 'span';
(KatexInlineBlot as unknown as BlotStatic).className = 'ql-katex-inline';

// Módulo para adicionar botões e funcionalidades ao editor
class KatexModule {
  private quill: any;
  private options: any;

  constructor(quill: any, options: any) {
    this.quill = quill;
    this.options = options || {};
    
    // Adiciona botões à toolbar se especificado nas opções
    if (this.options.toolbar) {
      this.addToolbarButtons();
    }
  }

  addToolbarButtons() {
    const toolbar = this.quill.getModule('toolbar');
    if (toolbar) {
      toolbar.addHandler('katex', this.katexHandler.bind(this));
      toolbar.addHandler('katex-inline', this.katexInlineHandler.bind(this));
    }
  }

  katexHandler() {
    this.showFormulaInput(true);
  }

  katexInlineHandler() {
    this.showFormulaInput(false);
  }

  showFormulaInput(displayMode: boolean) {
    const value = prompt('Digite sua fórmula LaTeX:');
    if (value) {
      const range = this.quill.getSelection(true);
      if (displayMode) {
        this.quill.insertEmbed(range.index, 'katex', value, Quill.sources.USER);
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
      } else {
        this.quill.insertEmbed(range.index, 'katex-inline', value, Quill.sources.USER);
        this.quill.setSelection(range.index + 1, Quill.sources.SILENT);
      }
    }
  }
}

// Função para registrar o plugin no Quill
function registerKatex() {
  Quill.register({
    'formats/katex': KatexBlot,
    'formats/katex-inline': KatexInlineBlot,
    'modules/katex': KatexModule
  });
}

export { registerKatex, KatexBlot, KatexInlineBlot, KatexModule };
