declare module 'quill' {
  interface QuillStatic {
    import: (path: string) => any;
    register: (path: string | Record<string, any>, target?: any, overwrite?: boolean) => void;
    sources: {
      USER: string;
      SILENT: string;
    };
    new (container: string | Element, options?: any): Quill;
  }
  
  interface Quill {
    getModule(name: string): any;
    getSelection(focus?: boolean): { index: number, length: number };
    insertEmbed(index: number, type: string, value: any, source?: string): void;
    setSelection(index: number, length?: number, source?: string): void;
    on(eventName: string, handler: Function): void;
    off(eventName: string, handler?: Function): void;
    root: HTMLElement;
    clipboard: {
      dangerouslyPasteHTML: (html: string) => void;
    };
  }
  
  const Quill: QuillStatic;
  export default Quill;
}
