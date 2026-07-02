import type { FC, ReactNode } from "react"
import formImage from "../../assets/images/form_image.jpg"
import formIcon from "../../assets/icons/icon_form.svg"
import "./formLayout.scss"

interface Props {
  children: ReactNode
  footer?: ReactNode
}

export const AuthLayout: FC<Props> = ({
  children,
  footer
}) => {
  return (
      <div className="form-layout">
        <div className="form-layout__banner">
          <img
            className="form-layout__banner-image"
            src={formImage}
            alt="Баннер"
          />
        </div>
        <div className="form-layout__content">
          <div className="form-layout__container">
            <div className="form-layout__container-wrapper">
              <img
                src={formIcon}
                alt="Лого"
                className="form-layout__icon"
              />
              {children}
            </div>
            {footer}
          </div>
        </div>
      </div>
  )
}