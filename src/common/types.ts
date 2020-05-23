export interface TaskRes {
  isSuccessed: boolean;
  error?: {
    name: string;
    message: string;
  }
}

export interface SSHInfo {
  host: string;
  username: string;
  password: string;
}

export interface SettingInfo extends SSHInfo {
  branches: BranchInfo[];
}

export interface BranchInfo {
  name: string;
  pcDir: string;
  serverDir: string;
}
