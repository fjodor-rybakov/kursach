import {observable} from "mobx";
import autobind from "autobind-decorator";

@autobind
class SignInStore {
    @observable login = "";

    @observable password = "";
}

export { SignInStore }