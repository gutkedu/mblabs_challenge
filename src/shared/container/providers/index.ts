import { container } from "tsyringe";
import { IDateProvider } from "./DateProvider/IDateProvider";
import { DayJsDateProvider } from "./DateProvider/implementations/DayJsDateProvider";
import { IMailProvider } from "./MailProvider/IMailProvider";
import { EtherealMailProvider } from "./MailProvider/implementations/EtherealMailProvider";
import { StripePaymentProvider } from "./PaymentProvider/implementations/StripePaymentProvider";
import { IPaymentProvider } from "./PaymentProvider/IPaymentProvider";

container.registerSingleton<IDateProvider>(
  "DayJsDateProvider",
  DayJsDateProvider
);

container.registerInstance<IMailProvider>(
  "EtherealMailProvider",
  new EtherealMailProvider()
);

container.registerSingleton<IPaymentProvider>(
  "StripePaymentProvider",
  StripePaymentProvider
);
