import {useState} from 'react';
import {Signin} from '../components/endpoints';
import {useRouter} from 'next/router';
import Link from 'next/link';

const Login = () => {
    const [user, setUser] = useState({
        email : '',
        password : '',
        loading : false
    });

    const {push} = useRouter();
    const {email, password, loading} = user;

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = user;
        const formData = {email, password};
        Signin(formData)
        .then((response) => {
            setUser({loading : true})
            console.log(response)
            const {token} = response.data
            const {user} = response.data;
           localStorage.setItem('token', token);
           localStorage.setItem('user', JSON.stringify(user));
        //    if(user.role === 0) {
        //        console.log('You are a user')
        //    }
           console.log('Signup was successful')
           push('/blog')
        }).catch((error) => {
          console.log(error.response);
        })
    }

    const handleChange = (e) => {
      let nameField = e.target.name;
      let valueField = e.target.value;
      setUser({...user, [nameField] : valueField})
    }

    return (
        <>
        <section className="flex justify-center items-center max-w-7xl mx-auto">
            <div className="px-5 py-6 md:w-6/12 z-50 w-full">
                <h1 className="text-center font-semibold font-sans text-3xl py-3">Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="email" className="font-sans text-sm mb-2 font-medium text-gray-500">Email Address:</label>
                        <input type='email' value={email} onChange={handleChange} name='email' placeholder="Enter Email" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="password" className="font-sans text-sm font-medium mb-2 text-gray-500">Password:</label>
                        <input type='password' value={password} onChange={handleChange} name='password' placeholder="Enter Password" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>

                    {/* <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Login</button> */}
                    {loading ? (
                        <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Signing in...</button>
                    ) : (
                        <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Continue</button>
                    )}
                    <span className='flex justify-center items-center py-3 text-sm text-gray-500 font-medium'>Am new here ?<Link href='/signup'><a className='underline cursor-pointer ml-2 font-semibold text-green-500'>create account</a></Link></span>
                </form>
            </div>
        </section>
        </>
    )
}

export default Login;