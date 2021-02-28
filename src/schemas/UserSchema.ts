import { ObjectSchema, string } from "yup";

const UserSchema = new ObjectSchema({
    name: string().required(),
    email: string().email().required()
});

export default UserSchema;