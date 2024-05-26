import donenv from 'dotenv';
import path from 'path';
donenv.config({ path: path.join(process.cwd(), '.env') });
export default {
  NODE_ENV:process.env.NODE_ENV,
  port: process.env.PORT,
  bcrypt_salt_rounds:process.env.BCRYPT_SALT_ROUNDS,
  jwt_aceess_secret:process.env.JWT_ACCESS_SECRET,
  jwt_expires_in:process.env.EXPIRES_IN,
  varification_password_link:process.env.VARIFICATION_PASSWORD_LINK,
  varification_token_srcret:process.env.VARIFICATION_PASSWORD_TOKEN,
  varification_expire_in:process.env.VARIFICATION_PASSWORD_EXPURES_IN,
  chnage_password_link:process.env.CHANGE_PASSWORD_LINK,
  jwt_refeesh_srcret:process.env.RESET_PASSWORD_TOKEN,
  refresh_token_expire_in:process.env.REFRESH_TOKEN_EXPIRES_IN,
  refresh_token:process.env.REFRESH_TOKEN,
  email_sender:{
    email:process.env.NODEMAILER_EMAIL,
    app_password:process.env.NODEMAILER_PASSWORD

  },
};