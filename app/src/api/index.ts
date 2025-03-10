const baseUrl = `http://localhost:9999`;
export type queryParams = Record<string, any>;

function generateUrl(baseUrl: string, queryParams?: queryParams): string {
  if (!queryParams) {
    return baseUrl;
  }
  const queryString = Object.keys(queryParams)
    .map((key) => `${key}=${queryParams[key]}`)
    .join("&");
  return baseUrl + (queryString ? `?${queryString}` : "");
}
export default {
  SellerCreate: (queryParams?: queryParams) =>
    generateUrl(baseUrl + `/brands`, queryParams),
  BrandsListing: (queryParams?: queryParams) =>
    generateUrl(baseUrl + `/brands/search`, queryParams),
 
  MediaUpload: (queryParams?: queryParams) =>
    generateUrl(baseUrl + `/media/upload`, queryParams),
};
