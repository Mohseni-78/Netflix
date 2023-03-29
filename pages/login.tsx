/* eslint-disable @next/next/no-img-element */
import { useRouter } from 'next/router'
import Head from 'next/head'
import Link from 'next/link'
//Imported react-hot-toast ============>
import toast from 'react-hot-toast'
//Imported Formik ============>
import { useFormik } from 'formik'
//Imported Schemas ============>
import { loginSchema } from '@/schemas'


interface FormsValue {
    email: string
    password: string
}
const Login = () => {
    const router = useRouter();
    const initialValues: FormsValue = {
        email: "",
        password: "",
    }

    const { values, errors, touched, handleChange, handleBlur, handleSubmit, isSubmitting } = useFormik({
        initialValues: initialValues,
        validationSchema: loginSchema,
        onSubmit: async (values) => {
            await fetch('/api/login', {
                method: "POST",
                headers: {
                    'Content-type': 'application/json'
                },
                body: JSON.stringify(values)
            }).then(res => res.json()).then(data => {
                if (data.status === "Success") {
                    console.log(isSubmitting);
                    router.push('/');
                    toast('Welcome Back to Site!',
                        {
                            icon: '👏',
                            style: {
                                borderRadius: '10px',
                                background: '#cecece',
                                color: '#000',
                            },
                        }
                    );
                } else {
                    console.log(data);
                    toast.error(`${data.status} => ${data.message}`)
                }
            })
        }
    });
    return (
        <div className=' overflow-hidden relative flex h-screen w-screen flex-col
         bg-black md:items-center md:justify-center md:bg-transparent'>
            <Head>
                <title>Netflix - Login</title>
            </Head>
            <img
                src="https://rb.gy/p2hphi"
                className="-z-10 !hidden opacity-50 sm:!inline object-cover md:relative"
                alt=""
            />
            <img
                src="https://rb.gy/ulxxee"
                className="absolute left-4 top-4 cursor-pointer
                 object-contain md:left-10 md:top-6"
                width={150}
                height={150}
                alt=''
            />
            <form
                onSubmit={handleSubmit}
                className='absolute mt-24 space-y-8 rounded bg-black/75 
                py-10 px-6 md:mt-0 md:max-w-md md:px-14 z-30'>
                <h3 className='text-4xl font-semibold'>Signin</h3>
                <div className='space-y-4'>
                    <label className='inline-block w-full' htmlFor="email">
                        <input name='email' value={values.email} onBlur={handleBlur} onChange={handleChange}
                            className={`input ${errors.email && touched.email && "border border-red-600"}`}
                            type="text" placeholder='Please enter a email...' id='email' />
                        <p className="text-red-500 font-semibold text-xs mt-1">{errors.email && touched.email && errors.email}</p>
                    </label>
                    <label className='inline-block w-full' htmlFor="password">
                        <input name='password' value={values.password} onBlur={handleBlur} onChange={handleChange}
                            className={`input ${errors.password && touched.password && "border border-red-600"}`}
                            type="text" placeholder='Please enter a Password...' id="password" />
                        <p className="text-red-500 font-semibold text-xs mt-1">{errors.password && touched.password && errors.password}</p>
                    </label>
                </div>
                <div className="flex flex-col">
                    <Link href={'/signUp'} className='font-bold hover:underline'>Create new account ?</Link>
                    <Link href={'/'} className='font-bold text-sm hover:underline'>Guest click !</Link>
                </div>
                <button type='submit'
                    disabled={isSubmitting || !!errors.email || !!errors.password}
                    className={`${isSubmitting || !!errors.email || !!errors.password ? "opacity-75" : ""} w-full rounded bg-[#E50914] 
                    py-3 font-semibold`}>Login</button>
            </form>
        </div>
    )
}

export default Login