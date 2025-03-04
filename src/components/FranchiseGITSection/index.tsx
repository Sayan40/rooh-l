import React from "react";
import { useTranslation } from "next-i18next";
import { useForm, Controller } from "react-hook-form";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import MaskedInput from "react-text-mask";

import "./style.scss";

interface FranchiseGITSectionProps { }

const schema = z.object({
  name: z.string().nonempty("Пожалуйста, введите ваше имя"),
  phone: z
    .string()
    .nonempty("Пожалуйста, введите ваш телефон")
    .regex(
      /^\+38\s\(\d{3}\)\s\d{3}-\d{2}-\d{2}$/,
      "Пожалуйста, введите корректный номер телефона"
    ),
  email: z
    .string()
    .nonempty("Пожалуйста, введите ваш email")
    .email("Пожалуйста, введите корректный email"),
});

type FormData = z.infer<typeof schema>;

const phoneNumberMask = [
  "+",
  "3",
  "8",
  " ",
  "(",
  /\d/,
  /\d/,
  /\d/,
  ")",
  " ",
  /\d/,
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
  "-",
  /\d/,
  /\d/,
];

const FranchiseGITSection: React.FC<FranchiseGITSectionProps> = () => {
  const { t } = useTranslation("common");

  const {
    control,
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<FormData>({
    resolver: zodResolver(schema),
  });
  const handleSendMail = async (dataDTO: FormData) => {
    try {
      const response = await fetch('/api/sendEmail', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          name: dataDTO.name,
          phone: dataDTO.phone,
          email: dataDTO.email,
        }),
      });

      const data = await response.json();
      console.log(data);
    } catch (error) {
      console.error('Error sending mail:', error);
    }
  };

  const onSubmit = (data: FormData) => {
    // console.log("Форма успешно отправлена:", data);
    // Здесь вы можете вызвать функцию для отправки данных
    handleSendMail(data);
    reset();
  };

  return (
    <section className='franchise-git-section' id="git">
      <div className='container'>
        <div className='franchise-git-section__title-box'>
          <h2 className='franchise-git-section__title'>
            {t("franchise_git_title")}
          </h2>
          <h3 className='franchise-git-section__description'>
            {t("franchise_git_description")}
          </h3>
        </div>
        <form
          className='franchise-git-section__form'
          onSubmit={handleSubmit(onSubmit)}
        >
          <div className='franchise-git-section__inputs-container'>
            <div className='franchise-git-section__input-wrapper'>
              <input
                className={`franchise-git-section__input ${errors.name ? "error" : ""
                  }`}
                type='text'
                {...register("name")}
                placeholder={t("franchise_git_name_placeholder")}
              />
              {errors.name && (
                <p className='franchise-git-section__error'>
                  {errors.name.message}
                </p>
              )}
            </div>
            <div className='franchise-git-section__input-wrapper'>
              <Controller
                name='phone'
                control={control}
                render={({ field }) => (
                  <MaskedInput
                    mask={phoneNumberMask}
                    {...field}
                    className={`franchise-git-section__input ${errors.phone ? "error" : ""
                      }`}
                    placeholder={t("franchise_git_phone_placeholder")}
                  />
                )}
              />
              {errors.phone && (
                <p className='franchise-git-section__error'>
                  {errors.phone.message}
                </p>
              )}
            </div>
            <div className='franchise-git-section__input-wrapper'>
              <input
                className={`franchise-git-section__input ${errors.email ? "error" : ""
                  }`}
                type='email'
                {...register("email")}
                placeholder={t("franchise_git_email_placeholder")}
              />
              {errors.email && (
                <p className='franchise-git-section__error'>
                  {errors.email.message}
                </p>
              )}
            </div>
          </div>
          <button type='submit' className='btn btn-primary'>
            {t("franchise_git_submit_button")}
          </button>
        </form>
      </div>
    </section>
  );
};

export default FranchiseGITSection;
