interface OptionsSelect {
  label: string;
  value: string | number;
}
interface ImageObject {
  url: string;
}
interface ImageDetailInterface {
  list: ImageObject[];
  setList: (list: any) => any;
}
export type {OptionsSelect, ImageObject, ImageDetailInterface};
