import {User} from "../../../core/interfaces";

export interface Register extends User {
  confirm_password?: string;
}
