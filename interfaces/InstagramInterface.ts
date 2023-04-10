enum InstagramMediaType {
  VIDEO = "VIDEO",
  IMAGE = "IMAGE",
  CAROUSEL_ALBUM = "CAROUSEL_ALBUM"
}

/* eslint-disable camelcase */
interface InstagramItemInterface {
  id: string,
  media_type: keyof typeof InstagramMediaType,
  media_url: string,
  permalink?: string
  thumbnail_url?: string;
  username: string,
  timestamp: string
}
/* eslint-enable camelcase */

export interface InstagramInterface {
  data: InstagramItemInterface[],
  paging: {
    cursors: {
      before?: string,
      after?: string
    },
    next?: string
    previous?: string
  }
}
