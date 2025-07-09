import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useFormik } from "formik";
import { toast } from "react-toastify";
import { validationSchema } from "./validationSchema";
import { registerUser } from "../../../../api/userRegister";
import { localStorageManager } from "../../../../services/localStorageManager";
import { routes } from "../../../../config/routes";

const Register = () => {
  const formik = useFormik({
    initialValues: {
      name: "",
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: async (values) => {
      setError(null);

      try {
        const response = await registerUser({
          name: values.name,
          email: values.email,
          password: values.password,
        });

        localStorageManager.saveToken(response);

        formik.resetForm();
        toast.success("Registration successful!");
        navigate(routes.posts)
      } catch (error: any) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    },
  });

  const [error, setError] = useState<string | null>(null);
  const navigate = useNavigate();

  return (
    <div>
      <div>Register</div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
        <div>
          <label>
            <span>Name: </span>
            <input
              type="text"
              name="name"
              placeholder="John Doe"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.name}
            />
          </label>
          {formik.touched.name && formik.errors.name ? <div>{formik.errors.name}</div> : null}
        </div>
        <div>
          <label>
            <span>Email: </span>
            <input
              type="email"
              name="email"
              placeholder="example@mail.com"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.email}
            />
          </label>
          {formik.touched.email && formik.errors.email ? <div>{formik.errors.email}</div> : null}
        </div>
        <div>
          <label>
            <span>Password: </span>
            <input
              type="password"
              name="password"
              placeholder="password123"
              onChange={formik.handleChange}
              onBlur={formik.handleBlur}
              value={formik.values.password}
            />
          </label>
          {formik.touched.password && formik.errors.password ? <div>{formik.errors.password}</div> : null}
        </div>
        <button type="submit">Register</button>
      </form>
    </div>
  );
};

export default Register;
