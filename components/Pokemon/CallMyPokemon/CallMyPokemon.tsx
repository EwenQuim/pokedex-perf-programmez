import styles from "./CallMyPokemon.module.css";
import { FormEvent } from "react";
import type { CountryCode, PhoneNumber } from "libphonenumber-js/min";
type CustomElements = HTMLFormControlsCollection & {
  phoneNumber: HTMLInputElement;
};

let parsePhoneNumber:
  | ((text: string, defaultCountry?: CountryCode | undefined) => PhoneNumber)
  | undefined = undefined;

const lazyLoadParsePhonenNumber = async () => {
  const { parsePhoneNumber: parsePhoneNumber2 } = await import(
    "libphonenumber-js/min"
  );
  parsePhoneNumber = parsePhoneNumber2;
};

type CustomForm = HTMLFormElement & {
  readonly elements: CustomElements;
};

export default function CallMyPokemon() {
  return (
    <div className={styles.callMyPokemon}>
      <h2 className={styles.title}>Call My Pokemon</h2>
      <form
        className={styles.form}
        onSubmit={async (event: FormEvent<CustomForm>) => {
          event.preventDefault();

          const target = event.currentTarget.elements;
          const phoneNumberRawValue = target.phoneNumber.value;
          let phoneNumber: PhoneNumber | undefined;
          if (parsePhoneNumber === undefined) {
            throw new Error("parsePhoneNumber is undefined");
          }
          try {
            phoneNumber = parsePhoneNumber(phoneNumberRawValue, "FR");
          } catch (e) {
            console.log(e);
            return;
          }

          if (phoneNumber === undefined || !phoneNumber.isValid()) {
            return;
          }
          alert(`Calling ${phoneNumber.formatInternational()}`);
        }}
      >
        <label htmlFor="phoneNumber">Phone Number</label>
        <input
          type="tel"
          id="phoneNumber"
          name="phoneNumber"
          placeholder="Phone Number"
          onFocus={async () => {
            if (parsePhoneNumber === undefined) {
              await lazyLoadParsePhonenNumber();
            }
          }}
        />
        <button type="submit">Call</button>
      </form>
    </div>
  );
}
