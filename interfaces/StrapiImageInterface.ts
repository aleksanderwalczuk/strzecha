interface BaseImageInterface {
  name: string,
  hash: string,
  ext: string,
  mime: string,
  path?: string,
  width: number,
  height: number,
  size: number,
  url: string,

}
export default interface ImageInterface extends BaseImageInterface {
  alternativeText: string,
  caption: string,
  previewUrl?: string,
  provider: string,
  formats: Record<'thumbnail' | 'small' | 'medium' | 'large', BaseImageInterface>
};
