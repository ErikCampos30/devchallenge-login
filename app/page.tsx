// app/page.tsx
'use client'
import { useForm } from "react-hook-form"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Home() {
  const { register, handleSubmit, formState: { errors } } = useForm<FormData>()
  const router = useRouter()
  const [loginError, setLoginError] = useState(false)
  type FormData = {
    username: string;
    password: string;
  };
  
  const onSubmit = (data: FormData) => {
    const { username, password } = data
    if (username === "admin" && password === "1234") {
      router.push("/welcome")
    } else {
      setLoginError(true)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <form onSubmit={handleSubmit(onSubmit)} className="bg-white p-6 rounded shadow-md w-full max-w-sm">
        <h1 className="text-2xl font-bold mb-4 text-center">Login</h1>

        <input
          placeholder="Username"
          className="w-full p-2 border rounded mb-2"
          {...register("username", { required: "Username is required" })}
        />
        {errors.username && <p className="text-red-500">{errors.username.message}</p>}

        <input
          type="password"
          placeholder="Password"
          className="w-full p-2 border rounded mb-2"
          {...register("password", { required: "Password is required" })}
        />
        {errors.password && <p className="text-red-500">{errors.password.message}</p>}

        {loginError && <p className="text-red-600 mt-2">Invalid credentials</p>}

        <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded w-full mt-4">
          Login
        </button>
      </form>
    </div>
  )
}
