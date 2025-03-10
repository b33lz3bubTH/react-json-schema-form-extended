import { combineReducers } from "redux";
import authReducer from "./auth.slice";
import sellerCreationReducer from "./seller/createSeller.slice";
import sellerListingSlice from "./seller/listSeller.slice";
import productCreationSlice from "./product/createProduct.slice";
import productListingSlice from "./product/listProduct.slice";
import createBlogSlice from "./blog/createBlog.slice";
import listBlogSlice from "./blog/listBlog.slice";
import contactListSlice from "./contacts/listContact.slice";

const rootReducer = combineReducers({
  sellerCreation: sellerCreationReducer,
  sellerListing: sellerListingSlice,
  productCreation: productCreationSlice,
  productListing: productListingSlice,
  auth: authReducer,
  blogCreation: createBlogSlice,
  blogListing: listBlogSlice,
  contactUs: contactListSlice,
});

export default rootReducer;
