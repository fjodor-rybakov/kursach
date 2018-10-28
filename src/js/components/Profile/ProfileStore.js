import autobind from "autobind-decorator";
import {observable} from "mobx";

@autobind
class ProfileStore {
   @observable data = {};
}

export { ProfileStore }