import EmailCustomInput from "@/UI/EmailCustomInput";
import s from "./page.module.scss";

enum InputType {
  Text = "text",
  PhoneNumber = "tel",
  Email = "email",
}

export default function page() {
  return (
    <div className={s.wrapper}>
      <div className={s.contacts}>
        <div className={s.colum_wrapper}>
          <div className={s.title}>Name</div>

          <div className={s.colum}>
            <div className={s.input}>
              <EmailCustomInput type={InputType.PhoneNumber} text="First Name" />
            </div>

            <div className={s.input}>
              <EmailCustomInput type={InputType.PhoneNumber} text="Last Name" />
            </div>
          </div>
        </div>

        <div className={s.colum_wrapper}>
          <div className={s.title}>Phone Number</div>

          <div className={s.input}>
            <EmailCustomInput type={InputType.PhoneNumber} text="Please enter a valid phone number." />
          </div>
        </div>

        <div className={s.colum_wrapper}>
          <div className={s.title}>Email</div>

          <div className={s.input}>
            <EmailCustomInput type={InputType.PhoneNumber} text="example@example.com" />
          </div>
        </div>
      </div>
    </div>
  );
}
