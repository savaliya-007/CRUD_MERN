import {
  Box,
  Button,
  Container,
  FormControl,
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

// -----------------------------------------

export default function Login() {
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: { username: "", password: "", visibility: false },
    validate: (value) => {
      const error: { username?: string; password?: string } = {};
      if (value.password.trim().length < 4) {
        error.password = "password must be at least 4 caracters long";
      }
      if (value.username.trim().length < 4) {
        error.username = "username must be at least 4 caracters long";
      }

      return error;
    },
    onSubmit: (value) => {
      axiosClient
        .post(
          "/api/v1/user/login",
          { username: value.username, password: value.password },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log("response", response);
          dispatch(setToken(response.data.token));
        })
        .catch((error) => {
          console.log("error", error);
        });
    },
  });

  return (
    <Container maxWidth="lg">
      <Paper className="main-page">
        <Box component={"h1"}> LOGIN</Box>
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
          <Button fullWidth variant="outlined" type="submit">
            Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}
