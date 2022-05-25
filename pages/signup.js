import {useState} from 'react';
import {Signup} from '../components/endpoints';
import {useRouter} from 'next/router';
import Link from 'next/link';

const Register = () => {
    const [user, setUser] = useState({
        username : '',
        email : '',
        password : '',
        loading : false
    });

    const {push} = useRouter();
    const {username, email, password, loading} = user;

    const handleSubmit = (e) => {
        e.preventDefault();
        const {username, email, password} = user;
        const formData = {username, email, password};
        Signup(formData)
        .then((response) => {
            setUser({loading : true});
           push('/signin')
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
        <section className="bg-white flex justify-center items-center max-w-7xl mx-auto">
            <div className="px-5 py-6 md:w-6/12 z-50 w-full">
                <h1 className="text-center font-semibold font-sans text-3xl py-3">Sign up</h1>
                <form onSubmit={handleSubmit} >
                    <div className="py-2 flex flex-col">
                        <label htmlFor="username" className="font-sans text-sm mb-2 font-medium text-gray-500">Username:</label>
                        <input type='text' value={username} onChange={handleChange} name='username' placeholder="Enter Username" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="email" className="font-sans text-sm mb-2 font-medium text-gray-500">Email Address:</label>
                        <input type='email' value={email} onChange={handleChange} name='email' placeholder="Enter Email" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="password" className="font-sans text-sm mb-2 font-medium text-gray-500">Password:</label>
                        <input type='password' value={password} onChange={handleChange} name='password' placeholder="Enter Password" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>

                    {loading ? (
                        <button disabled className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Signing up...</button>
                    ) : (
                        <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Continue</button>
                    )}
                    <span className='flex justify-center items-center py-3 text-sm text-gray-500 font-medium'>Already have an account ?<Link href='/signin'><a className='underline cursor-pointer ml-2 font-semibold text-green-500'>Login</a></Link></span>
                </form>
            </div>
        </section>
        </>
    )
}

export default Register;