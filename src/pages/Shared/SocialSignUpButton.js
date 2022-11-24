import {RiGoogleFill} from "react-icons/ri";
 
const SocialSignUpButton = () => {
    return (
        <div className="my-4 space-y-4">
		<button aria-label="Login with Google" type="button" className="flex items-center justify-center w-full p-2.5 space-x-2 border rounded-md focus:ring-2 focus:ring-offset-1">
			<RiGoogleFill className="h-6 w-6" />
			<p>Sign-in with Google</p>
		</button>
	</div>
    );
};

export default SocialSignUpButton;