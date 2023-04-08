import { get } from "lodash";
import { StrapiResponseInterface } from "~/interfaces/StrapiResponseInterface";

// eslint-disable-next-line import/prefer-default-export
export function mapResponseData(response: StrapiResponseInterface<any>): any {
  if (Array.isArray(response.data)) {
    return response.data.map(({ id, attributes }) => ({ id, ...attributes }));
  }
  return get(response.data, "attributes", response.data);
}
