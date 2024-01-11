import { Box, Container, FormControl, FormHelperText, Input, InputLabel, Paper } from "@mui/material";
import "./auth.css";
import { Formik, useFormik } from "formik";

// -----------------------------------------

export default function Login() {
  const formik = useFormik({
    initialValues:{ username: "", password: "" },
    onSubmit: ()=>{} 
  })
  console.log(formik.values.username)
  return (
    <Container maxWidth="lg">
      <Paper className="main-page">
        <Box component={"h1"} display={"flex"} justifyContent={"center"}>
          LOGIN
        </Box>
        <Box
          component={"form"}
          className="form-login"
          display={"flex"}
          justifyContent={"center"}
          sx={{
            display: "grid",
            margin: "20px",
            placeItems: "center",
          }}
        >
          <FormControl  fullWidth>
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
          <FormControl  fullWidth>
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
            />
          </FormControl>
        </Box>
      </Paper>
    </Container>
  );
}
