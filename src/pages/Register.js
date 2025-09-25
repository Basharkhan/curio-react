import { useNavigate } from "react-router-dom";

import { Box, Button, Paper, TextField, Typography } from "@mui/material";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { registerUser } from "../api/authApi";
import toast from "react-hot-toast";

export default function Register() {
    const navigate = useNavigate();
    const {register, handleSubmit, setError, formState: { errors }} = useForm({
        mode: "onBlur"
    });

    const onSubmit = async(data) => {
        console.log(data);        
        try {
            await registerUser(data);
            navigate("/login");
            toast.success("Registration successful!");
        } catch (error) {
            console.log("Error during registration::--> ", error);
            if(error.response?.data?.errors) {
                const apiErrors = error.response.data.errors;
                Object.keys(apiErrors).forEach((field) => {
                    setError(field, { type: 'manual', message: apiErrors[field] });
                });                
            } else {                
                toast.error("Registration failed. Please try again.");
            }
        }
    };

    return (
        <>
            <Box p={3} maxWidth={400} mx="auto">
                <Paper sx={{ p: 3 }}>
                    <Typography variant="h5" mb={2}>Register</Typography>
                    <form onSubmit={handleSubmit(onSubmit)} noValidate>
                        <TextField
                            label="Full Name"
                            name="fullName"
                            fullWidth
                            margin="normal"
                            {...register("fullName", { required: "Full Name is required" })}
                            error={Boolean(errors.fullName)}
                            helperText={errors.fullName?.message}
                        />
                         <TextField
                            label="Email"
                            name="email"
                            type="email"
                            fullWidth
                            margin="normal"                           
                             {...register("email", { required: "Email is required" })}
                            error={Boolean(errors.email)}
                            helperText={errors.email?.message}
                        />
                        <TextField
                            label="Password"
                            name="password"
                            type="password"
                            fullWidth
                            margin="normal"                          
                             {...register("password", { required: "Password is required" })}
                            error={Boolean(errors.password)}
                            helperText={errors.password?.message}
                        />
                        <Button type="submit" variant="contained" fullWidth sx={{ mt: 2 }}>
                            Register
                        </Button>
                    </form>
                </Paper>
            </Box>
        </>
    )
}