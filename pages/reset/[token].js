import router from 'next/router';

const ResetPassword = () => {
    const {token} = router.query;
    return (
        <>
        <div>
             <h1>Set up New Password</h1>
        </div>
        </>
    )
}
export default ResetPassword;