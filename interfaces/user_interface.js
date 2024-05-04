class UserInterface{
    name
    user_identifier
    password

    constructor(name, user_identifier, password) {
        this.name = name;
        this.user_identifier = user_identifier;
        this.password = password;
    }

    static from(data){
        return new UserInterface(data.name, data.user_identifier, data.password);
    }

    json(){
        return {
            name: this.name,
            user_identifier: this.user_identifier,
            password: this.password
        }
    }
}

export default UserInterface