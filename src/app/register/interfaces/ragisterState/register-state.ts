import {User} from "../../../core/interfaces";
import {HttpParams} from "@angular/common/http";

export interface RegisterState {
  isLoading: boolean;
  user: User;
  error: string | null;
  params: HttpParams
}
