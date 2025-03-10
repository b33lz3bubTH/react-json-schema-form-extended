
export const config = {
  PORT: 9999,
  MONGO_URL: "",
  logDirectory: "app_logs",
  aws_bucket: {
    bucket: "",
    basePath: "default", // Specify the base path where you want to store media
    accessKeyId: "",
    secretAccessKey: "",
    region: "",
  },
  upload_strategy: "local",
  local_media_path: "medias",
  pinecone_api_key: "",
  openai_api_key:
    "",
  assets_endpoint: "http://localhost:9999",
};
