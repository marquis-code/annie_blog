import {useState} from 'react';
import {handleAdminAccess} from '../../components/endpoints';

const Signin = () => {
    const [user, setUser] = useState({
        email : '',
        password : ''
    });

    const {email, password} = user;

    const handleSubmit = (e) => {
        e.preventDefault();
        const {email, password} = user;
        const formData = {email, password};
        console.log(formData);
        handleAdminAccess(formData)
        .then((response) => {
           console.log(response.data)
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
        <section className="bg-white flex justify-center items-center mt-24 max-w-7xl mx-auto">
            <div className="px-5 border py-6 rounded shadow-sm w-6/12 z-50 bg-gray-100">
                <h1 className="text-center font-semibold font-sans text-2xl py-3">Admin Login</h1>
                <form onSubmit={handleSubmit}>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="email" className="font-sans text-sm mb-2 text-gray-500">Email Address:</label>
                        <input type='email' value={email} onChange={handleChange} name='email' placeholder="Enter Email" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>
                    <div className="py-2 flex flex-col">
                        <label htmlFor="password" className="font-sans text-sm mb-2 text-gray-500">Password:</label>
                        <input type='password' value={password} onChange={handleChange} name='password' placeholder="Enter Password" className="focus:border-green-600 outline-none rounded px-3 py-2 border"/>
                    </div>

                    <button className="font-semibold font-sans rounded shadow-sm bg-green-500 w-full text-white py-2 mt-4">Login</button>
                </form>
            </div>
        </section>
        </>
    )
}

export default Signin;