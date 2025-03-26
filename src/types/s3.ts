
export interface S3Config {
  endpoint: string;
  accessKeyId: string;
  secretAccessKey: string;
  region: string;
  signatureVersion: string;
  sslEnabled: boolean;
}

export interface UploadParams {
  Bucket: string;
  Key: string;
  Body: string | Buffer;
}

export interface S3Response {
  ETag?: string;
  VersionId?: string;
  Location?: string;
  [key: string]: any;
}
export interface UploadResult {
  url: string;
  key: string;
}

export interface S3Error extends Error {
  code?: string;
  statusCode?: number;
  retryable?: boolean;
}

export interface ListParams {
  Bucket: string;
}

export interface S3ListResponse {
  Contents?: Array<{
    Key: string;
    LastModified: Date;
    ETag: string;
    Size: number;
    StorageClass: string;
  }>;
  IsTruncated?: boolean;
  Marker?: string;
  [key: string]: any;
}

