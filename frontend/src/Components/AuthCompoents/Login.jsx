import { useState } from "react"
import { IoIosEyeOff } from "react-icons/io";
import { FaEye } from "react-icons/fa";
import { useLoginMutation } from "../../redux/features/userSlice";
import { toast } from "react-toastify";
import { Link, useNavigate } from "react-router-dom";



const LoginPage = () => {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [login, { isLoading, errors }] = useLoginMutation();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await login(formData).unwrap();
      toast.success(res.message);
      localStorage.setItem('user', JSON.stringify(res.user));
      if (res.user.role === 'admin') {
        navigate('/admin/dashboard', { replace: true })
      }
      if (res.user.role === 'vendor') {
        navigate('/vendor/dashboard', { replace: true })
      }
      if (res.user.role === 'user')
        navigate('/');
    }
    catch (err) {
      toast.error(err?.data?.message);
    }
  }
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  }
  return (
    <div className="w-full max-w-md">

      {/* Heading */}
      <div className="mb-8">
        <p className="mb-2 text-sm font-medium uppercase tracking-[0.2em] text-[#E0912B]">
          Welcome back
        </p>

        <h1 className="text-3xl font-semibold tracking-tight text-[#17211F] sm:text-4xl">
          Sign in to your account
        </h1>

        <p className="mt-3 text-sm leading-relaxed text-[#6B7570]">
          Enter your details to continue using sewaX.
        </p>
      </div>

      {/* Form */}
      <form onSubmit={handleSubmit} className="space-y-5">

        {/* Email */}
        <div>
          <label
            htmlFor="email"
            className="mb-2 block text-sm font-medium text-[#17211F]"
          >
            Email or username
          </label>

          <input
            id="email"
            name='email'
            type="text"
            value={formData.email}
            onChange={handleChange}
            placeholder="Enter your email or username"
            className="w-full rounded-xl border border-[#E4E1D8] bg-white px-4 py-3.5 text-sm text-[#17211F] outline-none transition placeholder:text-[#9BA39F] focus:border-[#E0912B] focus:ring-4 focus:ring-[#E0912B]/10"
          />
        </div>

        {/* Password */}
        <div>
          <div className="mb-2 flex items-center justify-between">
            <label
              htmlFor="password"
              className="block text-sm font-medium text-[#17211F]"
            >
              Password
            </label>

            <button
              type="button"
              className="text-sm font-medium text-[#E0912B] transition hover:text-[#C97E22]"
            >
              Forgot password?
            </button>
          </div>

          <div className="relative">
            <input
              id="password"
              name="password"
              value={formData.password}
              onChange={handleChange}
              type={showPassword ? 'text' : "password"}
              placeholder="Enter your password"
              className="w-full rounded-xl border border-[#E4E1D8] bg-white px-4 py-3.5 pr-12 text-sm text-[#17211F] outline-none transition placeholder:text-[#9BA39F] focus:border-[#E0912B] focus:ring-4 focus:ring-[#E0912B]/10"
            />

            <button
              onClick={(pre) => setShowPassword((prev) => !prev)}
              type="button"
              className="absolute right-4 top-1/2 -translate-y-1/2 text-sm text-[#6B7570] hover:text-[#17211F]"
            >
              {showPassword ? <IoIosEyeOff size={18} /> : <FaEye size={18} />}
            </button>
          </div>
        </div>

        {/* Remember me */}
        <div className="flex items-center gap-2">
          <input
            id="remember"
            type="checkbox"
            className="h-4 w-4 rounded border-[#D5D1C7] accent-[#E0912B]"
          />

          <label
            htmlFor="remember"
            className="text-sm text-[#6B7570]"
          >
            Remember me
          </label>
        </div>

        {/* Login button */}
        <button
          type="submit"
          className="w-full rounded-xl bg-[#14282B] px-5 py-3.5 text-sm font-semibold text-white shadow-sm transition duration-200 hover:bg-[#1D3A3E] hover:shadow-md active:scale-[0.99]"
        >
          Sign in
        </button>

      </form>

      {/* Divider */}
      <div className="my-7 flex items-center gap-4">
        <div className="h-px flex-1 bg-[#E4E1D8]" />
        <span className="text-xs uppercase tracking-wider text-[#9BA39F]">
          or
        </span>
        <div className="h-px flex-1 bg-[#E4E1D8]" />
      </div>

      {/* Register */}
      <p className="text-center text-sm text-[#6B7570]">
        Don't have an account?{" "}
        <Link
          to='/register'
          className="font-semibold text-[#E0912B] hover:text-[#C97E22] hover:cursor-pointer"
        >
          Create an account
        </Link>
      </p>

    </div>
  )
}

export default LoginPage