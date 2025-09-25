import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../api/authApi";
import toast from "react-hot-toast";
import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useContext } from "react";
import { AuthContext } from "../security/AuthContext";

export default function Login() {
    const { login } = useContext(AuthContext);
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: { errors }} = useForm({
        mode: "onBlur"
    });

    const onSubmit = async(data) => {
        try {
            const response = await loginUser(data);
            console.log(response.data);
            // console.log(response.data.token);
            
            login(response.data.data.token);
            // navigate("/dashboard");
            toast.success("Login successful!");
        } catch (error) {
            console.log("Error during registration::--> ", error);
            if(error.response?.data?.errors) {
                const apiErrors = error.response.data.errors;
                Object.keys(apiErrors).forEach((field) => {
                    setError(field, { type: 'manual', message: apiErrors[field] });
                });                
            } else {                
                toast.error("Login failed. Please try again.");
            }
        }
    };
    
    return (
        <Box p={3} maxWidth="400px" mx="auto">
            <Paper sx={{ p: 3 }}>
                <Typography variant="h5" mb={2}>
                Login
                </Typography>
                <form onSubmit={handleSubmit(onSubmit)} noValidate>
                <TextField
                    label="Email"
                    type="email"
                    fullWidth
                    margin="normal"
                    {...register("email", { required: "Email is required" })}
                    error={Boolean(errors.email)}
                    helperText={errors.email?.message}
                />

                <TextField
                    label="Password"
                    type="password"
                    fullWidth
                    margin="normal"
                    {...register("password", { required: "Password is required" })}
                    error={Boolean(errors.password)}
                    helperText={errors.password?.message}
                />

                <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                    Login
                </Button>
                </form>
            </Paper>
        </Box>
    )
}