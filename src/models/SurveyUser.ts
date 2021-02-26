import { Column, CreateDateColumn, Entity, PrimaryColumn } from "typeorm";
import { v4 as uuid } from "uuid";

@Entity("survey_user")
export default class SurveyUser {

    @PrimaryColumn()
    readonly id: String;

    @Column()
    user_id: String;

    @Column()
    survey_id: String;

    @Column()
    value: number;

    @CreateDateColumn()
    created_at: Date;

    constructor() {
        if (!this.id) {
            this.id = uuid();
        }
    }
}