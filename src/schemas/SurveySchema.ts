import { ObjectSchema, string } from "yup";

const SurveySchema = new ObjectSchema({
    title: string().required(),
    description: string().required()
});

export default SurveySchema;