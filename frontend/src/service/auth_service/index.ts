import {post, get} from 'api/instance'
import {CHECK, ME, REFRESH, SIGNIN, SIGNUP} from "api/endpoints";
import {AccessTokenResponse, UserMe} from "model/auth/access-token-response";
import {getAccessToken, unpack} from 'helpers';
import localStorageService from 'service/local_storage_service';
import { Credentials } from 'model/auth/credentials';
import store from 'store';
import { setDefault } from 'store/slice/authSlice';

class AuthServiceImpl {
    async refresh() {
        const response = await post<AccessTokenResponse>(REFRESH).then(unpack)
        localStorageService.set(response)

    }

    async me() {
        const userMe = await get<UserMe>(ME).then(unpack)
        return userMe;
    }

    async signin(credentials: Credentials) {
        const response = await post<AccessTokenResponse>(SIGNIN, credentials).then(unpack)
        localStorageService.set(response)
        return this.me()
    }
    async signup(credentials: Credentials) {
        const response = await post<AccessTokenResponse>(SIGNUP, credentials).then(unpack)
        localStorageService.set(response)
        return this.me()
    }
    async check() {
        try {
            await get(CHECK)
            return true
        } catch (err) {
            return false
        }
    }
    signout() {
        localStorageService.remove('accessToken')
        store.dispatch(setDefault())
    }

    async tryMe() {
        try {
            if (getAccessToken()) {
                await this.me()
            }
        } catch (err: any) {
            if (err?.response?.status !== 503) {
                localStorageService.remove('accessToken')
            }
        }
    }
}

export default new AuthServiceImpl()