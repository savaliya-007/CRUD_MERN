import {
  Box,
  Button,
  Checkbox,
  Container,
  FormControl,
  FormControlLabel,
  IconButton,
  Input,
  InputAdornment,
  InputLabel,
  Paper,
} from "@mui/material";
import "./auth.css";
import { useFormik } from "formik";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import axiosClient from "../../lib/axiosClient";
import { useDispatch } from "react-redux";
import { setToken } from "../../Store/auth";
import { toast } from "react-toastify";

// -----------------------------------------

export default function SignUp() {
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      username: "",
      email: "",
      password: "",
      visibility: false,
      role: false,
    },
    validate: (value) => {
      const error: { username?: string; password?: string; email?: string } =
        {};
      if (value.password.trim().length < 4) {
        error.password = "password must be at least 4 caracters long";
      }
      if (value.username.trim().length < 4) {
        error.username = "username must be at least 4 caracters long";
      }

      if (value.email.trim().length < 4) {
        error.email = "email must be at least 4 caracters long";
      }

      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      console.log("emailRegex.test(value.email)", emailRegex.test(value.email));
      if (!emailRegex.test(value.email)) {
        error.email = "invalid email!";
      }

      return error;
    },
    onSubmit: (value) => {
      axiosClient
        .post(
          "/api/v1/user/register",
          {
            username: value.username,
            password: value.password,
            email: value.email,
            role: value.role ? "admin" : "user",
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => 
        {
          dispatch(setToken(response.data.token));
          toast.success("Signup successful!");
        })
        .catch((error) => {
          toast.error(error.message);
          console.log("error", error);
        });
    },
  });

  return (
    <Container maxWidth="lg">
      <Paper className="main-page signup">
        <Box component={"h1"}> SIGN UP</Box>
        <Box
          component={"form"}
          className="form-login"
          display={"flex"}
          justifyContent={"center"}
          flexDirection={"column"}
          sx={{
            paddingTop: "6%",
            paddingLeft: "10%",
            paddingRight: "10%",
            gap: "40px",
            maxWidth: "400px",
            width: "100%",
          }}
          onSubmit={formik.handleSubmit}
        >
          <FormControl
            fullWidth
            error={formik.touched.username && formik.errors?.username != void 0}
          >
            <InputLabel
              variant="standard"
              disableAnimation
              shrink
              size="normal"
              htmlFor="username"
            >
              username
            </InputLabel>
            <Input
              onChange={formik.handleChange}
              value={formik.values.username}
              name="username"
              id="username"
            />
          </FormControl>
          <FormControl
            fullWidth
            error={formik.touched.email && formik.errors.email !== void 0}
          >
            <InputLabel
              variant="standard"
              disableAnimation
              shrink
              size="normal"
              htmlFor="email"
            >
              Email
            </InputLabel>
            <Input
              onChange={formik.handleChange}
              value={formik.values.email}
              name="email"
              id="email"
            />
          </FormControl>

          <FormControl
            fullWidth
            error={formik.touched.password && formik.errors.password !== void 0}
          >
            <InputLabel
              variant="standard"
              disableAnimation
              shrink
              size="normal"
              htmlFor="password"
            >
              password
            </InputLabel>
            <Input
              onChange={formik.handleChange}
              value={formik.values.password}
              name="password"
              id="password"
              type={formik.values.visibility ? "password" : "text"}
              endAdornment={
                <InputAdornment position="end">
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={() =>
                      formik.setValues({
                        ...formik.values,
                        visibility: !formik.values.visibility,
                      })
                    }
                    name="visibility"
                  >
                    {formik.values.visibility ? (
                      <Visibility />
                    ) : (
                      <VisibilityOff />
                    )}
                  </IconButton>
                </InputAdornment>
              }
            />
          </FormControl>

          <FormControlLabel
            value="end"
            control={
              <Checkbox
                value={formik.values.role}
                onClick={() =>
                  formik.setValues({
                    ...formik.values,
                    role: !formik.values.role,
                  })
                }
              />
            }
            label="sign up as Administrator"
            labelPlacement="end"
          />
          <Button fullWidth variant="outlined" type="submit">
            Sign Up
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
