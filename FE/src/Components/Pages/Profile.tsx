import React, { useEffect, useState } from "react";
import axiosClient, { setAuthToken } from "../../lib/axiosClient";
import { RootState } from "../../Store/store";
import { useSelector } from "react-redux";
import { toast } from "react-toastify";
import { useFormik } from "formik";
import { Edit, Visibility, VisibilityOff, Delete } from "@mui/icons-material";
import {
  Container,
  Paper,
  Box,
  FormControl,
  InputLabel,
  Input,
  InputAdornment,
  IconButton,
  Button,
  Typography,
} from "@mui/material";

interface UserType {
  _id: string;
  username: string;
  email: string;
  role: string;
  created_at: string;
  updated_at: string;
  __v: string;
}

const Profile: React.FC = () => {
  const [user, setUser] = useState<UserType>();
  const { role, token } = useSelector((state: RootState) => state.auth);
  console.log("role---------->", role, token);

  console.log("user", user);
  const formik = useFormik({
    initialValues: {
      username: user?.username || "",
      email: user?.email || "",
      password: "",
      visibility: false,
      _id: null,
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
          role === "admin"
            ? `/api/v1/admin/users/${value._id}`
            : "/api/v1/user/auth-useraa",
          {
            username: value.username,
            password: value.password,
            email: value.email,
          },
          { headers: { "Content-Type": "application/json" } }
        )
        .then((response) => {
          console.log(response);
          // dispatch(setToken({ token: response.data.token, role: value.role }));
          // toast.success("Signup successful!");
          // window.location.reload();
        })
        .catch((error) => {
          toast.error(error.message);
          console.log("error", error);
        });
    },
  });
  useEffect(() => {
    if (token && role) {
      setAuthToken(token, role);
      axiosClient
        .get(
          role === "admin"
            ? "/api/v1/admin/auth-admin"
            : "/api/v1/user/auth-user"
        )
        .then((response) => {
          console.log(response);
          setUser(response.data as UserType);
          formik.setValues({
            ...formik.values,
            username: response.data?.username || "",
            email: response.data?.email || "",
            _id: response.data?._id || null,
            visibility: false,
          });
        });
    }
  }, [token]);
  return (
    <Container maxWidth="lg">
      <Paper className="main-page signup">
        <Box component={"h1"}> Update Profile</Box>
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

          <Button variant="outlined" startIcon={<Edit />} type="submit">
            Update
          </Button>
          <Button
            variant="outlined"
            color="warning"
            startIcon={<Delete />}
            type="button"
          >
            Delete
          </Button>
        </Box>
        <Typography fontSize={12} mt={2}>
          only for admin right now
        </Typography>
      </Paper>
    </Container>
  );
};

export default Profile;
