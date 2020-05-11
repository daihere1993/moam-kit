export interface SSHInfo {
  host: string;
  username: string;
  password: string;
}

export interface SettingInfo extends SSHInfo {
  pcDir: string;
  serverDir: string;
}
