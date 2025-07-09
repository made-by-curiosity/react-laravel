import { useState } from "react";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { validationSchema } from "./validationSchema";
import { logInUser } from "../../../../api/userLogIn";
import { localStorageManager } from "../../../../services/localStorageManager";

const Login = () => {
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
        const response = await logInUser({
          email: values.email,
          password: values.password,
        });

        localStorageManager.saveToken(response);

        formik.resetForm();
        toast.success("Login successful!");
      } catch (error: any) {
        setError(error.response.data.message);
        toast.error(error.response.data.message);
      }
    },
  });

  const [error, setError] = useState<string | null>(null);

  return (
    <div>
      <div>Login</div>
      {error && <div className="error">{error}</div>}
      <form onSubmit={formik.handleSubmit}>
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

export default Login;
