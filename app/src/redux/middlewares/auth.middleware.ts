import { AxiosRequestConfig } from "axios";
import { RootState } from "../store"; // Assuming you have a store configured

const apiMiddleware = (store: any) => (next: any) => (action: any) => {
  // Check if the action specifies the 'includeApiKey' flag in its meta
  if (action.meta && action.meta.includeApiKey) {
    const state: RootState = store.getState();
    const { apiKey } = state.auth;

    if (apiKey) {
      const config: AxiosRequestConfig = {
        headers: {
          "x-api-key": apiKey,
        },
      };

      action.meta.config = config;
    }
  }

  return next(action);
};

export default apiMiddleware;
