import { useRouter } from "next/router";

const Password = () => {
  const router = useRouter();
  const error = router.query.error;

  return (
    <div>
      <h1>This Page is Under Development... </h1>

      <p>Enter Password:</p>
      <form action="/api/password-protected" method="post">
        <input type="text" name="password" />
        <button>Login</button>
        {error && (
         
            <span className="label-text text-error">{error}</span>
        )}
      </form>
    </div>
  );
};

export default Password;
