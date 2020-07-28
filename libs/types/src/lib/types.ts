export enum ProcessStatus {
  DONE = 'done',
  ONGOING = 'on going',
  FAILED = 'failed',
}

export enum IPCMessage {
  SELECT_PATH_REQ = 'select_path_req',
  SELECT_PATH_RES = 'select_path_res',
  STORE_DATA_REQ = 'store_data_req',
  STORE_DATA_RES = 'store_data_res',
  GET_APP_DATA_REQ = 'get_app_data_req',
  GET_APP_DATA_RES = 'get_app_data_res',
  SYNC_CODE_REQ = 'sync_code_req',
  SYNC_CODE_FROM_MAIN_REQ = 'sync_code_from_main_req',
  SYNC_CODE_RES = 'sync_code_res',
  AUTO_COMMIT_REQ = 'autoCommitReq',
  PREPARE_DIFF_REQ = 'prepare_diff_req',
  PREPARE_DIFF_RES = 'prepare_diff_res',
  PREPARE_COMMIT_MSG_REQ = 'prepare_commit_msg_req',
  PREPARE_COMMIT_MSG_RES = 'prepare_commit_msg_res',
  STOP_AUTO_COMMIT = 'stopAutoCommit',
  AUTO_COMMIT_HEARTBEAT = 'autoCommitHeartbeat',
  REPLY_STOP_AUTO_COMMIT = 'stopAutoCommit',
  REPLY_AUTO_COMMIT_REQ = 'autoCommitReq-reply',
}

export enum ProcessCollection {
  CHECK_SVN_STATUS = 'check SVN status for target component',
  FORM_COMMIT_MESSAGE = 'form commit message',
  DOWNLOAD_DIFF = 'download diff from review board',
  COMMIT_CODE_BY_SVN_COMMANDS = 'commit code by SVN commands',
}

export interface ProcessExecInfo {
  name: string;
  status: ProcessStatus;
  errorMsg?: string;
  additionalData?: any;
}

export interface IPCResponse {
  isSuccessed?: boolean;
  seed?: number;
  data?: any;
  error?: {
    name: string;
    message: string;
  };
}

export enum StoreAction {
  COVER = 'cover',
  ADD_ITEM = 'add_item',
  EDIT_ITEM = 'edit_item',
  DELETE_ITEM = 'delete_item',
}

export interface IPCRequest<T> {
  seed?: number;
  data?: T;
}

export interface SSHData {
  host: string;
  username: string;
  password: string;
}

export interface APPData {
  ssh: SSHData;
  branches: BranchInfo[];
  lastAutoCommitInfo?: AutoCommitInfo;
}

export interface AutoCommitInfo {
  reviewBoardID?: number;
  prontoTitle?: string;
  description?: string;
  branch?: BranchInfo;
  specificDiff?: string;
  component?: { name: string };
  diffPath?: string;
}

export interface BranchInfo {
  name: string;
  pcDir: string;
  serverDir: string;
}

export interface DiffInfo {
  path: string;
  changedAmount: number;
}

export interface IPCError extends Error {
  res?: IPCResponse;
}
