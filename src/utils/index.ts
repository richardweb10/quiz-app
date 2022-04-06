import { save, get } from './SesionStorage';

export const handlerIsLogin = (data: any) => {
    save('@token', data.token);
    save('@id_user', data.user._id);
    save('@name_user', data.user.name);
    save('@email_user', data.user.email);
    window.location.href = "/";

}