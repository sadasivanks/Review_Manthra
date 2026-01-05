import { EntitySchema } from "typeorm";

export default new EntitySchema({
  name: "TbUserDetails",
  tableName: "tb_user_details",
  columns: {
    id: {
      type: Number,
      primary: true,
      generated: "identity"
    },
    name: { type: String, length: 30, nullable: true },
    email: { type: String, length: 30, unique: true, nullable: true },
    company_name: { type: String, length: 30, nullable: true },
    phone_no: { type: String, length: 30, nullable: true },
    profile_image: { type: String, length: 255, nullable: true },
    business_modal_id: { type: Number, nullable: true },
    user_type_id: { type: Number, nullable: true },
    company_phone_number: { type: String, nullable: true },
    review_link: { type: String, nullable: true }
  }
});

