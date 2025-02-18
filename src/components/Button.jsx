/* eslint-disable react/prop-types */
import PropTypes from "prop-types";
import { Link } from "react-router-dom";

export const Button = ({ link, children, variant = 'filled', ...props }) => (

  <>
    {link ?
      <Link to={link} className={variant === 'filled' ? 'bg-primary rounded-[6px] text-white px-4 text-[12px] py-2' : 'bg-white rounded-[6px] border border-primary text-primary px-4 text-[12px] py-2'}  {...props}>
        {children}
      </Link > :
      <button className={variant === 'filled' ? 'bg-primary rounded-[6px] text-white px-4 text-[12px] py-2' : 'bg-white rounded-[6px] border border-primary text-primary px-4 text-[12px] py-2'} {...props}>
        {children}
      </button>}
  </>

)


Button.propTypes = {
  link: PropTypes.string,
};
